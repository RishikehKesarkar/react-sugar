const sql = require('mssql');
const con = require('./dbConfig');
const returnSet = require('./returnSet')

async function GetAll(data) {
    try {
        let pool = await sql.connect(con);
        let GetAll = await pool.request().execute('roleMaster_GetAll');
        return returnSet(GetAll.recordset, 200, true);
    }
    catch (err) {
        return returnSet(data, 400, false, true, err.message);
    }
}

async function GetById(Id) {
    try {
        let pool = await sql.connect(con);
        let GetAll = await pool.request()
            .input('Id', sql.Int, Id)
            .execute('roleMaster_GetById');

        let GetbyroleId = await GetByRoleId(Id);
        if (GetbyroleId.data != undefined && GetAll.recordset[0] != undefined) {
            GetAll.recordset[0]["roleAccess"] = GetbyroleId.data;
        }
        return returnSet(GetAll.recordset[0], 200, true);
    }
    catch (err) {
        return returnSet(undefined, 400, false, true, err.message);
    }
}

async function GetByRoleId(Id) {
    try {
        let pool = await sql.connect(con);
        let GetAll = await pool.request()
            .input('roleId', sql.Int, Id)
            .execute('roleAccess_GetByRoleId');
        return returnSet(GetAll.recordset[0], 200, true);
    }
    catch (err) {
        return returnSet(undefined, 400, false, true, err.message);
    }
}

async function saveEdit(data) {
    try {
        let pool = await sql.connect(con);
        let saveEdit = await pool.request()
            .input('Id', sql.Int, data.Id)
            .input('roleName', sql.NVarChar, data.roleName)
            .input('description', sql.NVarChar, data.description)
            .input('roleAccess', sql.NVarChar, data.roleAccess.roleAccess)
            .input('createdBy', sql.Int, data.createdBy)
            .input('updatedBy', sql.Int, data.updatedBy)
            .execute('roleMaster_SaveEdit');

        return returnSet(saveEdit.recordset, 200, true,);
    }
    catch (err) {
        return returnSet(data, 400, false, true, err.message);
    }
}

module.exports = {
    GetAll: GetAll,
    GetById: GetById,
    saveEdit:saveEdit
}