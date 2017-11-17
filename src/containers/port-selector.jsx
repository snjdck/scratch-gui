import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import Blockly from "scratch-blocks";

const { Navbar,Nav,NavItem,ButtonGroup,Button,DropdownButton,FormControl,MenuItem,SplitButton  } = require('react-bootstrap');

const {Icon} = require('react-fa');
const langDict = {
    "en": "English",
    "zh-cn": "简体中文"
};

class PortSelector extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
        'changeLanguage',
        'serialDevUpdate','refreshPort','selectPort','portConnected','portClosed',"portReadLine"
        ]);
        this.state = {
            portDev: [],
            boards:[{'name':'Arduino Uno','type':'arduino:avr:uno'}],
            connectedPort: null,
            selectedBoard:{'name':'Arduino Uno','type':'arduino:avr:uno'}
        };
    }
    get vm(){
        return this.props.vm;
    }
    changeLanguage(language){
        localStorage.language = language;
        this.props.vm.weeecode.reloadApp();
    }
    /*
    handleTitle(e){
        var title = e.target.value;
        this.setState({projectName:title});
        this.props.vm.weeecode.projectName = title;
    }*/
    serialDevUpdate (data) {
        this.setState({portDev: data});
    }
    refreshPort(){
	    this.props.vm.weeecode.enumPort(this.serialDevUpdate);
    }
    portConnected(port){
        this.setState({connectedPort:port});
    }
    portClosed(){
        this.setState({connectedPort:null});
    }
    portReadLine(line){
        this.vm.weeecode.arduino.parseLine(line);
    }
    selectPort(port){
        if(port.type=='disconnect'){
            this.props.vm.weeecode.disonnectPort();
        }else{
            //var onRecv = this.props.vm.weeebot.onRecv;
            this.props.vm.weeecode.connectPort(port,this.portConnected,this.portReadLine,this.portClosed, this.portReadLine);
        }
    }

    componentDidMount () {
        this.refreshPort();
    	this.props.vm.weeecode.on("reconnect_serial", port => {
            this.selectPort(port);
        });
    }
    render () {
        var portMenuItem;
        var portDropdownTxt;

        if(this.state.connectedPort!=null) {
            portDropdownTxt = this.state.connectedPort.replace("/dev/tty.", "");
            portMenuItem =
                <MenuItem eventKey={{
                    'path': this.state.connectedPort,
                    'type': 'disconnect'
                }} key={this.state.connectedPort}>{Blockly.Msg.WC_DISCONNECT}</MenuItem>;

        }else{
            portMenuItem =
                    this.state.portDev.map(dev => (
                    <MenuItem eventKey={{
                        'path': dev.path,
                        'type': dev.type
                    }} key={dev.path}>{dev.path.replace("/dev/tty.", "")}</MenuItem>
                ));
            portDropdownTxt = Blockly.Msg.WC_NOT_CONNECTED;
        }
        var langItems = [];
        for(var key in langDict){
            langItems.push(
                <MenuItem key={key} disabled={localStorage.language==key} eventKey={key} onSelect={this.changeLanguage}>{langDict[key]}</MenuItem>
            );
        }

        var weeecode = this.props.vm.weeecode;
        return (
        <Navbar
                style={{
                    position: 'absolute',
                    top: -13,
                    left: 0,
                    width: '100%',
                    backgroundColor: '#0e2442',
                    backgroundImage: 'url()',
                    height: '40px'
                }}
                fluid
            >
        <Nav>
                <NavItem>
                    <ButtonGroup>
                        <DropdownButton title={Blockly.Msg.SCRATCH_PROJECT} bsStyle="info" id="projDropdown">
                            <MenuItem onClick={this.props.newProject}>{Blockly.Msg.SCRATCH_PROJECT_NEW}</MenuItem>
                            <MenuItem onClick={this.props.selectLoadFile}>{Blockly.Msg.SCRATCH_PROJECT_LOAD}</MenuItem>
                            <MenuItem onClick={this.props.selectSaveFile}>{Blockly.Msg.SCRATCH_PROJECT_SAVE}</MenuItem>
                            <MenuItem onClick={this.props.selectSaveFileAs}>{Blockly.Msg.SCRATCH_PROJECT_SAVE_AS}</MenuItem>
                        </DropdownButton>
                    </ButtonGroup>
                </NavItem>
            </Nav>
                <Nav pullRight>
                    <NavItem>
                        <ButtonGroup>
                            <DropdownButton title={portDropdownTxt} bsStyle="info"
                                            onClick={this.refreshPort}
                                            onSelect={this.selectPort}
                                            id="portDropdown"
                                            style={{width: '150px'}}>{
                                portMenuItem
                            }
                            </DropdownButton>
                        </ButtonGroup>
                    </NavItem>
                    <NavItem>
                        <Button bsStyle="info"
                        		active ={this.props.isArduinoMode}
                                onClick={this.props.toggleArduinoMode}
                        >Arduino</Button>
                    </NavItem>
                    <NavItem>
                        <ButtonGroup>
                            <SplitButton title={langDict[localStorage.language]} bsStyle="info" id="language">
                                {langItems}
                            </SplitButton>
                        </ButtonGroup>
                    </NavItem>
                </Nav>
        </Navbar>
        );
    }
}

module.exports = PortSelector;
/*
<NavItem>
                <FormControl
                    type="text"
                    placeholder={Blockly.Msg.SCRATCH_PROJECT_TITLE}
                    style={{
                        width: '200px',
                        backgroundColor: '#0b6684',
                        border: '0px',
                        color: '#FFFFFF'
                    }}
                    value={weeecode.projectName}
                    onChange={this.handleTitle}
                />
            </NavItem>
*/
