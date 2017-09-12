
function typeNameToTypeID(typeName){
    switch(typeName){
        case "Number":  return 2;
        case "Boolean": return 1;
    }
    return 3;
}

function jsonInitBlock(id, title, args, typeName, color){
    return {init(){
        var params = {};
        params.args0 = [];
        for(var i=0; i<args.length; ++i){
            var arg = {};
            arg.type = "input_value";
            arg.name = args[i];
            params.args0.push(arg);
        }
        params.message0 = title;
        if(typeName){
            params.output = typeName;
            params.outputShape = typeNameToTypeID(typeName);
        }else{
            params.id = id;
            params.previousStatement = null;
            params.nextStatement = null;
        }
        params.inputsInline = true;
        params.colour = color.primary;
        params.colourSecondary = color.secondary;
        params.colourTertiary = color.tertiary;
        this.jsonInit(params);
    }};
}

function jsonInitOption(id, options, typeName, color){
    return {init(){
        var params = {};
        params.args0 = [{
            type: "field_dropdown",
            name: id,
            options: options
        }];
        params.message0 = "%1";
        params.output = typeName;
        params.outputShape = typeNameToTypeID(typeName);
        params.inputsInline = true;
        params.colour = color.primary;
        params.colourSecondary = color.secondary;
        params.colourTertiary = color.tertiary;
        this.jsonInit(params);
    }};
}

function jsonInitEvent(id, title, color){
    return {init(){
        var params = {};
        params.id = id;
        params.message0 = title;
        params.nextStatement = null;
        params.inputsInline = true;
        params.category = "events";
        params.colour = color.primary;
        params.colourSecondary = color.secondary;
        params.colourTertiary = color.tertiary;
        this.jsonInit(params);
    }};
}

