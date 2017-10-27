import VM from 'scratch-vm';
import Storage from '../lib/storage';
//*
import Serial from "../../WeeeCode/serial";
import ArduinoBlocks from "../../WeeeCode/arduino";
const WeeeCode = eval('require("./weeecode")');
import WeeeBot from "../../WeeeBot";

require('../lib/arduino-generator');
require("../../WeeeBot/OfflineCode")();

function createVM(){
    var vm = new VM();
    vm.weeecode = new WeeeCode(vm);
    vm.weeebot = new WeeeBot(vm);
    vm.weeecode.plugin = vm.weeebot;
    vm.runtime.ioDevices.serial = new Serial(vm);
    //var packageObject = new ArduinoBlocks(vm.runtime);
    for (var packageObject of [new ArduinoBlocks(vm.runtime), vm.weeebot]){

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
    }
    window.vm = vm;
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
