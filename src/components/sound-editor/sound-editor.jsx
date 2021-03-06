import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';

import Waveform from '../waveform/waveform.jsx';
import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';

import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import AudioTrimmer from '../../containers/audio-trimmer.jsx';
import IconButton from '../icon-button/icon-button.jsx';

import styles from './sound-editor.css';
import Blockly from 'scratch-blocks';

import playIcon from '../record-modal/icon--play.svg';
import stopIcon from '../record-modal/icon--stop-playback.svg';
import trimIcon from './icon--trim.svg';
import redoIcon from './icon--redo.svg';
import undoIcon from './icon--undo.svg';
import echoIcon from './icon--echo.svg';
import higherIcon from './icon--higher.svg';
import lowerIcon from './icon--lower.svg';
import louderIcon from './icon--louder.svg';
import softerIcon from './icon--softer.svg';
import robotIcon from './icon--robot.svg';
import reverseIcon from './icon--reverse.svg';

const BufferedInput = BufferedInputHOC(Input);

const messages = defineMessages({
    sound: {
        id: 'soundEditor.sound',
        description: 'Lable for the name of the sound',
        defaultMessage: 'Sound'
    },
    play: {
        id: 'soundEditor.play',
        description: 'Title of the button to start playing the sound',
        defaultMessage: 'Play'
    },
    stop: {
        id: 'soundEditor.stop',
        description: 'Title of the button to stop the sound',
        defaultMessage: 'Stop'
    },
    trim: {
        id: 'soundEditor.trim',
        description: 'Title of the button to start trimminging the sound',
        defaultMessage: 'Trim'
    },
    save: {
        id: 'soundEditor.save',
        description: 'Title of the button to save trimmed sound',
        defaultMessage: 'Save'
    },
    undo: {
        id: 'soundEditor.undo',
        description: 'Title of the button to undo',
        defaultMessage: 'Undo'
    },
    redo: {
        id: 'soundEditor.redo',
        description: 'Title of the button to redo',
        defaultMessage: 'Redo'
    },
    faster: {
        id: 'soundEditor.faster',
        description: 'Title of the button to apply the faster effect',
        defaultMessage: 'Faster'
    },
    slower: {
        id: 'soundEditor.slower',
        description: 'Title of the button to apply the slower effect',
        defaultMessage: 'Slower'
    },
    echo: {
        id: 'soundEditor.echo',
        description: 'Title of the button to apply the echo effect',
        defaultMessage: 'Echo'
    },
    robot: {
        id: 'soundEditor.robot',
        description: 'Title of the button to apply the robot effect',
        defaultMessage: 'Robot'
    },
    louder: {
        id: 'soundEditor.louder',
        description: 'Title of the button to apply the louder effect',
        defaultMessage: 'Louder'
    },
    softer: {
        id: 'soundEditor.softer',
        description: 'Title of the button to apply thr.softer effect',
        defaultMessage: 'Softer'
    },
    reverse: {
        id: 'soundEditor.reverse',
        description: 'Title of the button to apply the reverse effect',
        defaultMessage: 'Reverse'
    }
});

