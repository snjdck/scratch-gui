import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import VM from "scratch-vm";
import Blockly from "scratch-blocks";

const { Navbar,Nav,NavItem,ButtonGroup,Button,DropdownButton,FormControl,MenuItem  } = require('react-bootstrap');

const {Icon} = require('react-fa');

class PortSelector extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
        'handleTitle',
        'serialDevUpdate','refreshPort','selectPort','portConnected','portClosed',"portReadLine"
        ]);
        this.state = {
            portDev: [],
            boards:[{'name':'Arduino Uno','type':'arduino:avr:uno'}],
            connectedPort: null,
            selectedBoard:{'name':'Arduino Uno','type':'arduino:avr:uno'},
            projectName:""
        };
    }
    get vm(){
        return this.props.vm
    }
    handleTitle(e){
        var title = e.target.value;
        this.setState({projectName:title});
        this.props.vm.weeecode.projectName = title;
    }
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
    }
    newProject(){
        console.log("newProject")
    }
    openSetupModal(){
        console.log("openSetupModal")
    }
    render () {
        var portMenuItem;
        var portDropdownTxt;

        if(this.state.connectedPort!=null) {
            portDropdownTxt = this.state.connectedPort;
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
                    }} key={dev.path}>{dev.path}</MenuItem>
                ));
            portDropdownTxt = Blockly.Msg.WC_NOT_CONNECTED;
        }
        var weeecode = this.props.vm.weeecode;
        return (
        <Navbar
                style={{
                    position: 'absolute',
                    top: -13,
                    left: 0,
                    width: '100%',
                    backgroundColor: '#0099CC',
                    backgroundImage: 'url()',
                    height: '40px'
                }}
                fluid
            >
        <Nav>
                    <NavItem>
                        <ButtonGroup>
                            <DropdownButton title={Blockly.Msg.SCRATCH_PROJECT} bsStyle="success" id="projDropdown">
                                <MenuItem eventKey="1" onClick={this.newProject}>{Blockly.Msg.SCRATCH_PROJECT_NEW}</MenuItem>
                                <MenuItem eventKey="2" onClick={this.props.selectSaveFile} >{Blockly.Msg.SCRATCH_PROJECT_SAVE}</MenuItem>
                                <MenuItem eventKey="3" onClick={this.props.selectLoadFile} >{Blockly.Msg.SCRATCH_PROJECT_LOAD}</MenuItem>
                            </DropdownButton>
                        </ButtonGroup>
                    </NavItem>
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
            
            </Nav>
                <Nav pullRight>
                    <NavItem>
                        <ButtonGroup>
                            <DropdownButton title={portDropdownTxt} bsStyle="warning"
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
                        <Button bsStyle="warning"
                                onClick={this.props.toggleArduinoMode}
                        >Arduino</Button>
                    </NavItem>
                    <NavItem>
                        <Button bsStyle="warning"
                            onClick={this.openSetupModal}
                        >
                            <Icon name="gear"/>
                        </Button>
                    </NavItem>
                </Nav>
        </Navbar>
        );
    }
}

PortSelector.propTypes = {
    vm: PropTypes.instanceOf(VM)
};

module.exports = PortSelector;
