const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

class SQLDatabase
{
    static async Initialize()
    {
        if (SQLDatabase.Pool)
        {
            console.log('exists');
            return this.Pool;
        }

        this.Pool = await mysql.createPool({
            host: 'localhost',
            user: 'baseuser',
            password: process.env.MYSQLPass,
            database: 'praksa',
        });
        // console.log(this.Pool);
        if (!await this.tableExists('Match_Table'))
        {
            try
            {
                // eslint-disable-next-line max-len
                const createQuery = 'CREATE TABLE IF NOT EXISTS Match_Table (id INT PRIMARY KEY, sportid INT REFERENCES Sport_Table(id), tournamentid INT REFERENCES Tournament_Table(id), teamNameOne VARCHAR(50), teamNameTwo VARCHAR(50), state VARCHAR(20), status VARCHAR(20), matchDate DATETIME, orderNum INT);';
                await this.Pool.execute(createQuery);
            }
            catch (err)
            {
                console.error('Table Match creation failed:', err);
            }
        }
        if (!await this.tableExists('Tournament_Table'))
        {
            try
            {
                // eslint-disable-next-line max-len
                const createQuery = 'CREATE TABLE IF NOT EXISTS Tournament_Table (id INT PRIMARY KEY, tournamentName VARCHAR(100));';
                await this.Pool.execute(createQuery);
            }
            catch (err)
            {
                console.error('Table Tournament creation failed:', err);
            }
        }
        if (!await this.tableExists('Sport_Table'))
        {
            try
            {
                // eslint-disable-next-line max-len
                const createQuery = 'CREATE TABLE IF NOT EXISTS Sport_Table (id INT PRIMARY KEY, sportName VARCHAR(100));';
                await this.Pool.execute(createQuery);
            }
            catch (err)
            {
                console.error('Table Sport creation failed:', err);
            }
        }
        return this.Pool;
    }

    static async tableExists(tableName)
    {
        try
        {
            const query = `SELECT 1 FROM ${tableName} LIMIT 1;`;
            await this.Pool.execute(query);
            // console.log(result);
            return true;
        }
        catch (err)
        {
            return false;
        }
    }

    static async insertMatch(id, teamNameOne, teamNameTwo, state, status, matchDate, orderNum, sportid, tournamentid)
    {
        try
        {
            const testQuery = `SELECT * FROM Match_Table WHERE id = ${id}`;
            const result = await this.Pool.execute(testQuery);
            // console.log(result[0]);
            if (result[0].length === 0)
            {
                console.log('inserting');

                // eslint-disable-next-line max-len
                const query = 'INSERT INTO Match_Table (id, teamNameOne, teamNameTwo, state, status, matchDate, orderNum, sportid, tournamentid) VALUES (?,?,?,?,?,?,?,?,?)';
                // eslint-disable-next-line max-len
                const values = [id, teamNameOne, teamNameTwo, state, status, matchDate, orderNum, sportid, tournamentid];
                console.log(mysql.format(query, values));
                await this.Pool.query(query, values);
                // console.log(result2);
            }
            else
            {
                console.log('updating');
                // eslint-disable-next-line max-len
                const query = 'UPDATE Match_Table SET id=?, teamNameOne=?, teamNameTwo=?, state=?, status=?, matchDate=?, orderNum=?, sportid=?, tournamentid=? WHERE id=?';
                // eslint-disable-next-line max-len
                const values = [id, teamNameOne, teamNameTwo, state, status, matchDate, orderNum, sportid, tournamentid, id];
                await this.Pool.query(query, values);
                // console.log(result2);
                console.log(id);
            }
            return true;
        }
        catch (error)
        {
            // console.log(error.message);
            return false;
        }
    }

    static async insertSport(id, name)
    {
        try
        {
            const testQuery = `SELECT * FROM Sport_Table WHERE id = ${id}`;
            const result = await this.Pool.execute(testQuery);
            if (result[0].length === 0)
            {
                console.log('inserting sport');
                // eslint-disable-next-line max-len
                const query = 'INSERT INTO Sport_Table (id, sportName) VALUES (?,?)';
                const values = [id, name];
                await this.Pool.query(query, values);
            }
            return true;
        }
        catch (error)
        {
            return false;
        }
    }

    static async insertTournament(id, name)
    {
        try
        {
            const testQuery = `SELECT * FROM Tournament_Table WHERE id = ${id}`;
            const result = await this.Pool.execute(testQuery);
            if (result[0].length === 0)
            {
                console.log('inserting tournament');
                // eslint-disable-next-line max-len
                const query = 'INSERT INTO Tournament_Table (id, tournamentName) VALUES (?,?)';
                const values = [id, name];
                await this.Pool.query(query, values);
            }
            return true;
        }
        catch (error)
        {
            return false;
        }
    }
}

SQLDatabase.Pool = null;

module.exports = { SQLDatabase };
