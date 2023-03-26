const sql = require('mssql');
const con = require('./dbConfig');
const returnSet= require('./returnSet')

async function GetAll(data) {
    try {
        let pool = await sql.connect(con);
        let GetAll = await pool.request()
            .execute('stateMaster_GetAll');

            return returnSet(GetAll.recordset,200,true);
    }
    catch (err) {
        return returnSet(data,400,false,true,err.message);
    }
}

module.exports = {
    GetAll: GetAll
}