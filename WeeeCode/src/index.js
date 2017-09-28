
"use strict";
var path = require('path');
var fs = require('fs');
var EventEmitter = require('events');
var SerialConnection = require('./SerialConnection');
var ArduinoManager = require('./ArduinoManager');
var Toolbox = require('./Toolbox');

class WeeeCode extends EventEmitter
{
	constructor(vm) {
		super();
		this.vm = vm;
		this.inoPath = "workspace/project/project.ino";


		this.serial = new SerialConnection();
		this.arduino = new ArduinoManager(vm);
		this.toolbox = new Toolbox();
		//this.resourcemng = new ResourceManager();

		this.connectedPort = null;
		this.portList = [];
		//this.resourcemng.startServer(this.workpath,this.mediapath);

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
	    this.arduino.openArduinoIde(code, this.inoPath);
	}

	uploadProject(code,logCb,finishCb) {
	    var needReconnect = false;
	    if(this.serial.connectionId != -1){
	        this.serial.disconnect();
	        needReconnect = true;
	        var port = this.connectedPort;
	    }
	    this.arduino.uploadProject(code, this.inoPath, logCb, err => {
	    	if(finishCb){
	    		finishCb(err)
	    	}
	    	if(needReconnect){
	    		this.emit("reconnect_serial", port);
	    	}
	    });
	}

	saveConfig(){}

	reloadApp() {
		this.serial.disconnect();
		nw.App.removeAllListeners("open");
		var win = nw.Window.get();
		win.removeAllListeners("close");
		win.reload();
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
