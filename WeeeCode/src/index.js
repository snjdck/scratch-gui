
"use strict";
var path = require('path');
var fs = require('fs');
var EventEmitter = require('events');
const {execFile} = require('child_process');
var SerialConnection = require('./SerialConnection');
var ArduinoManager = require('./ArduinoManager');
var Toolbox = require('./Toolbox');

class WeeeCode extends EventEmitter
{
	constructor(vm) {
		super();
		this.vm = vm;
		this.inoPath = nw.App.dataPath + "/workspace/project/project.ino";
		if(!fs.existsSync(nw.App.dataPath + "/workspace")){
			fs.mkdirSync(nw.App.dataPath + "/workspace");
		}
		if(!fs.existsSync(nw.App.dataPath + "/workspace/project")){
			fs.mkdirSync(nw.App.dataPath + "/workspace/project");
		}


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
		this.updateWindowTitle();
		createMacMenu();
	}

	get plugin(){
		return this._plugin;
	}

	set plugin(value){
		if(!value || this.pluginMap.get(value.name) !== value){
			throw new Error("plugin not support!");
		}
		if(this._plugin === value){
			return;
		}
		this._plugin = value;
		value.setupOfflineCode();
		let runtime = this.vm.runtime;
		const packagePrimitives = value.getPrimitives();
        for (const op in packagePrimitives) {
            if (packagePrimitives.hasOwnProperty(op)) {
                runtime._primitives[op] = packagePrimitives[op].bind(value);
            }
        }
        const packageHats = value.getHats();
        for (const hatName in packageHats) {
            if (packageHats.hasOwnProperty(hatName)) {
                runtime._hats[hatName] = packageHats[hatName];
            }
        }
        this.emit("pluginChanged");
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
		fs.writeFileSync(this.inoPath, code);
	    this.arduino.openArduinoIde(code, this.inoPath);
	}

	uploadProject(code,logCb,finishCb) {
		fs.writeFileSync(this.inoPath, code);
	    var needReconnect = false;
	    if(this.serial.connectionId != -1){
	        this.serial.disconnect();
	        needReconnect = true;
	        var port = this.connectedPort;
	    }
	    this.arduino.uploadProject(this.inoPath, logCb, err => {
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
		let version = nw.App.manifest.version;
		let title = `WeeeCode V${version}`;
		if(this.projectPath){
			title = `${this.projectPath} - ${title}`;
		}
		document.title = title;
	}

	loadWC(filePath) {
		this.emit("reset_project");
		var fileData = fs.readFileSync(filePath, 'utf8');
	    this.vm.loadProject(fileData);
	    this.projectPath = filePath;
	    this.updateWindowTitle();
	}

	newProject(){
		this.emit("reset_project");
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

function createMacMenu(){
	if(process.platform != "darwin"){
		return;
	}
	let isCN = localStorage.language && localStorage.language == "zh-cn";
	let submenu = new nw.Menu({type:"menubar"});
	submenu.append(new nw.MenuItem({
		label: isCN ? "安装主板驱动" : "Install Board Driver",
		click(){
			execFile("open", ["../drivers/CH34x_Install_V1.3.pkg"]);
		}
	}));
	let mb = new nw.Menu({type:"menubar"});
	mb.createMacBuiltin("WeeeCode", {hideEdit:true,hideWindow:true});
	mb.append(new nw.MenuItem({
		label: isCN ? "驱动" : "Driver",
		submenu
	}));
	nw.Window.get().menu = mb;
}

module.exports = WeeeCode;
