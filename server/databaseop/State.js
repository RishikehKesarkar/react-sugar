const sql = require('mssql');
const con = require('./dbConfig');
const returnSet= require('./returnSet')

async function saveState(data) {
    try {
        let pool = await sql.connect(con);
        let saveEdit = await pool.request()
            .input('stateName', sql.NVarChar, data.stateName)
            .query("insert into state_Master(stateName) values(@stateName)");

            return returnSet(saveEdit.recordset,200,true);
    }
    catch (err) {
        return returnSet(data,400,false,true,err.message);
    }
}

async function saveDistrict(data) {
    try {
        let pool = await sql.connect(con);
        let saveEdit = await pool.request()
            .input('stateId', sql.Int, data.stateId)
            .input('districtName', sql.NVarChar, data.districtName)
            .query("insert into district_Master(stateId,districtName) values(@stateId,@districtName)");

            return returnSet(saveEdit.recordset,200,true);
    }
    catch (err) {
        return returnSet(data,400,false,true,err.message);
    }
}

async function saveTahasil(data) {
    try {
        let pool = await sql.connect(con);
        let saveEdit = await pool.request()
            .input('districtId', sql.Int, data.districtId)
            .input('tahasilName', sql.NVarChar, data.tahasilName)
            .query("insert into tahasil_Master(districtId,tahasilName) values(@districtId,@tahasilName)");

            return returnSet(saveEdit.recordset,200,true);
    }
    catch (err) {
        return returnSet(data,400,false,true,err.message);
    }
}

async function saveVillage(data) {
    try {
        let pool = await sql.connect(con);
        let saveEdit = await pool.request()
            .input('tahasilId', sql.Int, data.tahasilId)
            .input('villageName', sql.NVarChar, data.villageName)
            .query("insert into village_Master(tahasilId,villageName) values(@tahasilId,@villageName)");

            return returnSet(saveEdit.recordset,200,true);
    }
    catch (err) {
        return returnSet(data,400,false,true,err.message);
    }
}

module.exports = {
    saveVillage: saveVillage,
    saveTahasil: saveTahasil,
    saveDistrict: saveDistrict,
    saveState:saveState
}