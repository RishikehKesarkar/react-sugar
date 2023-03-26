var signIn = require("./databaseop/signIn");
var stateMaster = require("./databaseop/stateMaster");
var companyMaster = require("./databaseop/companyMaster");
var roleMaster = require("./databaseop/roleMaster");
//------------------------------------------------------------------------------------------------------

var express = require("express");
var cors = require("cors");
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', router);


router.use((request, response, next) => {
    next();
})
//-----------------------------------------------------------------------------------------------
// SignIn Up Api

router.route('/signIn/:userName/:password').get((request, response) => {

    let userName = request.params.userName;
    let password = request.params.password;
    signIn.signIn(userName, password).then(res => {
        response.json(res);
    })
})

router.route('/signUp').post((request, response) => {
    let data = { ...request.body }
    signIn.signUp(data).then(res => {
        response.json(res);
    })
})

// End SignIn Up Api
//--------------------------------------------------------------------------------------------------
// state master Api
router.route('/stateMaster_GetAll').get((request, response) => {
    stateMaster.GetAll().then(res => {
        response.json(res);
    })
})
//---------------------------------------------------------------------------------------------------
// company Master
router.route('/companyMaster_GetAll').get((request, response) => {
    companyMaster.GetAll().then(res => {
        response.json(res);
    })
})

router.route('/companyMaster_Save').post((request, response) => {
    let data = { ...request.body }
    companyMaster.saveEdit(data).then(res => {
        response.json(res);
    })
})

// end company Master
//---------------------------------------------------------------------------------------------------
// Role Master

router.route('/roleMaster_GetAll').get((request, response) => {
    roleMaster.GetAll().then(res => {
        response.json(res);
    })
})

router.route('/roleMaster_GetById/:Id').get((request, response) => {
    let Id = request.params.Id;
    roleMaster.GetById(Id).then(res => {
        response.json(res);
    })
})

router.route('/roleMaster_SaveEdit').post((request, response) => {
    let data = { ...request.body };
    roleMaster.saveEdit(data).then(res => {
        response.json(res);
    })
})

//--------------------------------------------------------------------------------------------------
var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);