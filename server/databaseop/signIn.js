const sql = require('mssql');
const con = require('./dbConfig');
const returnSet = require('./returnSet');
const jwt = require("jsonwebtoken");


async function signIn(userName, password) {
    try {
        let jwtToken = jwt.sign({
            id: userName
        },
            'shhhhh'
        );

        let pool = await sql.connect(con);
        let signIn = await pool.request()
            .input('userName', sql.NVarChar, userName)
            .input('password', sql.NVarChar, password)
            .execute('validate_SignIn');

        let returnset = returnSet(signIn.recordset[0], 200, true);
        returnset.data["accessToken"] = jwtToken;
        return returnset;
    }
    catch (err) {
        return returnSet("", 400, false, true, err.message);
    }
}

async function signUp(data) {
    try {
        let pool = await sql.connect(con);
        let signUp = await pool.request()
            .input('Id', sql.Int, data.Id)
            .input('fullName', sql.NVarChar, data.fullName)
            .input('userName', sql.NVarChar, data.userName)
            .input('password', sql.NVarChar, data.password)
            .input('emailAddress', sql.NVarChar, data.emailAddress)
            .input('mobileNumber', sql.Int, data.mobileNumber)
            .input('companyId', sql.Int, data.companyId)
            .input('roleId', sql.Int, data.roleId)
            .input('stateId', sql.Int, data.stateId)
            .input('cityName', sql.NVarChar, data.cityName)
            .input('createdBy', sql.Int, data.createdBy)
            .input('updatedBy', sql.Int, data.updatedBy)
            .execute('SignUp');

        return returnSet(data, 200, true);
    }
    catch (err) {
        return returnSet(undefined, 400, false, true, err.message);
    }
}

module.exports = {
    signIn: signIn,
    signUp: signUp
}