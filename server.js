const express = require('express');
const cors = require('cors');

const cluster = require('cluster');

const routes = require('./routes/index');

const kafka = require('./services/kafka');

const { Connection } = require('./singletons/Connection');
const { SQLDatabase } = require('./singletons/MySQL');

const port = 4000;

const workerNum = 1;

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
    // const regex = /[A-Za-z]{2}/;
    app.use('/api/', routes);
    // app.use('/en/api/', routes);
    // app.use('/hr/api/', routes);

    // app.use(`/${regex}/api/`, routes);
    app.use('/:lang/api/', routes);
    // app.use(/[A-Za-z]{2}\/api/, routes);

    // console.log(`Worker ${process.pid} started`);
    app.listen(port, () =>
    {
        Connection.open();
        SQLDatabase.Initialize();
        // console.log(`listening on port ${port}`);
        console.log(`Worker ${process.pid} started`);
        // kafka.run();
    });
}
