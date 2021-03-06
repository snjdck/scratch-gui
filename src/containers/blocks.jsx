import bindAll from 'lodash.bindall';
import debounce from 'lodash.debounce';
import defaultsDeep from 'lodash.defaultsdeep';
import PropTypes from 'prop-types';
import React from 'react';
import VMScratchBlocks from '../lib/blocks';
import Prompt from './prompt.jsx';
import BlocksComponent from '../components/blocks/blocks.jsx';

const Blockly = require("scratch-blocks");

const addFunctionListener = (object, property, callback) => {
    const oldFn = object[property];
    object[property] = function () {
        const result = oldFn.apply(this, arguments);
        callback.apply(this, result);
        return result;
    };
};

class Blocks extends React.Component {
    constructor (props) {
        super(props);
        this.ScratchBlocks = VMScratchBlocks(props.vm);
        bindAll(this, [
            'onPluginChanged',
            'attachVM',
            'detachVM',
            'handlePromptStart',
            'handlePromptCallback',
            'handlePromptClose',
            'onScriptGlowOn',
            'onScriptGlowOff',
            'onBlockGlowOn',
            'onBlockGlowOff',
            'onTargetsUpdate',
            'onVisualReport',
            'onWorkspaceUpdate',
            'onWorkspaceMetricsChange',
            "loadPlugin",
            "sb2cpp",
            'setBlocks'
        ]);
        this.ScratchBlocks.prompt = this.handlePromptStart;
        this.state = {
            workspaceMetrics: {},
            prompt: null
        };
        this.onTargetsUpdate = debounce(this.onTargetsUpdate, 100);
        this.props.vm.weeecode.on("pluginChanged", this.onPluginChanged);
    }
    onPluginChanged(){
        if(this.props.vm.weeecode.plugin.getBlocks) {
            var blocks = this.props.vm.weeecode.plugin.getBlocks();
            for (var key in blocks) {
                Blockly.Blocks[key] = blocks[key];
            }
        }

        var toolbox = this.props.vm.weeecode.toolbox.getDefalutToolBox();
        toolbox = toolbox.replace(/category name="(\w+)"/g, (str, name) => str.replace(name, Blockly.Msg[name.toUpperCase()]) + ` key="${name}"`);
        var pluginToolbox = this.props.vm.weeecode.plugin.getToolbox();
        Blockly.Blocks.defaultToolbox = toolbox.replace("</xml>", pluginToolbox + "</xml>");

        this.workspace.updateToolbox(Blockly.Blocks.defaultToolbox);
    }

