const { Connection } = require('../singletons/Connection');

module.exports = {
    getSingleMatchById: async (matchId) =>
    {
        const database = Connection.db.db(process.env.dbName1);
        const colName = database.collection(process.env.topic);
        const data = await colName.findOne({ key: matchId });
        if (data != null)
        {
            return (data);
        }
        return ('no match with this id');
    },
};
