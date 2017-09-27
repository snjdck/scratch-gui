const React = require('react');
const ReactDOM = require('react-dom');
const bindAll = require('lodash.bindall');
const arduinoIcon = require('./arduino.png');

import {Button,FormControl,MenuItem,ButtonGroup,DropdownButton,ButtonToolbar } from 'react-bootstrap';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/eclipse';
import {Icon} from 'react-fa';
import process from "process";
import Blockly from "scratch-blocks";
const fs = eval('require("fs")');

class ArduinoPanelComponent extends React.Component {
    constructor (props) {
        super(props);

        bindAll(this, ['updateCodeView','consoleSend', 'consoleEnter', "consoleClear", "restoreFirmware", "uploadProject","openArduino"]);
        this.state = {
            code: "",
            logs:[]
        };
        this.logs = [];
    }
    get wc(){
        return this.props.vm.weeecode;
    }
    /*
    translateCode(){
        this.setState({code:Blockly.Arduino.workspaceToCode()});
    }*/
    restoreFirmwareImpl(firmware){
        fs.readFile(firmware, 'utf8', (err, data) => {
            if(err){
                console.log(err)
                return
            }
            this.uploadCode(data);
        });
    }
    restoreFirmware(name){
        this.restoreFirmwareImpl(`firmwares/${name}/${name}.ino`);
    }
    uploadProject(){
        this.uploadCode(this.state.code);
    }
    uploadCode(code){
        this.wc.uploadProject(code, msg => this.appendLog(msg, "white"), code => this.appendLog("upload finished!~", "#00FF00"));
    }
    openArduino(){
        this.wc.openIno(this.state.code);
    }
    consoleClear(){
        if(this.logs.length <= 0){
            return;
        }
        this.logs = [];
        this.setState({logs:this.logs});
    }
    consoleSend(){
        var dom = ReactDOM.findDOMNode(this.refs.consoleInput);
        var txt = dom.value;
        dom.value = "";
        this.appendLog(txt);
        this.wc.sendCmd(txt);
    }
    consoleEnter(e){
        e.preventDefault();
        this.consoleSend();
    }
    componentDidMount(){
        this.wc.arduino.appendLog = this.appendLog.bind(this);
        this.timerID = setInterval(this.updateCodeView, 1000);
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    updateCodeView(){
        if(!this.props.visible){
            return;
        }
        //var code = Blockly.Arduino.workspaceToCode(Blockly.getMainWorkspace());
        var code = "";
        for(var item of Blockly.getMainWorkspace().getTopBlocks(true)){
            if(item.type != "weeebot_program"){
                continue;
            }
            var b = [];
            var arduino = Blockly.Arduino;
            arduino.init(Blockly.getMainWorkspace())
            var d=item;
			var e=arduino.blockToCode(d);
			Array.isArray(e)&&(e=e[0]);
			if(e){
				if(d.outputConnection && arduino.scrubNakedValue){
					e=arduino.scrubNakedValue(e)
				}
				b.push(e)
			}
			b=b.join("\n");
			b=arduino.finish(b);
			b=b.replace(/^\s+\n/,"");
			b=b.replace(/\n\s+$/,"\n");
			code = b.replace(/[ \t]+\n/g,"\n");
        }
        if(code != this.state.code){
            this.setState({code:code});
        }
    }
    appendLog(info, color="white"){
        this.logs.push({msg:info, color:color});
        this.setState({logs:this.logs});
    }
    componentDidUpdate(){
        var logs = this.refs.arduinolog;
        var lastLog = logs.childNodes[logs.childNodes.length-1];
        if(lastLog) {
            lastLog.scrollIntoView();
        }
    }
    render() {
        var visible = this.props.visible ? 'block' : 'none';
        const msgs = [];
        for(var i in this.state.logs){
            var t  = this.state.logs[i];
            msgs.push(<p style={{color:t.color}} key={i}>{t.msg}</p>);
        };
        /*
        var firmwareItems = this.state.firmwares.map(f => (
            <MenuItem eventKey={f} key={f.name}>{f.name}</MenuItem>
        ));
        */
        return (<div
                style={{
                    position: 'absolute',
                    zIndex: 3,
                    top: 35,
                    right: 0,
                    bottom: 0,
                    width: 490,
                    paddingLeft: 4,
                    paddingRight: 4,
                    display: visible,
                    backgroundColor: '#0097a7'
                }}
            >
            <table width="100%" height="100%"><tr><td>
            <div className="group" id="code-buttons">
                <DropdownButton title={Blockly.Msg.WC_RESTORE_FIRMWARE} id="restore_firmware" onSelect={this.restoreFirmware}>
                  <MenuItem eventKey="weeebot_factory_firmware">{Blockly.Msg.WC_RESTORE_FACTORY_FIRMWARE}</MenuItem>
                  <MenuItem eventKey="weeebot_firmware">{Blockly.Msg.WC_RESTORE_ONLINE_FIRMWARE}</MenuItem>
                </DropdownButton>
                <Button onClick={this.uploadProject}>{<Icon name="arrow-up"/>}{Blockly.Msg.UPLOAD}</Button>
                <Button style={{"float":"right"}} onClick={this.openArduino}>{<img style={{height: 20}} src={arduinoIcon}/>}{Blockly.Msg.WC_OPEN_ARDUINO}</Button>
            </div>
            </td></tr><tr><td height="100%">
            <AceEditor
                style={{width:"100%",height:"100%"}}
                mode="c_cpp"
                theme="eclipse"
                name="arduino-code"
                value={this.state.code}
                readOnly
                editorProps={{$blockScrolling: true}}
            />
            </td></tr><tr><td>
            <div id="console-log"
                style={{
                    marginTop: 4,
                    marginBottom: 4,
                    height:256,
                    width:482,
                    overflow: 'auto',
                    backgroundColor: '#000000',
                    color: '#008000',
                    fontSize:18
                }}
                ref="arduinolog"
            >{msgs}
            </div>
            <form className="form-inline" id="console-input"
                  onSubmit={this.consoleEnter}
            >
                <FormControl
                    type="text"
                    style={{
                        width: '70%',
                        backgroundColor: '#FFFFFF',
                        border: '0px',
                        color: '#000000'
                    }}
                    ref="consoleInput"
                />
                <Button style={{marginLeft:3}} onClick={this.consoleSend}>{Blockly.Msg.SEND}</Button>
                <Button style={{marginLeft:2}} onClick={this.consoleClear}>{Blockly.Msg.CLEAR}</Button>
            </form>
            </td></tr></table>
            </div>
        );
    }
};


module.exports = ArduinoPanelComponent;