     setToolboxSelectedItemByName (name) {
        const categories = this.workspace.toolbox_.categoryMenu_.categories_;
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].name_ === name) {
                this.workspace.toolbox_.setSelectedItem(categories[i]);
            }
        }
    }
    componentDidMount () {
        if(this.props.vm.weeecode.plugin.getBlocks) {
            var blocks = this.props.vm.weeecode.plugin.getBlocks();
            for (var key in blocks) {
                Blockly.Blocks[key] = blocks[key];
            }
        }

        var toolbox = this.props.vm.weeecode.toolbox.getDefalutToolBox();
        toolbox = toolbox.replace(/category name="(\w+)"/g, (str, name) => str.replace(name, Blockly.Msg[name.toUpperCase()]) + ` key="${name}"`);
        var pluginToolbox = this.props.vm.weeecode.plugin.getToolbox();
        Blockly.Blocks.defaultToolbox = toolbox.replace("</xml>", pluginToolbox + "</xml>");
        //this.props.toolboxXML = Blockly.Blocks.defaultToolbox;
        
        const workspaceConfig = defaultsDeep({}, Blocks.defaultOptions, this.props.options);
        this.workspace = this.ScratchBlocks.inject(this.blocks, workspaceConfig);

         this.workspace.updateToolbox(Blockly.Blocks.defaultToolbox);

        // @todo change this when blockly supports UI events
        addFunctionListener(this.workspace, 'translate', this.onWorkspaceMetricsChange);
        addFunctionListener(this.workspace, 'zoom', this.onWorkspaceMetricsChange);

        this.attachVM();
    }
    shouldComponentUpdate (nextProps, nextState) {
        return (
            this.state.prompt !== nextState.prompt ||
            this.props.isVisible !== nextProps.isVisible ||
            this.props.toolboxXML !== nextProps.toolboxXML
        );
        return this.state.prompt !== nextState.prompt || this.props.isVisible !== nextProps.isVisible;
    }
    componentDidUpdate (prevProps) {
        if (prevProps.toolboxXML !== this.props.toolboxXML) {
            const selectedCategoryName = this.workspace.toolbox_.getSelectedItem().name_;
            this.workspace.updateToolbox(this.props.toolboxXML);
            // Blockly throws if we don't select a category after updating the toolbox.
            /** @TODO Find a way to avoid the exception without accessing private properties. */
            this.setToolboxSelectedItemByName(selectedCategoryName);
        }
        if (this.props.isVisible === prevProps.isVisible) {
            return;
        }

        // @todo hack to resize blockly manually in case resize happened while hidden
        // @todo hack to reload the workspace due to gui bug #413
        if (this.props.isVisible) { // Scripts tab
            this.workspace.setVisible(true);
            this.props.vm.refreshWorkspace();
            window.dispatchEvent(new Event('resize'));
            this.workspace.toolbox_.refreshSelection();
        } else {
            this.workspace.setVisible(false);
        }
    }
    componentWillUnmount () {
        this.detachVM();
        this.workspace.dispose();
    }
    loadPlugin(){
        return;
        //var pluginName = this.props.kb.pluginmng.enabled;
        var pluginName = "WeeeBot";
        var runtime = this.props.vm.runtime;
        this.props.vm.weeecode.loadPlugin(pluginName,runtime);
        /*
        var pluginPackage = {
            pluginName:this.props.vm.weeecode.pluginmodule
        };*/
        var vm = this.props.vm
        var packageObject = new (this.props.vm.weeecode.pluginmodule)(vm.runtime);

        const packagePrimitives = packageObject.getPrimitives();
        for (const op in packagePrimitives) {
            if (packagePrimitives.hasOwnProperty(op)) {
                vm.runtime._primitives[op] =
                    packagePrimitives[op].bind(packageObject);
            }
        }
        const packageHats = packageObject.getHats();
        for (const hatName in packageHats) {
            if (packageHats.hasOwnProperty(hatName)) {
                vm.runtime._hats[hatName] = packageHats[hatName];
            }
        }
        //runtime._registerBlockPackages(pluginPackage);
    }
    sb2cpp(){
        try {
            var code = "";
            code += Blockly.Arduino.workspaceToCode(this.workspace);
        } catch(e) {
            console.log(e.message);
        }
        return code;
    }
    attachVM () {
        this.workspace.addChangeListener(this.props.vm.blockListener);
        this.flyoutWorkspace = this.workspace
            .getFlyout()
            .getWorkspace();
        this.flyoutWorkspace.addChangeListener(this.props.vm.flyoutBlockListener);
        this.flyoutWorkspace.addChangeListener(this.props.vm.monitorBlockListener);
        this.props.vm.addListener('SCRIPT_GLOW_ON', this.onScriptGlowOn);
        this.props.vm.addListener('SCRIPT_GLOW_OFF', this.onScriptGlowOff);
        this.props.vm.addListener('BLOCK_GLOW_ON', this.onBlockGlowOn);
        this.props.vm.addListener('BLOCK_GLOW_OFF', this.onBlockGlowOff);
        this.props.vm.addListener('VISUAL_REPORT', this.onVisualReport);
        this.props.vm.addListener('workspaceUpdate', this.onWorkspaceUpdate);
        this.props.vm.addListener('targetsUpdate', this.onTargetsUpdate);
    }
    detachVM () {
        this.props.vm.removeListener('SCRIPT_GLOW_ON', this.onScriptGlowOn);
        this.props.vm.removeListener('SCRIPT_GLOW_OFF', this.onScriptGlowOff);
        this.props.vm.removeListener('BLOCK_GLOW_ON', this.onBlockGlowOn);
        this.props.vm.removeListener('BLOCK_GLOW_OFF', this.onBlockGlowOff);
        this.props.vm.removeListener('VISUAL_REPORT', this.onVisualReport);
        this.props.vm.removeListener('workspaceUpdate', this.onWorkspaceUpdate);
        this.props.vm.removeListener('targetsUpdate', this.onTargetsUpdate);
    }
    updateToolboxBlockValue (id, value) {
        const block = this.workspace
            .getFlyout()
            .getWorkspace()
            .getBlockById(id);
        if (block) {
            block.inputList[0].fieldRow[0].setValue(value);
        }
    }
    onTargetsUpdate () {
        if (this.props.vm.editingTarget) {
            ['glide', 'move', 'set'].forEach(prefix => {
                this.updateToolboxBlockValue(`${prefix}x`, this.props.vm.editingTarget.x.toFixed(0));
                this.updateToolboxBlockValue(`${prefix}y`, this.props.vm.editingTarget.y.toFixed(0));
            });
        }
    }
    onWorkspaceMetricsChange () {
        const target = this.props.vm.editingTarget;
        if (target && target.id) {
            const workspaceMetrics = Object.assign({}, this.state.workspaceMetrics, {
                [target.id]: {
                    scrollX: this.workspace.scrollX,
                    scrollY: this.workspace.scrollY,
                    scale: this.workspace.scale
                }
            });
            this.setState({workspaceMetrics});
        }
    }
    onScriptGlowOn (data) {
        this.workspace.glowStack(data.id, true);
    }
    onScriptGlowOff (data) {
        this.workspace.glowStack(data.id, false);
    }
    onBlockGlowOn (data) {
        this.workspace.glowBlock(data.id, true);
    }
    onBlockGlowOff (data) {
        this.workspace.glowBlock(data.id, false);
    }
    onVisualReport (data) {
        this.workspace.reportValue(data.id, data.value);
    }
    onWorkspaceUpdate (data) {
        if (this.props.vm.editingTarget && !this.state.workspaceMetrics[this.props.vm.editingTarget.id]) {
            this.onWorkspaceMetricsChange();
        }

        this.ScratchBlocks.Events.disable();
        this.workspace.clear();

        const dom = this.ScratchBlocks.Xml.textToDom(data.xml);
        this.ScratchBlocks.Xml.domToWorkspace(dom, this.workspace);
        this.ScratchBlocks.Events.enable();
        this.workspace.toolbox_.refreshSelection();

        if (this.props.vm.editingTarget && this.state.workspaceMetrics[this.props.vm.editingTarget.id]) {
            const {scrollX, scrollY, scale} = this.state.workspaceMetrics[this.props.vm.editingTarget.id];
            this.workspace.scrollX = scrollX;
            this.workspace.scrollY = scrollY;
            this.workspace.scale = scale;
            this.workspace.resize();
        }
    }
    setBlocks (blocks) {
        this.blocks = blocks;
    }
    handlePromptStart (message, defaultValue, callback) {
        this.setState({prompt: {callback, message, defaultValue}});
    }
    handlePromptCallback (data) {
        this.state.prompt.callback(data);
        this.handlePromptClose();
    }
    handlePromptClose () {
        this.setState({prompt: null});
    }
    render () {
        const {
            options, // eslint-disable-line no-unused-vars
            vm, // eslint-disable-line no-unused-vars
            isVisible, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <div>
                <BlocksComponent
                    componentRef={this.setBlocks}
                    {...props}
                />
                {this.state.prompt ? (
                    <Prompt
                        label={this.state.prompt.message}
                        placeholder={this.state.prompt.defaultValue}
                        title={this.state.prompt.message}
                        onCancel={this.handlePromptClose}
                        onOk={this.handlePromptCallback}
                    />
                ) : null}
            </div>
        );
    }
}

