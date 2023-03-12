const returnSet = (data,status=200,isSuccess=false,isError=false,message="") => {

    return {status:status,isSuccess:isSuccess,isError:isError,data:data,message:message}
}

module.exports = returnSet; 