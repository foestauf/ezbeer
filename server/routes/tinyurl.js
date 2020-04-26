const express = require('express');
const router = express.Router();
const dns = require('dns');
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, mongoOptions);
const Schema = mongoose.Schema;
const urlSchema = new Schema({
    fullUrl: {type: String, required: true, unqieu: true},
    shortUrl: {type: String, required: true, unique: true},
    dateCreated: {type: Number, default: Date.now},
    lastUsedDate: {type: Number, default: Date.now}
});
const Url = mongoose.model("Url", urlSchema);

let fullUrl;

function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


router.post('/new/:newUrl(*)', (req, res) => {
    fullUrl = req.params.newUrl;
    console.log(fullUrl);
    if (validURL(fullUrl)) {
        console.log('Valid URL received');
        if (!dnsCheck(fullUrl)) {
            Url.findOne({fullUrl: fullUrl}, (err, docs) => {
                console.log('Inside new URL findOne call back')
            }).then((docs) => {
                console.log('Hello World' + docs);
                if (docs === null) {
                    console.log('Second call to docs' + docs);
                    console.log(fullUrl + req.params.newURL);
                    console.log('Good news it doesn\'t exist yet');
                    let short_url = makeid(5);
                    let createUrl = function () {
                        let url = new Url({
                            fullUrl: fullUrl,
                            shortUrl: short_url
                        });
                        console.log('ready to save to DB');
                        url.save((err, data) => {
                            if (err) return console.log(err);
                        })
                    };
                    createUrl();
                    res.json({
                        original_url: fullUrl,
                        short_url: 'http://3.210.231.52/api/shorturl/' + short_url
                    })
                } else {
                    console.log('URL Exists use existing short url');
                    res.json({
                        'original_url': docs.fullUrl,
                        short_url: 'http://3.210.231.52/api/shorturl/' + docs.shortUrl
                    })

                }
            });
            console.log('DNS confirmed');
        } else {
            console.log('BAD DNS, do something!');
        }
    } else {
        console.log('Bad URL homie');
        res.json({
            error: "Invalid URL"
        })
    }
});

router.get('/:shortUrl(*)', (req, res) => {
    console.log(req.params.shortUrl);
    let urlSearch = req.params.shortUrl;
    var query = function (personName, done) {
        Url.findOne({shortUrl: urlSearch}, function (err, docs) {
            console.log('Inside DB FIND callback');
            console.log('Searching for ' + urlSearch);
            console.log(docs);
            if (err) return console.log(err);
            if (docs != null) {
                res.redirect(docs.fullUrl);
            } else {
                res.end('Can\'t find URL');
            }
        });
    };
    query();
});

function validURL(str) {
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

function dnsCheck(param) {
    console.log('Now in dnsCheck');
    dns.resolve4(extractHostname(param), (err, addresses) => {
        if (err) {
            return false;
        }
        console.log(`addresses: ${JSON.stringify(addresses)}`);
        addresses.forEach((a) => {
            dns.reverse(a, (err, hostnames) => {
                if (err) {
                    return false;
                }
                console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
            });
        });
        return true;
    });
}


function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }
    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];
    console.log('hostname is: ' + hostname);
    return hostname;
}

module.exports = router;