const sql = require('mssql');
const con = require('./dbConfig');
const returnSet= require('./returnSet')

const getAll = async () => {
    try {
        let pool = await sql.connect(con);
        let getAll = await pool.request().execute('gsp_sugarFactory_getAll');
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
            .input('Id', sql.Int, id).execute('gsp_sugarFactory_getById')
        //.query("select * from sugarFactory_Master where Id=@Id");
        return returnSet(getById.recordset[0]);
    }
    catch (err) {
        return returnSet(undefined,400,false,true,err.message);
    }
}

async function saveEdit(data) {
    try {
        let pool = await sql.connect(con);
        let saveEdit = await pool.request()
            .input('Id', sql.Int, data.Id)
            .input('factoryName', sql.NVarChar, data.factoryName)
            .input('shortName', sql.NVarChar, data.shortName)
            .input('factoryHead', sql.NVarChar, data.factoryHead)
            .input('stateId', sql.Int, data.stateId)
            .input('cityName', sql.NVarChar, data.cityName)
            .input('pinCode', sql.Int, data.pinCode)
            .input('factoryAddress', sql.NVarChar, data.factoryAddress)
            .input('startDate', sql.NVarChar, data.startDate)
            .input('endDate', sql.NVarChar, data.endDate)
            .input('createdBy', sql.Int, data.createdBy) //data.createdBy
            .input('updatedBy', sql.Int, data.updatedBy)
            .execute('isp_sugarFactory');

            return returnSet(saveEdit.recordset,200,true);
    }
    catch (err) {
        return returnSet(data,400,false,true,err.message);
    }
}

module.exports = {
    getAll: getAll,
    getById: getById,
    saveEdit: saveEdit
}