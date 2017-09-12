

export default function WeeeBot(runtime) {
	this.name = "WeeeBot";
	this.boardType = "arduino:avr:uno";

    this.runtime = runtime;
    this.color = {
        "primary": "#FF6680",
        "secondary": "#FF4D6A",
        "tertiary": "#FF3355"
    };
}
import toolbox from "./Toolbox"


WeeeBot.prototype.getBlocks = require("./Blocks");
WeeeBot.prototype.getPrimitives = require("./Primitives");
WeeeBot.prototype.getToolbox = function(){
    return toolbox;
}
WeeeBot.prototype.getHats = function(){};