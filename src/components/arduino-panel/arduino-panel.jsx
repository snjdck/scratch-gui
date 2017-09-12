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

        bindAll(this, ['consoleSend', 'consoleEnter', "consoleClear", "translateCode", "restoreFirmware", "uploadProject","openArduino"]);
        this.state = {
            code: "",
            firmwares:[]
        };
    }
    wc(){
        return this.props.vm.weeecode;
    }
    translateCode(){
        this.setState({code:Blockly.Arduino.workspaceToCode()});
    }
    restoreFirmware(firmware){
        fs.readFile(firmware.path, 'utf8', (err, data) => {
            if(err){
                console.log(err)
                return
            }
            this.setState({code:data});
        });
    }
    uploadProject(){
        this.wc().uploadProject(this.state.code);
    }
    openArduino(){
        this.wc().openIno(this.state.code);
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
        fs.readdir("firmwares", (err, files) => {
            this.setState({firmwares:files.map(item => ({name:item, path:`firmwares/${item}/${item}.ino`}))});
        });
    }
    componentDidUpdate(){
        var logs = this.refs.arduinolog;
        var lastLog = logs.childNodes[logs.childNodes.length-1];
        if(lastLog) {
            lastLog.scrollIntoView();
        }
    }
    render() {
    //*
        const {
            code,
            consoleMsg,

            codeRef,
            consoleClear,
            ...componentProps
        } = this.props;
        //*/
        var visible = this.props.visible?'block':'none';
        const msgs = [];
        for (var i = 0; i < this.props.consoleMsg.length; i += 1) {
            var t = this.props.consoleMsg[i];
            msgs.push(<p style={{color:t.color}} key={i}>{t.msg}</p>);
        };
        var firmwareItems = this.state.firmwares.map(f => (
            <MenuItem eventKey={f} key={f.name}>{f.name}</MenuItem>
        ));
        return (<div
                style={{
                    position: 'absolute',
                    zIndex: 3,
                    top: 35,
                    right: 0,
                    bottom: 0,
                    width: 490,
                    paddingLeft:4,
                    paddingRight:4,
                    display: visible,
                    backgroundColor: '#0097a7'
                }}
            >
            <div className="group" id="code-buttons">
                <Button onClick={this.translateCode}>{Blockly.Msg.TRANSLATE}</Button>
                <ButtonGroup>
                    <DropdownButton title={Blockly.Msg.RESTORE}
                                    onSelect={this.restoreFirmware}
                                    id="portDropdown">{firmwareItems}
                    </DropdownButton>
                </ButtonGroup>
                <Button onClick={this.uploadProject}>{<Icon name="arrow-up"/>}{Blockly.Msg.UPLOAD}</Button>
                <Button style={{float:'right'}} onClick={this.openArduino}>{<img style={{height: 20}} src={arduinoIcon} />}{Blockly.Msg.OPENWITHARDUINO}</Button>
            </div>
            <AceEditor
                style={{width:"100%",height:436}}
                mode="c_cpp"
                theme="eclipse"
                name="arduino-code"
                value={this.state.code}
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


