const React = require('react');
const ReactDOM = require('react-dom');
const bindAll = require('lodash.bindall');
const arduinoIcon = require('./arduino.png');

import {Button,FormControl,MenuItem,ButtonGroup,DropdownButton } from 'react-bootstrap';
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

        bindAll(this, ['updateCodeView','consoleSend', 'consoleEnter', "consoleClear", "restoreFirmware", "restoreFactoryFirmware", "uploadProject","openArduino"]);
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
    restoreFirmware(){
        this.restoreFirmwareImpl("firmwares/ebot_firmware/ebot_firmware.ino");
    }
    restoreFactoryFirmware(){
        this.restoreFirmwareImpl("firmwares/ebot_factory_firmware/ebot_factory_firmware.ino");
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
        console.log("consoleClear:");
        console.log(this.arduinolog);
    }
    consoleSend(){
        var txt = ReactDOM.findDOMNode(this.refs.consoleInput).value;
        this.props.consoleSend(txt);
    }
    consoleEnter(e){
        e.preventDefault();
        this.consoleSend();
    }
    componentDidMount(){
        this.wc.arduino.appendLog = this.appendLog.bind(this);
        this.timerID = setInterval(this.updateCodeView, 1000);
        //this.wc.on("stage_stop_drag", this.onStageStopDrag);
        /*
        fs.readdir("firmwares", (err, files) => {
            this.setState({firmwares:files.map(item => ({name:item, path:`firmwares/${item}/${item}.ino`}))});
        });
        */
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
    appendLog(info, color){
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
            <div className="group" id="code-buttons">
                <Button onClick={this.restoreFactoryFirmware}>{Blockly.Msg.WC_RESTORE_FACTORY_FIRMWARE}</Button>
                <Button onClick={this.restoreFirmware}>{Blockly.Msg.WC_RESTORE_FIRMWARE}</Button>
                <Button onClick={this.uploadProject}>{<Icon name="arrow-up"/>}{Blockly.Msg.UPLOAD}</Button>
                <Button style={{float:'right'}} onClick={this.openArduino}>{<img style={{height: 20}} src={arduinoIcon} />}{Blockly.Msg.OPENWITHARDUINO}</Button>
            </div>
            <AceEditor
                style={{width:"100%",height:436}}
                mode="c_cpp"
                theme="eclipse"
                name="arduino-code"
                value={this.state.code}
                readOnly
                editorProps={{$blockScrolling: true}}
            />
            <div id="console-log"
                style={{
                    marginTop: 4,
                    marginBottom: 4,
                    height:256,
                    overflowY: 'scroll',
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
                <Button style={{marginLeft:2}} onClick={this.consoleClear}>Clear</Button>
            </form>

            </div>
        );
    }
};


module.exports = ArduinoPanelComponent;


