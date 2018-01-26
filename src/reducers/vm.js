import VM from 'scratch-vm';
import Blockly from 'scratch-blocks';
import Storage from '../lib/storage';
//*
import Serial from "../../WeeeCode/serial";
import ArduinoBlocks from "../../WeeeCode/arduino";
const WeeeCode = eval('require("./weeecode")');
require('../lib/arduino-generator');
import WeeeBot from "../../WeeeBot";
import WeeeBotMini from "../../WeeeBotMini";


//require("../../WeeeBot/OfflineCode")();
//require("../../WeeeBotMini/OfflineCode")();

function createVM(){
    var vm = new VM();
    vm.on("stop-all-flag-clicked", () => vm.weeecode.sendCmd("M99"));
    vm.weeecode = new WeeeCode(vm);

    let weeebot = new WeeeBot(vm);
    let weeebotMini = new WeeeBotMini(vm);
    
    vm.weeecode.pluginMap = new Map();
    vm.weeecode.pluginMap.set(weeebot.name, weeebot);
    vm.weeecode.pluginMap.set(weeebotMini.name, weeebotMini);
    if(localStorage.pluginName && vm.weeecode.pluginMap.has(localStorage.pluginName)){
    	vm.weeecode.plugin = vm.weeecode.pluginMap.get(localStorage.pluginName);
    }else{
    	vm.weeecode.plugin = weeebotMini;
    }
    
    
    vm.runtime.ioDevices.serial = new Serial(vm);
    var packageObject = new ArduinoBlocks(vm.runtime);
    //for (var packageObject of [new ArduinoBlocks(vm.runtime), weeebot]){

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
    //}
    window.vm = vm;
    vm.weeecode.on("reset_project", () => {
        Blockly.ResetUserData();
    });
    return vm;
}
//*/
const SET_VM = 'scratch-gui/vm/SET_VM';
const defaultVM = createVM();
defaultVM.attachStorage(new Storage());
const initialState = defaultVM;

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_VM:
        return action.vm;
    default:
        return state;
    }
};
const setVM = function (vm) {
    return {
        type: SET_VM,
        vm: vm
    };
};
export {
    reducer as default,
    setVM
};
