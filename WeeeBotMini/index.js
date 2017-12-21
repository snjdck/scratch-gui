

export default function WeeeBotMini(vm) {
	this.name = "WeeeBotMini";
	this.boardType = "arduino:avr:uno";

    this.runtime = vm.runtime;
    this.wc = vm.weeecode;
    this.color = {
        "primary": "#FF6680",
        "secondary": "#FF4D6A",
        "tertiary": "#FF3355"
    };
    vm.on("stop-all-flag-clicked", () => this.wc.sendCmd("M99"));
}
import toolbox from "./Toolbox"

WeeeBotMini.prototype.getBlocks = require("./Blocks");
WeeeBotMini.prototype.getPrimitives = require("./Primitives");
WeeeBotMini.prototype.getToolbox = ()=>toolbox;
WeeeBotMini.prototype.getHats = ()=>{};