Blocks.propTypes = {
    isVisible: PropTypes.bool,
    options: PropTypes.shape({
        media: PropTypes.string,
        zoom: PropTypes.shape({
            controls: PropTypes.bool,
            wheel: PropTypes.bool,
            startScale: PropTypes.number
        }),
        colours: PropTypes.shape({
            workspace: PropTypes.string,
            flyout: PropTypes.string,
            toolbox: PropTypes.string,
            toolboxSelected: PropTypes.string,
            scrollbar: PropTypes.string,
            scrollbarHover: PropTypes.string,
            insertionMarker: PropTypes.string,
            insertionMarkerOpacity: PropTypes.number,
            fieldShadow: PropTypes.string,
            dragShadowOpacity: PropTypes.number
        }),
        comments: PropTypes.bool
    })
};

Blocks.defaultOptions = {
    zoom: {
        controls: true,
        wheel: true,
        startScale: 0.675
    },
    grid: {
        spacing: 40,
        length: 2,
        colour: '#ddd'
    },
    colours: {
        workspace: '#F9F9F9',
        flyout: '#F9F9F9',
        toolbox: '#FFFFFF',
        toolboxSelected: '#E9EEF2',
        scrollbar: '#CECDCE',
        scrollbarHover: '#CECDCE',
        insertionMarker: '#000000',
        insertionMarkerOpacity: 0.2,
        fieldShadow: 'rgba(255, 255, 255, 0.3)',
        dragShadowOpacity: 0.6
    },
    comments: false
};

Blocks.defaultProps = {
    isVisible: true,
    options: Blocks.defaultOptions
};

export default Blocks;
