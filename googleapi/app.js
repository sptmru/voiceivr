'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const speech = require('google-speech-api');

const APIKey = 'abcdefg'; //please enter correct API key here
const APILang = 'he-IL';

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));


app.post('/', function (req, res) {
    let filePath = req.body.filePath;
    let opts = {
        file: filePath,
        key: APIKey,
        lang: APILang,
        maxResults: 1,
        sampleRate: 16000,
    };
    speech(opts, function (err, results) {
        if (err) {
            console.log(err);
            return res.send("");
        }
        let result = '';
        if (results[0].result[0]) {
            result = results[0].result[0].alternative[0].transcript;
        } else {
            console.log(result);
        }
        return res.send(result);
    });

});

app.listen('8787', '127.0.0.1', function () {
    console.log('app started');
});