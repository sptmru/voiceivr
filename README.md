# FreeSWITCH Voice IVR GUIDE
- install dependencies:

```
# wget -O - https://files.freeswitch.org/repo/deb/debian/freeswitch_archive_g0.pub | apt-key add -

# echo "deb http://files.freeswitch.org/repo/deb/freeswitch-1.6/ jessie main" > /etc/apt/sources.list.d/freeswitch.list

# echo "deb http://ftp.uk.debian.org/debian jessie-backports main" > /etc/apt/sources.list.d/backports.list

# curl -sL https://deb.nodesource.com/setup_8.x | bash -

# apt-get update
# apt-get install -y nodejs 
# apt-get install -y freeswitch-meta-all
# apt-get install freeswitch-mod-v8 freeswitch-mod-pocketsphinx
# apt-get install ffmpeg git

```

- uncomment mod-v8 and mod-pocketsphinx lines in modules.conf.xml (/etc/freeswitch/autoload_configs/modules.conf.xml) and restart FreeSWITCH

- add dialplan configuration in /etc/freeswitch/dialplan/default.xml:
```
<extension name="9876">
      <condition field="destination_number" expression="^9876$">
            <!-- <action application="answer"/>
            <action application="set" data="playback_terminators=none"/> 
            <action application="playback" data="ivr/ivr-enter_ext_pound.wav"/> -->
            <action application="javascript" data="ivr_sphinx.js"/>
      </condition>
    </extension>

     <extension name="8765">
      <condition field="destination_number" expression="^8765$">
            <!-- <action application="answer"/>
            <action application="set" data="playback_terminators=none"/> 
            <action application="playback" data="ivr/ivr-enter_ext_pound.wav"/> -->
            <action application="javascript" data="ivr_google.js"/>
      </condition>
    </extension>
```

- prepare extension for testing (e.g. change password in directory/default/1000.xml)

- change default password and rm OPUS from global_codec_prefs and outbound_codec_prefs in vars.xml

- restart freeswitch

- put ivr_google.js,  ivr_sphinx.js and SpeechTools.jm into /usr/share/freeswitch/scripts
- 
- put test.gram into /usr/share/freeswitch/grammar/

- put these lines in the end of  /usr/share/freeswitch/grammar/default.dic: 
petahtikva  P EH T AH HH T IH K V AH
roshhaayin R OW SH HH AH AH IH N
kiryatshmona K IH R IH Y AH T SH M AH N AH

- put app.js and package.json into /opt/googleapi

- install dependencies: 
```
# npm i
# npm -g i forever
```

- put vr-daemon into /etc/init.d and do :
```
chmod +x /etc/init.d/vr-daemon
/etc/init.d/vr-daemon start
```


Use extension 1000 to dial 9876 (Sphinx IVR) or 8765 (Google Speech API IVR). You can try four cities — and you should hear numbers accordingly:

Kiryat-Shmona - 1
Rosh Haayin - 2
Petah-Tikva - 3
Jerusalem - 0





