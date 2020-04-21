use("CURL");
use("File");

session.answer();
session.streamFile("misc/provide_reference_number.wav");

const filePath = "/tmp/" + Date.now() + ".wav";
const fd = new FileIO(filePath, "rc");

const maxreclen = 5;
const silencethreshold = 500;
const silencehits = 3;
const curl = new CURL();

const APIUrl = "http://127.0.0.1:8787/";

if (session.ready()) {
    recordedFile = session.recordFile(filePath, "", "", maxreclen, silencethreshold, silencehits);
    curl.run("POST", APIUrl, "filePath=" + filePath, function (result) {
        console_log(result);
        if (result == "קרית שמונה") { //Kiryat-Shmona
            session.streamFile("digits/1.wav");
        } else if (result == "ראש העין") { //Rosh Khaain
            session.streamFile("digits/2.wav");
        } else if (result == "פתח תקווה") { //Petah Tikva
            session.streamFile("digits/3.wav");
        } else {
            playFile("digits/0.wav");
        }
    }, "", "", 30);
}