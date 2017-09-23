
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
		this.vm = vm;
		this.workpath = path.resolve(process.cwd(),'workspace');
		this.mediapath = path.resolve(process.cwd(),'media');
		//this.defaultExamples = path.resolve(process.cwd(),'examples');
		this.arduinoPath = path.resolve(process.cwd(),'arduino'); // not the one where arduino ide locate


		this.serial = new SerialConnection();
		this.arduino = new ArduinoManager(vm);
		this.toolbox = new Toolbox();
		this.resourcemng = new ResourceManager();

		this.connectedPort = null;
		this.portList = [];
		this.resourcemng.startServer(this.workpath,this.mediapath);

		if(nw.App.argv.length > 0){
			this.loadWC(nw.App.argv[0]);
		}
		nw.App.on("open", args => {
			if(args.charAt(args.length - 1) != '"'){
				return;
			}
			var index = args.lastIndexOf('"', args.length - 2);
			this.loadWC(args.slice(index+1, -1));
		});
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
	    this.portList = [];
	    this.serial.enumSerial(devices => {
	        devices.forEach(dev => {
	            var port = {"path":dev.path,"type":'serial'};
	            this.portList.push(port);
	        });
	        if(callback){
	        	callback(this.portList);
	        }
	    });
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

	updateWindowTitle(){
		if(this.projectPath){
			document.title = `${this.projectPath} - WeeeCode`;
		}else{
			document.title = "WeeeCode";
		}
	}

	loadWC(filePath) {
		var fileData = fs.readFileSync(filePath, 'utf8');
	    this.vm.loadProject(fileData);
	    this.projectPath = filePath;
	    this.updateWindowTitle();
	}

	newProject(){
		var fileData = fs.readFileSync("untitled.wc", "utf8");
		this.vm.loadProject(fileData);
		this.projectPath = null;
	    this.updateWindowTitle();
	}

	save(){
		var fileData = this.vm.saveProjectSb3();
	    fs.writeFileSync(this.projectPath, fileData);
	}

	saveAs(filePath){
		this.projectPath = filePath;
	    this.updateWindowTitle();
	    this.save();
	}

	setPluginParseLine(func) {
	    this.arduino.pluginPareLine = func;
	}

	needSave(){
		var path = this.projectPath || "untitled.wc";
		return fs.readFileSync(path, "utf8") != this.vm.saveProjectSb3();
	}
}

module.exports = WeeeCode;
