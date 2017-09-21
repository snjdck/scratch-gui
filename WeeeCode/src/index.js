
"use strict";
var path = require('path');
var fs = require('fs');
var EventEmitter = require('events');
var SerialConnection = require('./SerialConnection');
var ArduinoManager = require('./ArduinoManager');
var Toolbox = require('./Toolbox');
var ResourceManager = require('./ResourceManager');

var ProjectManager = require('./ProjectManager');

class WeeeCode extends EventEmitter
{
	constructor(vm) {
		super();
		this.workpath = path.resolve(process.cwd(),'workspace');
		this.mediapath = path.resolve(process.cwd(),'media');
		this.defaultExamples = path.resolve(process.cwd(),'examples');
		this.arduinoPath = path.resolve(process.cwd(),'arduino'); // not the one where arduino ide locate


		this.serial = new SerialConnection();
		this.arduino = new ArduinoManager(vm);
		this.toolbox = new Toolbox();
		this.resourcemng = new ResourceManager();
		this.proj = new ProjectManager(vm, this.workpath);

		this.connectedPort = null;
		this.portList = [];
		this.resourcemng.startServer(this.workpath,this.mediapath);

		this.projectName = "";
	}

	connectPort(port,successCb,readlineCb,closeCb,onRecv) {
	    var _this = this;
	    if(port.type=='serial'){
	        var ser = this.serial;
	        ser.connect(port.path,{bitrate: 115200},function (ret) {
	            if(ret!=-1) {
	                ser.onReadLine.addListener(readlineCb);
	                ser.onDisconnect.addListener(function () {
	                    _this.connectedPort = null;

	                    closeCb();
	                });
	                _this.connectedPort = {"path": port.path, "type": "serial"};
	                _this.arduino.lastSerialPort = port.path;
	                _this.saveConfig();
	                successCb(port.path);
	            }
	        },onRecv);
	    }
	}

	disonnectPort(callback) {
	    if(this.connectedPort==null) return;
	    if(this.connectedPort.type=='serial'){
	        this.serial.disconnect(callback);
	    }
	}

	sendCmd(data) {
	    if(this.connectedPort && this.connectedPort.type=='serial'){
	        if(data instanceof Uint8Array){
	            this.serial.sendbuf(data.buffer);
	        }else{
	            this.serial.send(data+'\r\n');
	        }
	    }
	}

	enumPort(callback) {
	    var kb = this;
	    kb.portList = [];
	    this.serial.enumSerial(function (devices) {
	        devices.forEach(function (dev) {
	            var port = {"path":dev.path,"type":'serial'};
	            kb.portList.push(port);
	        });
	        if(callback) callback(kb.portList);
	    });
	}



	loadDefaultProj() {
	    var projfile = path.resolve(this.defaultExamples,"test.sb2");
	    this.proj.loadsb2(projfile);
	}

	loadFirmware(inopath) {
	    if(!inopath) {
	        var inopath = path.resolve(this.arduinoPath, "/kb_firmware", "kb_firmware.ino")
	    }
	    return this.arduino.loadFactoryFirmware(inopath);
	}

	openIno(code) {
	    var workspaceFolder = path.resolve(this.workpath,"/project");
	    var workspaceIno = path.resolve(this.workpath,"/project","project.ino");
	    if (!fs.existsSync(workspaceFolder)){
	        fs.mkdirSync(workspaceFolder);
	    }
	    this.arduino.openArduinoIde(code,workspaceIno);
	}

	uploadProject(code,logCb,finishCb) {
	    var workspaceFolder = path.resolve(this.workpath,"/project");
	    var workspaceIno = path.resolve(this.workpath,"/project","project.ino");
	    if(this.serial.connectionId != -1){
	        this.serial.disconnect();
	    }
	    if (!fs.existsSync(workspaceFolder)){
	        fs.mkdirSync(workspaceFolder);
	    }
	    this.arduino.uploadProject(code,workspaceIno,logCb,finishCb);
	}

	loadSb2(filepath) {
	    return this.proj.loadsb2(filepath);
	}

	copyArduinoLibrary(srcpath) {
	    if(!srcpath){
	        srcpath = path.resolve(this.arduinoPath,'lib/')
	    }
	    this.arduino.copyLibrary(srcpath);
	}


	saveConfig() {
	    
	}

	reloadApp() {
	    document.location.reload(true); // reload all
	}

	loadWC(filePath) {
	    return this.proj.loadwb(filePath);
	}

	saveWC(filePath) {
	    this.proj.savewb(filePath);
	}

	setPluginParseLine(func) {
	    this.arduino.pluginPareLine = func;
	}

	selectBoard(board) {
	    this.arduino.arduinoboard = board.type;
	    this.saveConfig();
	}

	copyResourceToWorkspace(resourceMd5) {
	    this.resourcemng.copyToWorkspace(resourceMd5,this.mediapath,this.workpath);
	}
}

module.exports = WeeeCode;