const SoundEditor = props => (
    <div className={styles.editorContainer}>
        <div className={styles.row}>
            <div className={styles.inputGroup}>
                {props.playhead ? (
                    <button
                        className={classNames(styles.button, styles.stopButtonn)}
                        title={Blockly.Msg.WC_SOUND_STOP}
                        onClick={props.onStop}
                    >
                        <img src={stopIcon} />
                    </button>
                ) : (
                    <button
                        className={classNames(styles.button, styles.playButton)}
                        title={Blockly.Msg.WC_SOUND_PLAY}
                        onClick={props.onPlay}
                    >
                        <img src={playIcon} />
                    </button>
                )}
            </div>
            <div className={styles.inputGroup}>
                <Label text={Blockly.Msg.WC_SOUND_SOUND}>
                    <BufferedInput
                        tabIndex="1"
                        type="text"
                        value={props.name}
                        onSubmit={props.onChangeName}
                    />
                </Label>
            </div>
            <div className={styles.inputGroupRight}>
                <button
                    className={classNames(styles.button, styles.trimButton, {
                        [styles.trimButtonActive]: props.trimStart !== null
                    })}
                    title={props.trimStart === null ? Blockly.Msg.WC_SOUND_TRIM : Blockly.Msg.SCRATCH_PROJECT_SAVE}
                    onClick={props.onActivateTrim}
                >
                    <img src={trimIcon} />
                    {props.trimStart === null ? Blockly.Msg.WC_SOUND_TRIM : Blockly.Msg.SCRATCH_PROJECT_SAVE}
                </button>
                <div className={styles.buttonGroup}>
                    <button
                        className={styles.button}
                        disabled={!props.canUndo}
                        title={Blockly.Msg.WC_SOUND_UNDO}
                        onClick={props.onUndo}
                    >
                        <img src={undoIcon} />
                    </button>
                    <button
                        className={styles.button}
                        disabled={!props.canRedo}
                        title={Blockly.Msg.WC_SOUND_REDO}
                        onClick={props.onRedo}
                    >
                        <img src={redoIcon} />
                    </button>
                </div>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.waveformContainer}>
                <Waveform
                    data={props.chunkLevels}
                    height={180}
                    width={600}
                />
                <AudioTrimmer
                    playhead={props.playhead}
                    trimEnd={props.trimEnd}
                    trimStart={props.trimStart}
                    onSetTrimEnd={props.onSetTrimEnd}
                    onSetTrimStart={props.onSetTrimStart}
                />
            </div>
        </div>
        <div className={styles.row}>
            <IconButton
                className={styles.effectButton}
                img={higherIcon}
                title={Blockly.Msg.SOUND_FASTER}
                onClick={props.onFaster}
            />
            <IconButton
                className={styles.effectButton}
                img={lowerIcon}
                title={Blockly.Msg.SOUND_SLOWER}
                onClick={props.onSlower}
            />
            <IconButton
                className={styles.effectButton}
                img={echoIcon}
                title={Blockly.Msg.SOUND_ECHO}
                onClick={props.onEcho}
            />
            <IconButton
                className={styles.effectButton}
                img={robotIcon}
                title={Blockly.Msg.SOUND_ROBOT}
                onClick={props.onRobot}
            />
            <IconButton
                className={styles.effectButton}
                img={louderIcon}
                title={Blockly.Msg.SOUND_LOUDER}
                onClick={props.onLouder}
            />
            <IconButton
                className={styles.effectButton}
                img={softerIcon}
                title={Blockly.Msg.SOUND_SOFTER}
                onClick={props.onSofter}
            />
            <IconButton
                className={styles.effectButton}
                img={reverseIcon}
                title={Blockly.Msg.SOUND_REVERSE}
                onClick={props.onReverse}
            />
        </div>
    </div>
);

SoundEditor.propTypes = {
    canRedo: PropTypes.bool.isRequired,
    canUndo: PropTypes.bool.isRequired,
    chunkLevels: PropTypes.arrayOf(PropTypes.number).isRequired,
    intl: intlShape,
    name: PropTypes.string.isRequired,
    onActivateTrim: PropTypes.func,
    onChangeName: PropTypes.func.isRequired,
    onEcho: PropTypes.func.isRequired,
    onFaster: PropTypes.func.isRequired,
    onLouder: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
    onReverse: PropTypes.func.isRequired,
    onRobot: PropTypes.func.isRequired,
    onSetTrimEnd: PropTypes.func,
    onSetTrimStart: PropTypes.func,
    onSlower: PropTypes.func.isRequired,
    onSofter: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
    playhead: PropTypes.number,
    trimEnd: PropTypes.number,
    trimStart: PropTypes.number
};

export default injectIntl(SoundEditor);
