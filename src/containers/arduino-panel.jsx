const bindAll = require('lodash.bindall');
const React = require('react');

const ArduinoPanelComponent = require('../components/arduino-panel/arduino-panel.jsx');


class ArduinoPanel extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        const {
            kb,
            ...props
        } = this.props;
        return (
            <ArduinoPanelComponent
                visible={this.props.visible}
                code={this.props.code}
                consoleMsg={this.props.consoleMsg}
                restoreFirmware={this.props.restoreFirmware}
                openIno={this.props.openIno}
                codeRef={this.props.codeUpdate}
                uploadProj={this.props.uploadProj}
                firmwares={this.props.firmwares}
                {...props}
            />
        );
    }

}

ArduinoPanel.propTypes = {
    visible: React.PropTypes.bool
};

module.exports = ArduinoPanel;
