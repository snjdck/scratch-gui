

const fs = require('fs');
const {exec, execFile} = require('child_process');
const ncp = require('ncp').ncp;

function getExecPath(background=false){
    if(process.platform=="darwin"){
        let path = "../Arduino.app/Contents/MacOS/Arduino";
        return background ? `"${path}"` : path;
    }
    if(background){
    	return '"../Arduino/arduino_debug.exe"';
    }
    return "../Arduino/arduino.exe";
}

const decoder = new TextDecoder("gb2312");
function listenTextEvent(target, callback)
{
    var textBuffer = Buffer.alloc(0);
    var text = "";
    target.on("data", data => {
        textBuffer = Buffer.concat([textBuffer, data]);
        var newText = decoder.decode(textBuffer);
        callback(newText.slice(text.length));
        text = newText;
    });
}
/*
function buildUploadCommand(inofile,cmdType,arduinoboard,arduinopath,uploadPort){
	var builtpath = process.cwd()+"/workspace/build/";
	var result = [
	"--upload",
	`--board ${arduinoboard}`,
	`--port ${uploadPort}`,
	`--pref build.path=${builtpath}`,
	"--verbose",
	inofile
	];

    if(!cmdType){
        cmdType = "upload";
    }
    var exec = "arduino.exe";
    if(process.platform=="darwin"){
        exec = "Arduino.app/Contents/MacOS/Arduino";
    }
    var builtpath = process.cwd()+"/workspace/build/";
    //var verbose = config.debug==true?"-v":"";

    var verbose = "-v"; // always use verbose to get compile feedback
    var cmd = exec+" "+verbose+" --"+cmdType+" --pref build.path="+builtpath+" --board "+arduinoboard;
    if(uploadPort)
        cmd+= " --port "+uploadPort;
    cmd+=" "+inofile;
    return cmd;
}
*/
class ArduinoManager {
    constructor(vm){
        this.vm = vm;
        this.autotranslate = false;
        this.sendCmdEvent = new chrome.Event();
        this.baudrate = 115200;
        this.editor = null;
        this.arduinoboard = "arduino:avr:uno";
        this.boardlist = [{"name":"Arduino UNO","type":"uno"},
            {"name":"Arduino NANO","type":"nano:cpu=atmega328"}];
        this.selectedBoard ="Arduino UNO";
        this.lastSerialPort = "COM3";
        this.autotranslate = false;
        this.digitalQuery = {};
        this.analogQuery = {};
        this.appendLog = null;
        this.notify = null;
        this.pluginPareLine = null;
    }


    sb2cpp(){
        try {
            var code = "";
            code += Blockly.Arduino.workspaceToCode(workspace);
            if(this.editor){
                this.editor.setValue(code,-1);
            }

        } catch(e) {
            this.appendLog(e.message,"#E77471");
        }
    }
/*
    copyLibrary(src,callback){
        var dst = this.arduinopath+"/libraries";
        if(process.platform=="darwin"){
            dst = this.arduinopath+"/Arduino.app/Contents/Java/libraries";
        }
        ncp(src, dst, function (err) {
            if (err) {
                if(callback) callback(err);
                throw err;
            }
            if(callback) callback(0);
        });
    }
*/
    openArduinoIde(code,path){
        execFile(getExecPath(), [path], {
            encoding: 'ascii'
        });
    }

    parseLine(msg){
        /*
        if (this.pluginPareLine) {
            return this.pluginPareLine(msg);
        }*/
        var list = msg.trim().split(" ");
        var report = list.pop();
        var slot = list.join(" ");
        if(report == "OK"){
            report = null;
        }
        this.vm.postIOData('serial', {slot, report});
    }
/*
    queryData(data){
        if(data.type == 'D'){
            if(this.digitalQuery[data.pin]){
                return this.digitalQuery[data.pin];
            }else{
                var cmd = "M13 "+data.pin+" 1";
                this.sendCmd(cmd);
                return 0;
            }
        }else if(data.type == 'A'){
            if(this.analogQuery[data.pin]){
                return this.analogQuery[data.pin];
            }else{
                var cmd = "M15 "+data.pin+" 1";
                this.sendCmd(cmd);
                return 0;
            }
        }

    }
*/
    stopAll(){
        this.digitalQuery = {};
        this.analogQuery = {};
        var msg = "M999\n"; // reset arduino board
        this.sendCmdEvent.dispatch(msg);
    }

    sendCmd(msg){
        this.sendCmdEvent.dispatch(msg);
    }

    
/*
    compileCode(path,callback,errCallback){
        var errorcode = null;
        var arduinopath = this.arduinopath;

        var cmd = buildUploadCommand(path,"verify",this.arduinoboard,this.arduinopath);

        var spawn = cp.exec(cmd,{
            encoding: 'utf8',
            cwd: arduinopath
        });
        this.appendLog(">>"+cmd,'blue');

        function setHexpath(hexpath) {
            this.hexpath = hexpath;
        }

        spawn.stdout.on('data', function (data) {
            if(data.indexOf("error")>-1){
                errCallback(data,'orange');
                errorcode = data;
            }else if(data.indexOf("cpp.hex")>-1){
                //appendLog(data,'cyan');
                var hexpath = data.toString().trim().split(" ").pop().replace(/\\/g,"/");
                setHexpath(hexpath);
            }else{
                this.appendLog(data,'grey');
            }
        });

        spawn.stdout.on('end', function (code) {
            appendLog("Compile Finished");
            if(callback && !errorcode){
                callback();
            }
        });
        spawn.stderr.on('data', function (data) {
            appendLog(data,'grey');
        });

    }
*/
    uploadProject(path,logCb,finishCb,uploadPort){
        if(this.arduinoboard.indexOf('arduino')>-1){
            uploadPort = this.lastSerialPort;
        }
        var cmd = [
        	getExecPath(true),
			"--upload",
			"--verbose-upload",
			`--board ${this.arduinoboard}`,
			`--port ${uploadPort}`,
			`"${path}"`
			].join(" ");
        var spawn = exec(cmd,{
			encoding: "buffer"
        });
        if(logCb){
            listenTextEvent(spawn.stdout, logCb);
            listenTextEvent(spawn.stderr, logCb);
        }
        spawn.on('close' , code => finishCb && finishCb(code));
    }
}

module.exports = ArduinoManager;
