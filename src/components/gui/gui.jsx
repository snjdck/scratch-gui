import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {Popover} from "react-bootstrap";
import MediaQuery from 'react-responsive';
import tabStyles from 'react-tabs/style/react-tabs.css';
import Blockly from "scratch-blocks";

import Blocks from '../../containers/blocks.jsx';
import CostumeTab from '../../containers/costume-tab.jsx';
import Controls from '../../containers/controls.jsx';
import TargetPane from '../../containers/target-pane.jsx';
import SoundTab from '../../containers/sound-tab.jsx';
import Stage from '../../containers/stage.jsx';

import Box from '../box/box.jsx';
import MenuBar from '../menu-bar/menu-bar.jsx';

import layout from '../../lib/layout-constants.js';
import styles from './gui.css';

import bindAll from 'lodash.bindall';

const tabClassNames = {
    tabs: styles.tabs,
    tab: classNames(tabStyles.reactTabsTab, styles.tab),
    tabList: classNames(tabStyles.reactTabsTabList, styles.tabList),
    tabPanel: classNames(tabStyles.reactTabsTabPanel, styles.tabPanel),
    tabPanelSelected: classNames(tabStyles.reactTabsTabPanelSelected, styles.isSelected),
    tabSelected: classNames(tabStyles.reactTabsTabSelected, styles.isSelected)
};

const ArduinoPanel = require('../../containers/arduino-panel.jsx');

class GUIComponent extends React.Component {
    constructor(props){
        super(props);
        bindAll(this, ["toggleArduinoMode"]);
        this.state = {
            isArduinoMode:false
        };
    }

    componentDidMount(){
    }
    componentWillUnmount(){
    }
    toggleArduinoMode(){
        this.setState((prevState, props) => ({isArduinoMode:!prevState.isArduinoMode}));
    }
render(){
    const {
        basePath,
        children,
        vm,
        onTabSelect,
        tabIndex,
        ...componentProps
    } = this.props;
    if (children) {
        return <Box {...componentProps}>{children}</Box>;
    }

    return (
        <Box
            className={styles.pageWrapper}
            {...componentProps}
        >
            <MenuBar vm={vm} toggleArduinoMode={this.toggleArduinoMode} isArduinoMode={this.state.isArduinoMode} />
            <Box className={styles.bodyWrapper}>
                <Box className={styles.flexWrapper}>
                    <Box className={styles.editorWrapper}>
                        <Tabs
                            className={tabClassNames.tabs}
                            forceRenderTabPanel={true} // eslint-disable-line react/jsx-boolean-value
                            selectedTabClassName={tabClassNames.tabSelected}
                            selectedTabPanelClassName={tabClassNames.tabPanelSelected}
                            onSelect={onTabSelect}
                        >
                            <TabList className={tabClassNames.tabList}>
                                <Tab className={tabClassNames.tab}>{Blockly.Msg.SCRATCH_BLOCKS}</Tab>
                                <Tab className={tabClassNames.tab}>{Blockly.Msg.SCRATCH_COSTUMES}</Tab>
                                <Tab className={tabClassNames.tab}>{Blockly.Msg.SCRATCH_SOUNDS}</Tab>
                            </TabList>
                            <TabPanel className={tabClassNames.tabPanel}>
                                <Box className={styles.blocksWrapper}>
                                    <Blocks
                                        grow={1}
                                        isVisible={tabIndex === 0} // Blocks tab
                                        options={{
                                            media: `${basePath}static/blocks-media/`
                                        }}
                                        vm={vm}
                                    />
                                </Box>
                            </TabPanel>
                            <TabPanel className={tabClassNames.tabPanel}>
                                {tabIndex === 1 ? <CostumeTab vm={vm} /> : null}
                            </TabPanel>
                            <TabPanel className={tabClassNames.tabPanel}>
                                {tabIndex === 2 ? <SoundTab vm={vm} /> : null}
                            </TabPanel>
                        </Tabs>
                    </Box>

                    <Box className={styles.stageAndTargetWrapper}>
                        <Box className={styles.stageMenuWrapper}>
                            <Controls vm={vm} />
                        </Box>
                        <Box className={styles.stageWrapper}>
                            <MediaQuery minWidth={layout.fullSizeMinWidth}>{isFullSize => (
                                <Stage
                                    height={isFullSize ? layout.fullStageHeight : layout.smallerStageHeight}
                                    shrink={0}
                                    vm={vm}
                                    width={isFullSize ? layout.fullStageWidth : layout.smallerStageWidth}
                                />
                            )}</MediaQuery>
                        </Box>
                        <Box className={styles.targetWrapper}>
                            <TargetPane vm={vm} />
                        </Box>
                        <ArduinoPanel vm={vm} visible={this.state.isArduinoMode} consoleMsg={[]} firmwares={[]} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
}
GUIComponent.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    onTabSelect: PropTypes.func,
    tabIndex: PropTypes.number
};
GUIComponent.defaultProps = {
    basePath: './'
};
export default GUIComponent;
