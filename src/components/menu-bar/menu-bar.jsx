import bindAll from 'lodash.bindall';

import classNames from 'classnames';
import React from 'react';

import Box from '../box/box.jsx';

import LanguageSelector from '../../containers/language-selector.jsx';

import PortSelector from '../../containers/port-selector.jsx';

import styles from './menu-bar.css';
import scratchLogo from './scratch-logo.svg';

const emptyProjectJson = require("../../lib/empty-project.json");

class MenuBar extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ["newProject", "selectLoadFile", "selectSaveFile", "loadProject", "saveProject"]);
    }
    selectLoadFile(){
        this.loadProjDialog.click();
    }
    selectSaveFile(){
        this.saveProjDialog.click();
    }
    newProject(){
        this.props.vm.loadProject(JSON.stringify(emptyProjectJson));
    }
    loadFile(e, onLoad){
        const reader = new FileReader();
        reader.onload = () => onLoad(reader.result);
        reader.readAsText(e.target.files[0]);
    }
    loadProject(e){
        this.props.vm.weeecode.loadSb2(e.target.files[0].path)
    }
    saveProject(e){
        console.log("saved", e.target.files[0].path)
    }
    render () {
        return (
            <Box className={styles.menuBar}>
                <PortSelector className={styles.menuItem} newProject={this.newProject} selectLoadFile={this.selectLoadFile} selectSaveFile={this.selectSaveFile} {...this.props} />
                <input type="file" style={{display:'none'}} ref={ref => this.loadProjDialog = ref} onChange={this.loadProject} accept=".sb2,.kb"/>
                <input type="file" style={{display:'none'}} ref={ref => this.saveProjDialog = ref} onChange={this.saveProject} accept=".kb"/>
            </Box>
        );
    }
}

export default MenuBar;
