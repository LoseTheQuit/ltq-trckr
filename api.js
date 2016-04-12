'use strict';
var colors = require('colors');
var fs = require('fs');
var express = require('express');
var path = require('path');
var app = express();
var http = require("http");
var bodyParser = require('body-parser');
var Client = require('node-rest-client').Client;
var client = new Client();
var app = express();
var mktoCookie = '';
var multer = require('multer');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

var brendanCarr = 'id:099-EMG-811%26token:_mch-medassets.com-1456431034264-21713' + '&fields=cookies,email';
var realReqBody = null;

app.post('http://mkto-trckr.herokuapp.com/', function (req, res) {

    console.log('INCOMING POST REQUEST - Request Token');
    console.log('***');
    console.log('From POST: ' + req.body.name);
    console.log('***');
    console.log('From POST: ' + req.body.mktoID);
    console.log('***');
    mktoCookie = req.body.mktoID;
    console.log('\n');
    tokenRequest(req.body.mktoID);

    setTimeout(function () {
        res.send(realReqBody);
    }, 1000);

    //    var whileCounter = 0;
    //
    //    while (realReqBody !== null || whileCounter < 0) {
    //        res.send(realReqBody);
    //        whileCounter++;
    //    }

});

app.get('/', function (req, res) {
    console.log('INCOMING GET REQUEST - Load Template');

    // tokenRequest(req.query.mktoID);

    var html = fs.readFileSync('views/index.html');
    // var html = '<p>' + realReqBody +  '</p>'; 
    res.end(html);
});

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
    console.log('\n');
    console.log('********************************************'.black.bgWhite);
    console.log("The frontend server is running on port 3000!".black.bgWhite);
    console.log('********************************************'.black.bgWhite);
    console.log('\n');
});

debugger;

var marketo_instance = "https://099-EMG-811.mktorest.com/";
var tokenRequestUrl = marketo_instance + "identity/oauth/token?" + "grant_type=client_credentials&client_id=862203c7-279f-49c5-9764-7cf33acd78c4&client_secret=mTIWCmlHHFdNbILSzMF6UnA218LaWnp3";

var apiUsageEndPoint = ['/rest/v1/stats/usage.json', '/rest/v1/stats/usage/last7days.json', '/rest/v1/stats/errors.json', '/rest/v1/stats/errors/last7days.json'];

var endPoint = ['/rest/v1/lead/' + 155 + randomInt(1777, 5777) +
    '.json', '/rest/v1/leads.json', 'rest/v1/leads/describe.json'];

var marketoFields = "&fields=email,firstName,lastName,formCount,company,phone,country,Type_of_Organization__c,Level__c,Functional_Area__c,Type_of_Organization__c,Size_Number_of_Facilities__c,Size_Number_of_Beds__c,Zip_Postal_Code__c,optionalPhoneNumber,Goals__c,otherGoals,New_Timeline__c,Patient_Accounting_System__c,Gross_AR_Days__c,Budget__c,Pending_RFI_RFP__c,Time_to_Call__c,Contact_me_Details__c,Interest_Area__c,Open_RFP_RFI__c,RFP_RFI_Document__c,RFP_RFI_Due_Date__c,RFP_RFI_Alternate_Contact__c,unsubscribed,ContactUsType";

var mostUsedFields = "&fields=email,firstName,lastName,company,phone,country,Level__c,Functional_Area__c,unsubscribed";

var filter_1 = '?filterType=id&filterValues=50,2343,88498&fields=firstName';
var filter_2 = '?filterType=Id&filterValues=50,1000,1000';
var filter_type_and_values = '&filterType=cookie&filterValues=' +
    mktoCookie.replace('127.0.0.1', 'marketo.com') + '&fields=cookies,email';

function tokenRequest(mkto_id) {
    console.log('tokenRequest has begun!');
    client.get(tokenRequestUrl, function (data, response) {
        // parsed response body as js object 
        // console.log(data);
        console.log('= == == == == == == == =' + '\n');

        for (var key in data) {
            console.log('Key: ' + key);
            console.log('Value: ' + data[key]);
            console.log('---------------------');
        }

        for (var key in response) {
            // console.log('-- ' + key);
            var obj = response[key];
            // console.log('++ ' + obj);
            for (var prop in obj) {
                // console.log(prop + " = " + obj[prop]);
            }
        }

        var usageApiCall = marketo_instance + apiUsageEndPoint[3] + '?access_token=' + data.access_token;

        var nestedApiCall = marketo_instance + endPoint[0] + '?access_token=' + data.access_token + "&filterType=cookie&filterValues=" + mkto_id + mostUsedFields;

        var nestedApiCallV2 = marketo_instance + endPoint[1] + '?access_token=' + data.access_token + filter_2;

        var nestedApiCallV3 = marketo_instance + endPoint[2] + '?access_token=' + data.access_token;

        var customAPIRequest = "https://099-EMG-811.mktorest.com" + "/rest/v1/leads.json" +
            "?access_token=" + data.access_token + '&filterType=cookie&filterValues=' +
            brendanCarr + marketoFields;

        apiCall(nestedApiCall);
        // apiCall(nestedApiCallV2);
        // apiCall(nestedApiCallV3);
        //  apiCall(customAPIRequest);
        console.log('\n' + '= == == == == == == == =');

    });
}

function apiCall(apiCallUrl) {

    console.log('*********************');
    console.log('\n');
    console.dir(apiCallUrl);
    console.log('\n');
    console.log('*********************');

    client.get(apiCallUrl, function (data, response) {

        //        for (var key in data) {
        //            console.log('---------------------');
        //            console.log('apiCallUrl Key: ' + key);
        //            console.log('apiCallUrl Value: ' + data[key]);
        //            console.log('---------------------');
        //        } 

        console.log('= == == == == == == == =' + '\n');

        console.log('>------------------------------------<');
        console.log('\n');
        console.log(data.result);
        console.log('\n');
        console.log('>------------------------------------<');
        console.log('\n');

        var forIn = data;

        for (var key in data) {
            console.log('|||||||||||||||||||');
            console.log('data Key: ' + key);
            console.log('  ');
            console.log('data Value: ' + forIn[key]);
            console.log('|||||||||||||||||||');
        }

        var forInDescribe = data.success;

        for (var key in forInDescribe) {
            console.log('|||||||||||||||||||');
            console.log('forIn Key: ' + key);
            console.log('forIn Value: ' + forInDescribe[key]);
            console.log('|||||||||||||||||||');
        }

        console.log('\n' + '= == == == == == == == =');
        console.log('\n');
        realReqBody = data.result;
        console.log(realReqBody);
        console.log('\n');
        // fs.writeFileSync('response.json', JSON.stringify(data));
        return realReqBody;
    });

}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/*
=====================================================
=====================================================
=====================================================
*/