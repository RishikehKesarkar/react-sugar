const sql = require('mssql');
const con = require('./dbConfig');
const returnSet = require('./returnSet')

async function GetAll(data) {
    try {
        let pool = await sql.connect(con);
        let GetAll = await pool.request().execute('companyMaster_GetAll');
        return returnSet(GetAll.recordset, 200, true);
    }
    catch (err) {
        return returnSet(data, 400, false, true, err.message);
    }
}

async function saveEdit(data) {
    try {
        let pool = await sql.connect(con);
        let saveEdit = await pool.request()
            .input('Id', sql.Int, data.Id)
            .input('shortName', sql.NVarChar, data.shortName)
            .input('companyName', sql.NVarChar, data.companyName)
            .input('companyAddress', sql.NVarChar, data.companyAddress)
            .input('optionalAddress', sql.NVarChar, data.optionalAddress)
            .input('stateId', sql.Int, data.stateId)
            .input('cityName', sql.NVarChar, data.cityName)
            .input('pinCode', sql.Int, data.pinCode)
            .input('gstNumber', sql.NVarChar, data.gstNumber)
            .input('cstNumber', sql.NVarChar, data.cstNumber)
            .input('tinNumber', sql.NVarChar, data.tinNumber)
            .input('panNumber', sql.NVarChar, data.panNumber)
            .input('fssaiNumber', sql.NVarChar, data.fssaiNumber)
            .input('mobileNumber', sql.Int, data.mobileNumber)
            .input('emailAddress', sql.NVarChar, data.emailAddress)
            .input('createdBy', sql.Int, data.createdBy)
            .input('updatedBy', sql.Int, data.updatedBy)
            .execute('companyMaster_SaveEdit');

        return returnSet(saveEdit.recordset, 200, true,);
    }
    catch (err) {
        return returnSet(data, 400, false, true, err.message);
    }
}

module.exports = {
    GetAll: GetAll,
    saveEdit: saveEdit
}