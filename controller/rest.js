const restServices = require('../services/rest');

module.exports = {
    /* getSingleMatchById: async (req, res) =>
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
    searchBySport: async (req, res) =>
    {
        if (!req.params.sportId)
        {
            res.send('sport id missing');
        }
        else
        {
            const result = await restServices.searchBySport(req.params.sportId);
            // console.log(result);
            res.send(result);
        }
    },
    searchByCategory: async (req, res) =>
    {
        if (!req.params.categoryId)
        {
            res.send('category id missing');
        }
        else
        {
            const result = await restServices.searchByCategory(req.params.categoryId);
            // console.log(result);
            res.send(result);
        }
    },
    searchByTournament: async (req, res) =>
    {
        if (!req.params.tournamentId)
        {
            res.send('tournament id missing');
        }
        else
        {
            const result = await restServices.searchByTournament(req.params.tournamentId);
            // console.log(result);
            res.send(result);
        }
    },
    searchByTeamname: async (req, res) =>
    {
        if (!req.params.teamname)
        {
            res.send('teamname missing');
        }
        else
        {
            const result = await restServices.searchByTeamname(req.params.teamname);
            // console.log(result);
            res.send(result);
        }
    }, */
    defaultQuery: async (req, res) =>
    {
        if (!req.params)
        {
            res.send('params missing');
        }
        else
        {
            const result = await restServices.getMatches(req.params);
            // console.log(result);
            res.send(result);
        }
    },
};
