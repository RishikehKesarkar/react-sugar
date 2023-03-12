var sugarFactory = require("./databaseop/sugarFactory");
var center = require("./databaseop/Centers");
var Tests=require("./databaseop/TestFile");
var state=require("./databaseop/State");
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
// Test Api

router.route('/Test_GETById/:id').get((request, response) => {
    try {
        Tests.TestgetById(request.params.id).then(res => {
            response.json(res);
        })
    }
    catch (err) {
        console.log("Apierr", err);
    }
})

//-----------------------------------------------------------------------------------------------
// Factory Api
router.route('/sugarFactory_GETAll').get((request, response) => {
    try {
        sugarFactory.getAll().then(res => {
            response.json(res);
        })
    }
    catch (err) {
        console.log(err);
    }
})

router.route('/sugarFactory_GETById/:id').get((request, response) => {
    try {
        sugarFactory.getById(request.params.id).then(res => {
            response.json(res);
        }).catch((err) => {
            console.log(err);
        })
    }
    catch (err) {
        console.log("Apierr", err);
    }
})

router.route('/sugarFactory_POST').post((request, response) => {
    let data = { ...request.body }
    sugarFactory.saveEdit(data).then(res => {
        response.json(res);
    })
})

router.route('/sugarFactory_PUT/:id').put((request, response) => {
    try {
        let data = { ...request.body };
        sugarFactory.saveEdit(data).then(res => {
            response.json(res);
        })
    }
    catch (err) {
        console.log("Apierr", err);
    }
})

// End factory Api
//--------------------------------------------------------------------------------------------------

// center Api

router.route("/center_GETALL").get((request, response) => {
    try {
        center.getAll().then(res => {
            response.json(res);
        })
    }
    catch (err) {
        console.log("center_getAll", err);
    }
})

router.route('/center_GetById/:id').get((request, response) => {
    try {
        sugarFactory.getById(request.params.id).then(res => {
            response.json(res[0]);
        }).catch((err) => {
            console.log(err);
        })
    }
    catch (err) {
        console.log("Apierr", err);
    }
})

// end center Api
//------------------------------------------------------------------------------------------------------
// State Api

router.route('/saveState').post((request, response) => {
    let data = { ...request.body }
    state.saveState(data).then(res => {
        response.json(res);
    })
})

router.route('/saveDistrict').post((request, response) => {
    let data = { ...request.body }
    state.saveDistrict(data).then(res => {
        response.json(res);
    })
})

router.route('/saveTahasil').post((request, response) => {
    let data = { ...request.body }
    state.saveTahasil(data).then(res => {
        response.json(res);
    })
})

router.route('/saveVillage').post((request, response) => {
    let data = { ...request.body }
    state.saveVillage(data).then(res => {
        response.json(res);
    })
})

// end State Api
//---------------------------------------------------------------------------------------------------
var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);