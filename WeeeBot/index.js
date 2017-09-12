/**
 * Created by Riven on 2016/12/17.
 */


//require("./OfflineCode")();

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

//WeeeBot.prototype.Blockly = require("scratch-blocks");
WeeeBot.prototype.getBlocks = require("./Blocks");
WeeeBot.prototype.getPrimitives = require("./Primitives");
WeeeBot.prototype.getToolbox = function(){
    return toolbox;
}
WeeeBot.prototype.getHats = function(){};



/*
var WeeeCode = (function(){
    var option_handler = function(block){
        var order = Blockly.Arduino.ORDER_ATOMIC;
        var code = block.inputList[0].fieldRow[0].value_;
        return [code, order];
    }
    var alias_handler = function(name){
        Blockly.Arduino[name] = option_handler;
    }
    return {
        "PORTS": ["0", "A0", "A1", "A5", "A4", "A3", "A2", "13"],
        "option_handler": option_handler,
        "alias_handler": alias_handler
    };
})();

WeeeCode.alias_handler("test_tone_note_note_option");
WeeeCode.alias_handler("test_tone_note_beat_option");
WeeeCode.alias_handler("board_port");
WeeeCode.alias_handler("kittenbot_stepper_option");
WeeeCode.alias_handler("kittenbot_dcmotor_option");

(function(arduino){
    arduino.test_tone_note = function (block) {
        var b = arduino.ORDER_NONE;
        var note = arduino.valueToCode(block, "TEST_TONE_NOTE_NOTE_OPTION", b);
        var hz = arduino.valueToCode(block, "TEST_TONE_NOTE_BEAT_OPTION", b);
        return arduino.tab() + "tone(" + note + "," + hz + ")" + arduino.END;
    };
    arduino.board_light_sensor = function(block){
        var b = arduino.ORDER_NONE;
        var port = arduino.valueToCode(block, "BOARD_PORT", b);
        var pin = WeeeCode.PORTS[port];
        arduino.setupCodes_["board_light_sensor"] = "pinMode(" + pin + ",INPUT);";
        return ["analogRead(" + pin + ")", b];
    };
    arduino.board_sound_sensor = function(block){
        var b = arduino.ORDER_NONE;
        var port = arduino.valueToCode(block, "BOARD_PORT", b);
        var pin = WeeeCode.PORTS[port];
        arduino.setupCodes_["board_sound_sensor"] = "pinMode(" + pin + ",INPUT);";
        return ["analogRead(" + pin + ")", b];
    };
})(Blockly.Arduino);
*/

