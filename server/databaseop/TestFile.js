const sql = require('mssql');
const con = require('./dbConfig');
const returnSet= require('./returnSet')
const TestgetById = async (id) => {
    try {
        let pool = await sql.connect(con);
        let getById = await pool.request()
            .input('Id', sql.Int, id).execute('gsp_sugarFactory_getById');
        return returnSet(getById.recordset[0]);
        //return {status:200,isSuccess:true,data:getById.recordset[0],msg:""};
    }
    catch (err) {
        return returnSet("",400,false,true,err.message);
       //return {status:400,isSuccess:false,data:"",msg:err.message};
    }
}

module.exports = {
    TestgetById: TestgetById
}