include("SpeechTools.jm");

const dft_min = 40;
const dft_confirm = 70;

function playFile(fileName, callBack, callBackArgs) {
    session.streamFile(fileName, callBack, callBackArgs);
}

function getVoiceInput() {
    for (;;) {
        if (!session.ready()) {
            return false;
        }
        var result = testSpeechObtainer.run();
        if (result[0] == "1") {
            playFile("digits/1.wav");
            break;
        } else if (result[0] == "2") {
            playFile("digits/2.wav");
            break;
        } else if (result[0] == "3") {
            playFile("digits/3.wav");
            break;
        } else {
            playFile("digits/0.wav");
            break;
        }

    }
    return result[0];
}

session.answer();
playFile("misc/provide_reference_number.wav");

const asr = new SpeechDetect(session, "pocketsphinx");

asr.debug = 1;

const testSpeechObtainer = new SpeechObtainer(asr, 1, 5000);
testSpeechObtainer.setGrammar("test", "", "input", dft_min, dft_confirm, true);
testSpeechObtainer.addItemAlias("^jerusalem", 0);
testSpeechObtainer.addItemAlias("^kiryatshmona", 1);
testSpeechObtainer.addItemAlias("^roshhaayin", 2);
testSpeechObtainer.addItemAlias("^petahtikva", 3);

result = getVoiceInput();

asr.stop();