/*
KittenBot.prototype.kittenbot_encoder_move = function (argValues, util) {
    var port = argValues.MOTOR_PORT;
    var speed = argValues.SPEED;
    var distance = argValues.DISTANCE;
    var cmd = "M202 " + port + " " + speed + " " + distance;
    console.log(cmd);
    //util.ioQuery('serial', 'sendMsg', cmd);
}

KittenBot.prototype.kittenbot_steppermove = function (argValues, util) {
    var port = argValues.MOTOR_PORT;
    var speed = argValues.SPEED;
    var distance = argValues.DISTANCE;
    var cmd = "M203 " + port + " " + speed + " " + distance;
    console.log(cmd);
    //util.ioQuery('serial', 'sendMsg', cmd);
}

KittenBot.prototype.on_board_servo = function (argValues, util) {
    var port = argValues.BOARD_PORT;
    var angle = argValues.ANGLE;
    var cmd = "M201 " + port + " " + angle;
    console.log(cmd);
    //util.ioQuery('serial', 'sendMsg', cmd);
}

KittenBot.prototype.board_temperature_sensor = function (argValues, util) {
    var port = argValues.BOARD_PORT;
    var cmd = "M12 " + port;
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":cmd, "resolve":resolve});
    });
    return exePromise;
}

KittenBot.prototype.board_sound_sensor = function (argValues, util) {
    var port = argValues.BOARD_PORT;
    var cmd = "M11 " + port;
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":cmd, "resolve":resolve});
    });
    return exePromise;
}

KittenBot.prototype.ultrasonic = function (argValues, util) {
    var port = argValues.BOARD_PORT;
    var cmd = "M11 " + port;
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":cmd, "resolve":resolve});
    });
    return exePromise;
}

KittenBot.prototype.line_follower = function (argValues, util) {
    var port = argValues.BOARD_PORT;
    var cmd = "M12 " + port;
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":cmd, "resolve":resolve});
    });
    return exePromise;
}

KittenBot.prototype.test_tone_note = function (argValues, util) {
    var note = argValues.TEST_TONE_NOTE_NOTE_OPTION;
    var hz = argValues.TEST_TONE_NOTE_BEAT_OPTION;
    var cmd = "M10 "+ note + " " + hz;
    util.ioQuery('serial', 'sendMsg', cmd);
}


KittenBot.prototype.on_board_button = function (argValues, util) {
    var port = argValues.ON_BOARD_PORT;
    var cmd = "M0 " + port;
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":cmd, "resolve":resolve});
    });
    return exePromise;
}

KittenBot.prototype.servoframe = function (argValues, util) {
    console.log("servo frame");
}

KittenBot.prototype.stepperarc = function (argValues, util) {
    var cmd = "M201 "+argValues.DIAMETER+" "+argValues.DEGREE;
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":"M201", "resolve":resolve});
    });
}

KittenBot.prototype.motorMove = function (argValues, util) {
    var spd = argValues.SPEED;
    var cmd = "M201 "+spd;
    util.ioQuery('serial', 'sendMsg', cmd);
}
/*
KittenBot.prototype.stepperMove = function(argValues, util) {
    var distance = Math.floor(argValues.LENGTH/100*KittenBot.PULSE_PER_METER);
    var cmd = "M101 L"+distance+" R"+distance;
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":"M101", "resolve":resolve});
    });
    return exePromise;
};

KittenBot.prototype.stepperTurn = function(argValues, util) {
    var steps = Math.floor(argValues.DEGREE/180.0*3.141*KittenBot.BASE_WIDTH/2.0*KittenBot.PULSE_PER_METER);
    var cmd = "M101 L"+steps+" R"+(-steps);
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":"M101", "resolve":resolve});
    });
    return exePromise;
};

KittenBot.prototype.stepperSpeedSingle = function(argValues, util) {
    var stpIdx = argValues.KITTENBOT_STEPPER_OPTION;
    var pos = Math.floor(argValues.POS/360*KittenBot.PULSE_PER_ROUND);
    var spd = Math.floor(argValues.SPEED*KittenBot.PULSE_PER_ROUND/60); // change rpm to pulse per second
    if(stpIdx=='A'){
        var cmd = "M100 L"+pos+" A"+spd;
    }else{
        var cmd = "M100 R"+pos+" B"+spd;
    }

    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":"M100", "resolve":resolve});
    });
    return exePromise;
};

KittenBot.prototype.stepperSpeedDual = function(argValues, util) {
    var posL = Math.floor(argValues.POSL/360*KittenBot.PULSE_PER_ROUND);
    var posR = Math.floor(argValues.POSR/360*KittenBot.PULSE_PER_ROUND);
    var spdL = Math.floor(argValues.SPDL*KittenBot.PULSE_PER_ROUND/60); // change rpm to pulse per second
    var spdR = Math.floor(argValues.SPDR*KittenBot.PULSE_PER_ROUND/60); // change rpm to pulse per second
    var cmd = "M100 L"+posL+" R"+posR+" A"+spdL+" B"+spdR;
    console.log("M100 "+cmd);
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":"M100", "resolve":resolve});
    });
    return exePromise;
};

KittenBot.prototype.motorDc = function(argValues, util) {
    var spd = argValues.SPEED;
    var idx = argValues.KITTENBOT_DCMOTOR_OPTION;
    var cmd = "M200 "+idx +" "+spd;
    util.ioQuery('serial', 'sendMsg', cmd);
    console.log("motorDc "+cmd);
};

KittenBot.prototype.motorStop = function(argValues, util) {
    var cmd = "M102";
    util.ioQuery('serial', 'sendMsg', cmd);
};

KittenBot.prototype.board_light_sensor = function(argValues, util) {
    var port = argValues.BOARD_PORT;
    var cmd = "M8 " + port;
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":cmd, "resolve":resolve});
    });
    return exePromise;
    //return 100;
};

KittenBot.prototype.rgbPixels = function(argValues, util) {
    var pin = argValues.BOARD_PORT_RGB;
    var pix = argValues.PIXEL;
    var color = argValues.COLOR;
    color = hexToRgb(color);
    var cmd = "M9 "+pin+" "+pix+" "+color.r+" "+color.g+" "+color.b;
    util.ioQuery('serial', 'sendMsg', cmd);
};

KittenBot.prototype.rgbPixels3 = function(argValues, util) {
    var pin = argValues.BOARD_PORT_RGB;
    var pix = argValues.PIXEL;
    var r = argValues.R;
    var g = argValues.G;
    var b = argValues.B;
    r = 2.55 * Math.max(0, Math.min(100, r));
    g = 2.55 * Math.max(0, Math.min(100, g));
    b = 2.55 * Math.max(0, Math.min(100, b));
    var cmd = "M9 "+pin+" "+pix+" "+r+" "+g+" "+b;
    util.ioQuery('serial', 'sendMsg', cmd);
};

KittenBot.prototype.distance = function(argValues, util) {
    var pin = argValues.PINNUM;
    var cmd = "M110 "+pin;
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":("M110 "+pin), "resolve":resolve});
    });
    return exePromise;
};

KittenBot.prototype.ping = function(argValues, util) {
    var trigpin = argValues.TRIGPIN;
    var echopin = argValues.ECHOPIN;
    var cmd = "M202 "+trigpin+" "+echopin;
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":("M202"), "resolve":resolve});
    });
    return exePromise;
};

KittenBot.prototype.infraread = function(argValues, util) {
    var port = argValues.BOARD_PORT;
    var code = argValues.IR_CODE;
    var cmd = "M7 "+ port + " " + code;
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":cmd, "resolve":resolve});
    });
    return exePromise;
};

KittenBot.prototype.lcd = function(argValues, util) {
    var txt = argValues.TEXT;
    var cmd = "M205 "+txt;
    util.ioQuery('serial', 'sendMsg', cmd);
};

KittenBot.prototype.leddraw = function (argValues, util) {
    var r = argValues.ROW;
    var c = argValues.COL;
    var val = argValues.VAL;
    var cmd = "M207 "+r+" "+c+" "+val;
    util.ioQuery('serial', 'sendMsg', cmd);
}

KittenBot.prototype.ledattach = function (argValues, util) {
    var dio = argValues.DIO;
    var clk = argValues.CLK;
    var cs = argValues.CS;
    var cmd = "M208 "+dio+" "+clk+" "+cs;
    util.ioQuery('serial', 'sendMsg', cmd);
}

KittenBot.prototype.digital = function(argValues, util) {
    var dio = argValues.DIO;
    var clk = argValues.CLK;
    var n = argValues.NUM;
    var cmd = "M206 "+" "+dio+" "+clk+" "+n;
    util.ioQuery('serial', 'sendMsg', cmd);
};

KittenBot.prototype.kittenbot_direction_option = function(argValues, util) {
    return argValues.KITTENBOT_DIRECTION_OPTION;
};

KittenBot.prototype.kittenbot_turn_option = function(argValues, util) {
    return argValues.KITTENBOT_TURN_OPTION;
};

KittenBot.prototype.kittenbot_direction_option = function(argValues, util) {
    return argValues.ARDUINO_PIN_MODE_OPTION;
};
//*/
    /*
    return '<category name="EBlock" colour="#FF6680" secondaryColour="#FF3355">'+
        '<block type="kittenbot_motor_dc">'+
        '<value name="KITTENBOT_DCMOTOR_OPTION">' +
        '<shadow type="kittenbot_dcmotor_option">' +
        '<field name="KITTENBOT_DCMOTOR_OPTION">9</field>' +
        '</shadow>' +
        '</value>' +
        '<value name="SPEED">'+
        '<shadow type="math_number">'+
        '<field name="NUM">100</field>'+
        '</shadow>'+
        '</value>'+
        '</block>'+
        '<block type="kittenbot_motor_move">'+
        '<value name="SPEED">'+
        '<shadow type="math_number">'+
        '<field name="NUM">120</field>'+
        '</shadow>'+
        '</value>'+
        '</block>'+
        '<block type="kittenbot_stop">'+
        '</block>'+

        
        '<block type="kittenbot_steppermove">'+
        '<value name="MOTOR_PORT">'+
        '<shadow type="motor_port">'+
        '<field name="MOTOR_PORT">3</field>'+
        '</shadow></value>'+
        '<value name="SPEED">'+
        '<shadow type="math_number">'+
        '<field name="NUM">3000</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="DISTANCE">'+
        '<shadow type="math_number">'+
        '<field name="NUM">1000</field>'+
        '</shadow>'+
        '</value>'+
        '</block>'+

        '<block type="kittenbot_encoder_move">'+
        '<value name="MOTOR_PORT">'+
        '<shadow type="motor_port">'+
        '<field name="MOTOR_PORT">3</field>'+
        '</shadow></value>'+
        '<value name="SPEED">'+
        '<shadow type="math_number">'+
        '<field name="NUM">100</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="DISTANCE">'+
        '<shadow type="math_number">'+
        '<field name="NUM">1000</field>'+
        '</shadow>'+
        '</value>'+
        '</block>'+


        '<block type="on_board_servo">'+
        '<value name="BOARD_PORT">'+
        '<shadow type="board_port">'+
        '<field name="BOARD_PORT">1</field>'+
        '</shadow></value>'+
        '<value name="ANGLE">'+
        '<shadow type="math_number">'+
        '<field name="NUM">90</field>'+
        '</shadow>'+
        '</value>'+
        '</block>'+


        '<block type="test_tone_note">' + 
        '<value name="TEST_TONE_NOTE_NOTE_OPTION">'+
        '<shadow type="test_tone_note_note_option">'+
        '<field name="TEST_TONE_NOTE_NOTE_OPTION">262</field>'+
        '</shadow></value>'+
        '<value name="TEST_TONE_NOTE_BEAT_OPTION">'+
        '<shadow type="test_tone_note_beat_option">'+
        '<field name="TEST_TONE_NOTE_BEAT_OPTION">500</field>'+
        '</shadow></value>'+
        '</block>' + 
        /*
        '<block type="line_follower">' + 
        '<value name="BOARD_PORT">'+
        '<shadow type="board_port">'+
        '<field name="BOARD_PORT">1</field>'+
        '</shadow></value>'+
        '</block>' + 
        '<block type="ultrasonic">' + 
        '<value name="BOARD_PORT">'+
        '<shadow type="board_port">'+
        '<field name="BOARD_PORT">1</field>'+
        '</shadow></value>'+
        '</block>' + 
        '<block type="kittenbot_steppermove">'+
        '<value name="LENGTH">'+
        '<shadow type="math_number">'+
        '<field name="NUM">100</field>'+
        '</shadow>'+
        '</value>'+
        '</block>'+
        '<block type="kittenbot_stepperturn">'+
        '<value name="DEGREE">'+
        '<shadow type="math_number">'+
        '<field name="NUM">90</field>'+
        '</shadow>'+
        '</value>'+
        '</block>'+
        '<block type="kittenbot_stepperarc">'+
        '<value name="DIAMETER">'+
        '<shadow type="math_number">'+
        '<field name="NUM">20</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="DEGREE">'+
        '<shadow type="math_number">'+
        '<field name="NUM">90</field>'+
        '</shadow>'+
        '</value>'+
        '</block>'+
        '<block type="kittenbot_stepperspeed_single">'+
        '<value name="KITTENBOT_STEPPER_OPTION">' +
        '<shadow type="kittenbot_stepper_option">' +
        '<field name="KITTENBOT_STEPPER_OPTION">A</field>' +
        '</shadow>' +
        '</value>' +
        '<value name="POS">'+
        '<shadow type="math_number">'+
        '<field name="NUM">360</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="SPEED">'+
        '<shadow type="math_number">'+
        '<field name="NUM">11</field>'+
        '</shadow>'+
        '</value>'+
        '</block>'+
        '<block type="kittenbot_stepperspeed_dual">'+
        '<value name="POSL">'+
        '<shadow type="math_number">'+
        '<field name="NUM">360</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="POSR">'+
        '<shadow type="math_number">'+
        '<field name="NUM">-360</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="SPDL">'+
        '<shadow type="math_number">'+
        '<field name="NUM">11</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="SPDR">'+
        '<shadow type="math_number">'+
        '<field name="NUM">11</field>'+
        '</shadow>'+
        '</value>'+
        '</block>'+ 
        '<block type="kittenbot_rgb">'+
        '<value name="BOARD_PORT_RGB">'+
        '<shadow type="board_port_rgb">'+
        '<field name="BOARD_PORT_RGB">0</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="PIXEL">'+
        '<shadow type="math_number">'+
        '<field name="NUM">0</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="COLOR">'+
        '<shadow type="colour_picker">'+
        '</shadow>'+
        '</value>'+
        '</block>'+
        '<block type="kittenbot_rgb3">'+
        '<value name="BOARD_PORT_RGB">'+
        '<shadow type="board_port_rgb">'+
        '<field name="BOARD_PORT_RGB">0</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="PIXEL">'+
        '<shadow type="math_number">'+
        '<field name="NUM">0</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="R">'+
        '<shadow type="math_number">'+
        '<field name="NUM">0</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="G">'+
        '<shadow type="math_number">'+
        '<field name="NUM">150</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="B">'+
        '<shadow type="math_number">'+
        '<field name="NUM">150</field>'+
        '</shadow>'+
        '</value>'+
        '</block>'+
        '<block type="board_light_sensor">'+
        '<value name="BOARD_PORT">'+
        '<shadow type="board_port">'+
        '<field name="BOARD_PORT">1</field>'+
        '</shadow></value>'+
        '</block>'+
        '<block type="board_temperature_sensor">'+
        '<value name="BOARD_PORT">'+
        '<shadow type="board_port">'+
        '<field name="BOARD_PORT">1</field>'+
        '</shadow></value>'+
        '</block>'+
        '<block type="board_sound_sensor">'+
        '<value name="BOARD_PORT">'+
        '<shadow type="board_port">'+
        '<field name="BOARD_PORT">1</field>'+
        '</shadow></value>'+
        '</block>'+
        '<block type="kittenbot_on_board_button">'+
        '<value name="ON_BOARD_PORT">'+
        '<shadow type="on_board_port">'+
        '<field name="ON_BOARD_PORT">0</field>'+
        '</shadow></value>'+
        '</block>' + 
        /*
        '<block type="kittenbot_ping">'+
        '<value name="TRIGPIN">'+
        '<shadow type="text">'+
        '<field name="TEXT">11</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="ECHOPIN">'+
        '<shadow type="text">'+
        '<field name="TEXT">12</field>'+
        '</shadow>'+
        '</value>'+
        '</block>'+
        '<block type="kittenbot_lcd">' +
        '<value name="TEXT">' +
        '<shadow type="text">' +
        '<field name="TEXT">Hello world!</field>' +
        '</shadow>' +
        '</value>' +
        '</block>' +
        '<block type="kittenbot_digital">' +
        '<value name="DIO">'+
        '<shadow type="text">'+
        '<field name="TEXT">4</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="CLK">'+
        '<shadow type="text">'+
        '<field name="TEXT">7</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="NUM">' +
        '<shadow type="math_number">' +
        '<field name="NUM">1234</field>' +
        '</shadow>' +
        '</value>' +
        '</block>' +
        
        '<block type="kittenbot_infraread">'+
        '<value name="BOARD_PORT">'+
        '<shadow type="board_port">'+
        '<field name="BOARD_PORT">1</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="IR_CODE">'+
        '<shadow type="ir_code">'+
        '<field name="IR_CODE">69</field>'+
        '</shadow>'+
        '</value>'+
        '</block>' +
        
        '<block type="kittenbot_ledattach">' +
        '<value name="DIO">'+
        '<shadow type="text">'+
        '<field name="TEXT">8</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="CLK">'+
        '<shadow type="text">'+
        '<field name="TEXT">11</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="CS">' +
        '<shadow type="text">' +
        '<field name="TEXT">12</field>' +
        '</shadow>' +
        '</value>' +
        '</block>' +
        '<block type="kittenbot_leddraw">' +
        '<value name="COL">'+
        '<shadow type="math_number">'+
        '<field name="NUM">0</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="ROW">'+
        '<shadow type="math_number">'+
        '<field name="NUM">1</field>'+
        '</shadow>'+
        '</value>'+
        '<value name="VAL">' +
        '<shadow type="math_number">' +
        '<field name="NUM">1</field>' +
        '</shadow>' +
        '</value>' +
        '</block>' +
  //      '<block type="kittenbot_servopanel">'+
   //
        '</block>'+
        
        '</category>';
        */