const express = require('express');
const cors = require('cors');

const cluster = require('cluster');

const routes = require('./routes/index');

const kafka = require('./services/kafka');

const { Connection } = require('./singletons/Connection');

const port = 4000;

const workerNum = 4;

if (cluster.isMaster)
{
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < workerNum; i += 1)
    {
        cluster.fork();
    }
    cluster.on('exit', (worker) =>
    {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else
{
    const app = express();
    app.use(cors());
    app.use('/api/', routes);
    // console.log(`Worker ${process.pid} started`);
    app.listen(port, () =>
    {
        Connection.open();
        // console.log(`listening on port ${port}`);
        console.log(`Worker ${process.pid} started`);
        kafka.run();
    });
}
