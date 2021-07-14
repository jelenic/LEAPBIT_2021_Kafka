const { Connection } = require('../singletons/Connection');

module.exports = {
    getMatches: async (param) =>
    {
        const where = {};
        // const message = {};
        // where.message = message;

        if (param.sportId != null)
        {
            where['message.sportId'] = parseInt(param.sportId, 10);
        }
        if (param.matchId != null)
        {
            where.key = param.matchId;
        }
        if (param.categoryId != null)
        {
            where.category = parseInt(param.categoryId, 10);
        }
        if (param.tournamentId != null)
        {
            where['message.tournamentId'] = parseInt(param.tournamentId, 10);
        }
        if (param.teamname != null)
        {
            const stringForR = `.*${param.teamname}*.`;
            const regex = new RegExp(stringForR);
            const first = {};
            const second = {};
            first['message.teamNameOne.hr-HR'] = regex;
            second['message.teamNameTwo.hr-HR'] = regex;
            where.$or = [first, second];
        }
        console.log(where);
        const database = Connection.db.db(process.env.dbName1);
        const colName = database.collection(process.env.topic);
        const data = await colName.find(
            where,
        ).project(
            {
                key: 1,
                category: 1,
                'message.tournamentId': 1,
                'message.teamNameOne': 1,
                'message.teamNameTwo': 1,
                'message.sportId': 1,
            },
        ).toArray();
        if (data != null)
        {
            return ({ error: false, data });
        }
        return ({ error: true, code: 404 });
    },
    /* searchBySport: async (sportId) =>
    {
        const database = Connection.db.db(process.env.dbName1);
        const colName = database.collection(process.env.topic);
        const data = await colName.find(
            {
                'message.sportId': parseInt(sportId, 10),
            },
            {
                key: 1,
                category: 1,
                'message.tournamentId': 1,
                'message.teamNameOne': 1,
                'message.teamNameTwo': 1,
                'message.sportId': 1,
            },
        ).toArray();
        if (data != null)
        {
            return ({ error: false, data });
        }
        return ({ error: true, code: 404, explain: 'no match with this sport' });
    },
    searchByCategory: async (categoryId) =>
    {
        const database = Connection.db.db(process.env.dbName1);
        const colName = database.collection(process.env.topic);
        const data = await colName.find(
            {
                category: parseInt(categoryId, 10),
            },
            {
                key: 1,
                category: 1,
                'message.tournamentId': 1,
                'message.teamNameOne': 1,
                'message.teamNameTwo': 1,
                'message.sportId': 1,
            },
        ).limit(10).toArray();
        // console.log(data);
        if (data != null)
        {
            return ({ error: false, data });
        }
        return ('no match with this category');
    },
    searchByTournament: async (tournamentId) =>
    {
        const database = Connection.db.db(process.env.dbName1);
        const colName = database.collection(process.env.topic);
        const data = await colName.find(
            {
                'message.tournamentId': parseInt(tournamentId, 10),
            },
            {
                key: 1,
                category: 1,
                'message.tournamentId': 1,
                'message.teamNameOne': 1,
                'message.teamNameTwo': 1,
                'message.sportId': 1,
            },
        ).toArray();
        if (data != null)
        {
            return ({ error: false, data });
        }
        return ('no match with this tournament');
    },
    searchByTeamname: async (teamnameReg) =>
    {
        const database = Connection.db.db(process.env.dbName1);
        const colName = database.collection(process.env.topic);
        const stringForR = `.*${teamnameReg}*.`;
        const regex = new RegExp(stringForR);
        console.log(regex);
        const data = await colName.find(
            {
                'message.teamNameOne.hr-HR': regex,
            },
            {
                key: 1,
                category: 1,
                'message.tournamentId': 1,
                'message.teamNameOne': 1,
                'message.teamNameTwo': 1,
                'message.sportId': 1,
            },
        ).toArray();
        const data2 = await colName.find(
            {
                'message.teamNameTwo.hr-HR': regex,
            },
            {
                key: 1,
                category: 1,
                'message.tournamentId': 1,
                'message.teamNameOne': 1,
                'message.teamNameTwo': 1,
                'message.sportId': 1,
            },
        ).toArray();
        if (data != null || data2 != null)
        {
            const dataFull = data.concat(data2);
            return ({ error: false, dataFull });
        }
        return ('no match with this teamname');
    }, */
};
