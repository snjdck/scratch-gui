import bindAll from 'lodash.bindall';

import classNames from 'classnames';
import React from 'react';

import Box from '../box/box.jsx';

import LanguageSelector from '../../containers/language-selector.jsx';

import PortSelector from '../../containers/port-selector.jsx';

import styles from './menu-bar.css';
import scratchLogo from './scratch-logo.svg';

class MenuBar extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ["selectLoadFile", "selectSaveFile", "loadProject", "saveProject"]);
    }
    selectLoadFile(){
        this.loadProjDialog.click();
    }
    selectSaveFile(){
        this.saveProjDialog.click();
    }
    loadFile(e, onLoad){
        const reader = new FileReader();
        reader.onload = () => onLoad(reader.result);
        reader.readAsText(e.target.files[0]);
    }
    loadProject(e){
        console.log("loaded")
        this.loadFile(e, console.log)
    }
    saveProject(e){
        console.log("saved")
        this.loadFile(e, console.log)
    }
    render () {
        return (
            <Box style={{height:30}}>
                <PortSelector className={styles.menuItem} selectLoadFile={this.selectLoadFile} selectSaveFile={this.selectSaveFile} {...this.props} />
                <input type="file" style={{display:'none'}} ref={ref => this.loadProjDialog = ref} onChange={this.loadProject} accept=".sb2,.kb"/>
                <input type="file" style={{display:'none'}} ref={ref => this.saveProjDialog = ref} onChange={this.saveProject} accept=".kb"/>
            </Box>
        );
    }
}

export default MenuBar;
