import AudioEngine from 'scratch-audio';
import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import vmListenerHOC from '../lib/vm-listener-hoc.jsx';

import GUIComponent from '../components/gui/gui.jsx';

class GUI extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleTabSelect'
        ]);
        this.state = {tabIndex: 0};
    }
    componentDidMount () {
        this.audioEngine = new AudioEngine();
        this.props.vm.attachAudioEngine(this.audioEngine);
        this.props.vm.loadProject(this.props.projectData);
        this.props.vm.setCompatibilityMode(true);
        this.props.vm.start();
    }
    componentWillReceiveProps (nextProps) {
        if (this.props.projectData !== nextProps.projectData) {
            this.props.vm.loadProject(nextProps.projectData);
        }
    }
    componentWillUnmount () {
        this.props.vm.stopAll();
    }
    handleTabSelect (tabIndex) {
        this.setState({tabIndex});
    }
    render () {
        const {
            children,
            projectData, // eslint-disable-line no-unused-vars
            vm,
            ...componentProps
        } = this.props;
        return (
            <GUIComponent
                tabIndex={this.state.tabIndex}
                vm={vm}
                onTabSelect={this.handleTabSelect}
                {...componentProps}
            >
                {children}
            </GUIComponent>
        );
    }
}

GUI.propTypes = {
    ...GUIComponent.propTypes,
    projectData: PropTypes.string
};

GUI.defaultProps = GUIComponent.defaultProps;

export default vmListenerHOC(GUI);