module.exports = function (){
    var color = this.color;
    const Blockly = require("scratch-blocks");
    var Translation = Blockly.Msg;
    
    var result = {};
    function regBlock(id, title, args, typeName){
        result[id] = jsonInitBlock(id, title, args, typeName, color);
    }
    function regOption(id, typeName, options){
        result[id] = jsonInitOption(id.toUpperCase(), options, typeName, color);
    }
    function regEvent(id, title){
        result[id] = jsonInitEvent(id, title, color);
    }
    result['led_matrix_data'] = {
  /**
   * Block for colour picker.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_led",
          "name": "LED_MATRIX_DATA",
          "data": "[0,0,0,0,0,0,0]"
        }
      ],
      "outputShape": 4,
      "output": "String"
    });
  }
};
    regEvent("weeebot_program", Translation.WB_PROGRAM_BEGIN);
    regOption("move_direction", "Number", [
        [Translation.WB_Forward, 1],
        [Translation.WB_Backward, 2],
        [Translation.WB_Left, 3],
        [Translation.WB_Right, 4]]);
    regOption("line_follower_index", "Number", [
        ['S1', 1],
        ['S2', 2]]);
    regOption("ultrasonic_led_index", "Number", [
        [Translation.WB_Left, 1],
        [Translation.WB_Right, 2],
        [Translation.WB_Both, 3]]);
    regOption("weeebot_dcmotor_option", "Number", [
        ['M1', 1],
        ['M2', 2]]);
    regOption("motor_port", "Number", [
        [Translation.WB_Port3, 3],
        [Translation.WB_Port4, 4],
        [Translation.WB_Port5, 5],
        [Translation.WB_Port6, 6]]);
    regOption("board_port", "Number", [
        [Translation.WB_Port1, 1],
        [Translation.WB_Port2, 2],
        [Translation.WB_Port3, 3],
        [Translation.WB_Port4, 4],
        [Translation.WB_Port5, 5],
        [Translation.WB_Port6, 6]]);
    regOption("on_board_port", "Number", [
        [Translation.WB_OnBoard,0],
        [Translation.WB_Port1, 1],
        [Translation.WB_Port2, 2],
        [Translation.WB_Port3, 3],
        [Translation.WB_Port4, 4],
        [Translation.WB_Port5, 5],
        [Translation.WB_Port6, 6]]);
    regOption("board_port_rgb", "Number", [
        [Translation.WB_OnBoard,0],
        ["OnBoardGroup",7],
        [Translation.WB_Port1, 1],
        [Translation.WB_Port2, 2],
        [Translation.WB_Port3, 3],
        [Translation.WB_Port4, 4],
        [Translation.WB_Port5, 5],
        [Translation.WB_Port6, 6]]);
    regOption("sensor_port", "Number", [
        [Translation.WB_PortA, 9],
        [Translation.WB_PortB, 10],
        [Translation.WB_PortC, 12],
        [Translation.WB_PortD, 4]]);
    regOption("ir_code", "Number", [
        ["A",69],
        ["B",70],
        ["C",71],
        ["D",68],
        ["E",67],
        ["F",13],
        ["↑",64],
        ["↓",25],
        ["←",7],
        ["→",9],
        ["Setting",21],
        ["R0",22],
        ["R1",12],
        ["R2",24],
        ["R3",94],
        ["R4",8],
        ["R5",28],
        ["R6",90],
        ["R7",66],
        ["R8",82],
        ["R9",74]]);
    regOption("test_tone_note_note_option", "Number", [
        ["B0", 31],["C1", 33],["D1", 37],["E1", 41],["F1", 44],["G1", 49],["A1", 55],["B1", 62],
        ["C2", 65],["D2", 73],["E2", 82],["F2", 87],["G2", 98],["A2", 110],["B2", 123],
        ["C3", 131],["D3", 147],["E3", 165],["F3", 175],["G3", 196],["A3", 220],["B3", 247],
        ["C4", 262],["D4", 294],["E4", 330],["F4", 349],["G4", 392],["A4", 440],["B4", 494],
        ["C5", 523],["D5", 587],["E5", 659],["F5", 698],["G5", 784],["A5", 880],["B5", 988],
        ["C6", 1047],["D6", 1175],["E6", 1319],["F6", 1397],["G6", 1568],["A6", 1760],["B6", 1976],
        ["C7", 2093],["D7", 2349],["E7", 2637],["F7", 2794],["G7", 3136],["A7", 3520],["B7", 3951],
        ["C8", 4186],["D8", 4699]]);
    regOption("test_tone_note_beat_option", "Number", [
        [Translation.WB_TONE_Half,500],
        [Translation.WB_TONE_Quarter,250],
        [Translation.WB_TONE_Eighth,125],
        [Translation.WB_TONE_Whole,1000],
        [Translation.WB_TONE_Double,2000]]);
    regOption("show_colon", "Number", [
        [":",1],
        ["　",0]]);
    regBlock("weeebot_motor_dc",   Translation.WB_DCMOTOR,    ["WEEEBOT_DCMOTOR_OPTION", "SPEED"]);
    regBlock("weeebot_motor_move", Translation.WB_MOTOR_MOVE, ["MOVE_DIRECTION", "SPEED"]);
    regBlock("on_board_servo", Translation.WB_BOARD_SERVO, ["BOARD_PORT", "ANGLE"]);
    regBlock("test_tone_note", Translation.WB_TONE, ["TEST_TONE_NOTE_NOTE_OPTION", "TEST_TONE_NOTE_BEAT_OPTION"]);
    regBlock("weeebot_encoder_move", Translation.WB_ENCODER_MOVE, ["MOTOR_PORT", "SPEED", "DISTANCE"]);
    regBlock("weeebot_steppermove", Translation.WB_STEPPER_MOVE, ["MOTOR_PORT", "SPEED", "DISTANCE"]);
    regBlock("weeebot_stop", Translation.WB_STOP_MOTOR, []);
    regBlock("weeebot_rgb", Translation.WB_RGB1, ["BOARD_PORT_RGB", "PIXEL", "COLOR"]);
    regBlock("weeebot_rgb3", Translation.WB_RGB2, ["BOARD_PORT_RGB", "PIXEL", "R", "G", "B"]);
    regBlock("board_light_sensor", Translation.WB_LIGHT, ["BOARD_PORT"], "Number");
    regBlock("board_temperature_sensor", Translation.WB_TEMPERATURE, ["BOARD_PORT"], "Number");
    regBlock("board_sound_sensor", Translation.WB_SOUND, ["BOARD_PORT"], "Number");
    regBlock("weeebot_on_board_button", Translation.WB_BOARD_BUTTON, ["ON_BOARD_PORT"], "Boolean");
    regBlock("weeebot_infraread", Translation.WB_IR, ["BOARD_PORT", "IR_CODE"], "Boolean");
    regBlock("line_follower", Translation.WB_LINE_FOLLOWER, ["SENSOR_PORT", "LINE_FOLLOWER_INDEX"], "Number");
    regBlock("ultrasonic", Translation.WB_ULTRASONIC, ["SENSOR_PORT"], "Number");
    regBlock("ultrasonic_led", Translation.WB_ULTRASONIC_LED, ["SENSOR_PORT", "ULTRASONIC_LED_INDEX", "COLOR"]);
    regBlock("weeebot_led_matrix_number", Translation.WB_LED_MATRIX_NUMBER, ["SENSOR_PORT", "NUM"]);
    regBlock("weeebot_led_matrix_time", Translation.WB_LED_MATRIX_TIME, ["SENSOR_PORT", "HOUR", "SHOW_COLON", "SECOND"]);
    regBlock("weeebot_led_matrix_string", Translation.WB_LED_MATRIX_STRING, ["SENSOR_PORT", "X", "Y", "STR"]);
    regBlock("weeebot_led_matrix_bitmap", "led show bitmap %1", ["LED_MATRIX_DATA"]);
    return result;
};