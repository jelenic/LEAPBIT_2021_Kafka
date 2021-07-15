/* const { Kafka } = require('kafkajs');
const SnappyCodec = require('kafkajs-snappy'); */
const dotenv = require('dotenv');

const { Kafka, CompressionTypes, CompressionCodecs } = require('kafkajs');
const SnappyCodec = require('kafkajs-snappy');

const { Connection } = require('../singletons/Connection');
const { SQLDatabase } = require('../singletons/MySQL');

CompressionCodecs[CompressionTypes.Snappy] = SnappyCodec;

dotenv.config();

const kafka = new Kafka({
    clientId: 'demobet-dev',
    brokers: [process.env.KAFKA_SERVER],
});

const consumer = kafka.consumer({ groupId: 'test-group' });

async function processMessage(message)
{
    // console.log({ key: message.key.toString() });
    const messageJSON = JSON.parse(message.value);
    if (messageJSON.sportId === 7)
    {
        const key = message.key.toString();
        const database = Connection.db.db(process.env.dbName1);
        const colName = database.collection(process.env.topic);
        const jsonObj = {};
        jsonObj.key = key;
        jsonObj.message = messageJSON;
        jsonObj.sport = messageJSON.sportId;
        jsonObj.category = messageJSON.categoryId;
        jsonObj.tournament = messageJSON.tournamentId;
        jsonObj.teamname1 = messageJSON.teamNameOne;
        jsonObj.teamname2 = messageJSON.teamNameTwo;

        // mysql
        // const date = new Date();
        const inserted1 = await SQLDatabase.insertSport(messageJSON.sportId, messageJSON.sportName['hr-HR']);
        const inserted2 = await SQLDatabase.insertTournament(
            messageJSON.tournamentId,
            messageJSON.tournamentName['hr-HR'],
        );
        const inserted3 = await SQLDatabase.insertMatch(
            parseInt(jsonObj.key, 10),
            jsonObj.teamname1['hr-HR'],
            jsonObj.teamname2['hr-HR'],
            messageJSON.state,
            messageJSON.status,
            messageJSON.matchDate,
            // date,
            0,
            messageJSON.sportId,
            messageJSON.tournamentId,
        );
        console.log('inserted', inserted1, inserted2, inserted3);
        /* const exists = await colName.findOne({ key: jsonObj.key });
        if (exists == null)
        {
            await colName.insertOne(jsonObj);
            console.log('inserted: ' + message.key.toString());
        }
        else
        {
            console.log('existing, updating');
        } */
        await colName.updateOne(
            { key: message.key.toString() },
            {
                $set:
                {
                    message: jsonObj.message,
                    sport: jsonObj.sport,
                    category: jsonObj.category,
                    tournament: jsonObj.tournament,
                    teamname1: jsonObj.teamname1,
                    teamname2: jsonObj.teamname2,
                },
            },
            {
                upsert: true,
            },
        );
    }
}

const run = async () =>
{
    // Consuming
    await consumer.connect();
    await consumer.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: false });

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) =>
        {
            /* console.log({
                partition,
                topic,
                offset: message.offset,
                // value: message.value,
            }); */
            try
            {
                await processMessage(message);
                consumer.pause();
                await consumer.commitOffsets([{ topic, partition, offset: message.offset }]);
                // console.log(`commiting offset:${partition.toString()} - ${message.offset.toString()}`);
                setImmediate(() =>
                {
                    consumer.resume();
                });
            }
            catch (error)
            {
                console.error(error);
                process.exit();
            }
        },
    });
    /* await consumer.run({
        eachBatchAutoResolve: false,
        eachBatch: async ({
            batch,
            resolveOffset,
            heartbeat,
            isRunning,
            isStale,
        }) =>
        {
            const promises = [];
            for (const message of batch.messages)
            {
                if (!isRunning() || isStale())
                {
                    break;
                }
                promises.push((async () =>
                {
                    await processMessage(message);
                    resolveOffset(message.offset);
                    await heartbeat();
                })());
            }
            await Promise.all(promises);
        },
    }); */
};

// run().catch(console.error);

// module.exports = { Kafka };

module.exports = {
    run,
};
