import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import Blockly from 'scratch-blocks';

import backdropLibraryContent from '../lib/libraries/backdrops.json';
import LibraryComponent from '../components/library/library.jsx';


class BackdropLibrary extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect'
        ]);
    }
    handleItemSelect (item) {
        const vmBackdrop = {
            name: item.name,
            rotationCenterX: item.info[0] && item.info[0] / 2,
            rotationCenterY: item.info[1] && item.info[1] / 2,
            bitmapResolution: item.info.length > 2 ? item.info[2] : 1,
            skinId: null
        };
        this.props.vm.addBackdrop(item.md5, vmBackdrop);
    }
    render () {
        return (
            <LibraryComponent
                data={backdropLibraryContent}
                title={Blockly.Msg.SCRATCH_BACKDROP_LIBRARY}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

BackdropLibrary.propTypes = {
    onRequestClose: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default BackdropLibrary;
