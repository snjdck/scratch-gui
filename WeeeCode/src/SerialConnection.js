
/* Interprets an ArrayBuffer as UTF-8 encoded string data. */
const decoder = new TextDecoder();
const ab2str = buf => decoder.decode(buf);

/* Converts a string to UTF-8 encoding in a Uint8Array; returns the array buffer. */
var str2ab = function(str) {
    var encodedString = unescape(encodeURIComponent(str));
    var bytes = new Uint8Array(encodedString.length);
    for (var i = 0; i < encodedString.length; ++i) {
        bytes[i] = encodedString.charCodeAt(i);
    }
    return bytes.buffer;
};

class SerialConnection {
    constructor(){
        this.connectionId = -1;
        this.lineBuffer = "";
        this.boundOnReceive = this.onReceive.bind(this);
        this.boundOnReceiveError = this.onReceiveError.bind(this);
        this.onReadLine = new chrome.Event();
        this.onDisconnect = new chrome.Event();
        this.pluginRecv = null;
        this.msgQueue = [];
    }


    enumSerial(callback){
        if(typeof callback != "function"){
            return;
        }
        chrome.serial.getDevices(ports => {
            ports = ports.filter(port => /^USB/.test(port.displayName));
            if(process.platform == "darwin"){
                ports = ports.filter(port => /^\/dev\/tty\./.test(port.path));
            }
            callback(ports);
        });
    }

    onReceive(receiveInfo) {
        if (receiveInfo.connectionId !== this.connectionId) {
            return;
        }
        /*
        if(this.pluginRecv){
            return this.pluginRecv(receiveInfo.data);
        }*/
        //console.log("buf "+receiveInfo.data.byteLength+">>"+ab2str(receiveInfo.data));
        this.lineBuffer += ab2str(receiveInfo.data);
        var index;
        while ((index = this.lineBuffer.indexOf('\n')) >= 0) {
            var line = this.lineBuffer.substr(0, index + 1).trim().split("").filter(v => v.charCodeAt() > 0).join("");
            this.onReadLine.dispatch(line);
            this.lineBuffer = this.lineBuffer.substr(index + 1);
            console.log("serial recv:", line)
        }

    }

    onReceiveError(errorInfo) {
        if (errorInfo.connectionId === this.connectionId) {
            console.log("on receive error "+errorInfo.connectionId);
            this.onDisconnect.dispatch(errorInfo.connectionId);
        }
    }

    onConnect(callback,connectionInfo){
        if (!connectionInfo) {
            console.log("Connection failed.");
            if (callback) callback(-1);
            return;
        }
        this.connectionId = connectionInfo.connectionId;
        chrome.serial.onReceive.addListener(this.boundOnReceive);
        chrome.serial.onReceiveError.addListener(this.boundOnReceiveError);
        this.lineBuffer = "";
        this.msgQueue.length = 0;
        if (callback) callback(connectionInfo);
    }

    onClosed(callback,result){
        //console.log("serial disconnect "+result);
        this.connectionId = -1;
        this.onDisconnect.dispatch(this.connectionId);
        // remove listeners
        chrome.serial.onReceive.removeListener(this.boundOnReceive);
        chrome.serial.onReceiveError.removeListener(this.boundOnReceiveError);
        if (callback) callback();
    }

    connect(path, option, callback,onRcv) {
        this.onReadLine = new chrome.Event();
        this.onDisconnect = new chrome.Event();

        this.pluginRecv = onRcv;

        chrome.serial.connect(path, option, this.onConnect.bind(this, callback));
    }

    disconnect(callback){
        if(this.connectionId==-1) return;
        chrome.serial.disconnect(this.connectionId, this.onClosed.bind(this,callback));
    }

    send(msg){
        this.sendbuf(str2ab(msg));
        console.log("serial send:", msg);
    }

    sendbuf(buffer){
            if(this.connectionId < 0)
                return;
            let isSending = this.msgQueue.length > 0;
            this.msgQueue.push(buffer);
            if(!isSending){
                this.doSend();
            }
        }

        doSend(){
            if(this.msgQueue.length <= 0){
                return;
            }
            chrome.serial.send(this.connectionId, this.msgQueue[0], info => {
                this.msgQueue.shift();
                this.doSend();
            });
        }
}



module.exports = SerialConnection;
