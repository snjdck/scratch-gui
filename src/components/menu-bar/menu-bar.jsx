import bindAll from 'lodash.bindall';

import classNames from 'classnames';
import React from 'react';

import Box from '../box/box.jsx';
import Blockly from 'scratch-blocks';

import LanguageSelector from '../../containers/language-selector.jsx';

import PortSelector from '../../containers/port-selector.jsx';

import styles from './menu-bar.css';
import scratchLogo from './scratch-logo.svg';

//const emptyProjectJson = require("../../lib/empty-project.json");

class MenuBar extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ["newProject", "selectLoadFile", "selectSaveFile", "loadProject", "saveProject", "selectSaveFileAs"]);
    }
    componentDidMount(){
        this.saveProjDialog.nwsaveas = "untitled";
        const win = nw.Window.get();
        win.on("close", () => {
            if(!this.wc.needSave() || confirm(Blockly.Msg.WC_SURE_TO_QUIT)){
                win.close(true);
            }
        });
    }
    get wc(){
        return this.props.vm.weeecode;
    }
    selectLoadFile(){
        this.loadProjDialog.click();
    }
    selectSaveFile(){
        if(this.wc.projectPath){
            this.wc.save();
        }else{
            this.saveProjDialog.click();
        }
    }
    selectSaveFileAs(){
        this.saveProjDialog.click();
    }
    newProject(){
        if(!this.wc.needSave() || confirm(Blockly.Msg.WC_SURE_TO_CREATE_NEW_PROJECT)){
            this.wc.newProject();
        }
    }
    /*
    loadFile(e, onLoad){
        const reader = new FileReader();
        reader.onload = () => onLoad(reader.result);
        reader.readAsText(e.target.files[0]);
    }*/
    loadProject(e){
        var filePath = e.target.files[0].path;
        this.props.vm.weeecode.loadWC(filePath)
    }
    saveProject(e){
        this.wc.saveAs(e.target.files[0].path);
    }
    render () {
        return (
            <Box className={styles.menuBar}>
                <PortSelector
                    className={styles.menuItem}
                    newProject={this.newProject}
                    selectLoadFile={this.selectLoadFile}
                    selectSaveFile={this.selectSaveFile}
                    selectSaveFileAs={this.selectSaveFileAs}
                    {...this.props} />
                <input type="file" style={{display:'none'}} ref={ref => this.loadProjDialog = ref} onChange={this.loadProject} accept=".wc"/>
                <input type="file" style={{display:'none'}} ref={ref => this.saveProjDialog = ref} onChange={this.saveProject} accept=".wc"/>
            </Box>
        );
    }
}

export default MenuBar;
