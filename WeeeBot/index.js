

export default function WeeeBot(vm) {
	this.name = "WeeeBot";
	this.boardType = "arduino:avr:uno";

    this.runtime = vm.runtime;
    this.wc = vm.weeecode;
    this.color = {
        "primary": "#FF6680",
        "secondary": "#FF4D6A",
        "tertiary": "#FF3355"
    };
    vm.on("stop-all-flag-clicked", ()=>{
    	this.wc.sendCmd("M99");
    });
}
import toolbox from "./Toolbox"


WeeeBot.prototype.getBlocks = require("./Blocks");
WeeeBot.prototype.getPrimitives = require("./Primitives");
WeeeBot.prototype.getToolbox = function(){
    return toolbox;
}
WeeeBot.prototype.getHats = function(){};