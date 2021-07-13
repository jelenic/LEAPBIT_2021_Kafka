const restServices = require('../services/rest');

module.exports = {
    getSingleMatchById: async (req, res) =>
    {
        if (!req.params.matchId)
        {
            res.send('match id missing');
        }
        else
        {
            const result = await restServices.getSingleMatchById(req.params.matchId);
            // console.log(result);
            res.send(result);
        }
    },
};
