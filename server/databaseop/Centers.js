const sql = require('mssql');
const con = require('./dbConfig');
const returnSet= require('./returnSet');

const getAll = async () => {
    try {
        let pool = await sql.connect(con);
        let getAll = await pool.request().execute('gsp_center_getAll');
        return returnSet(getAll.recordset);
    }
    catch (err) {
        return returnSet(undefined,400,false,true,err.message);
    }
}

const getById = async (id) => {
    try {
        let pool = await sql.connect(con);
        let getById = await pool.request()
            .input('Id', sql.Int, id).execute('gsp_center_getById');

            return returnSet(getById.recordset[0]);
    }
    catch (err) {
        return returnSet(undefined,400,false,true,err.message);
    }
}

module.exports = {
    getAll: getAll,
    getById:getById
}