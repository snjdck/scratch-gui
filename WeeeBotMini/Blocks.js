
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
          "data": "[0,0,0,0,0]",
          "size": "14x5"
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
        [Translation.WB_Left, 2],
        [Translation.WB_Right, 1],
        [Translation.WB_Both, 3]]);
    regOption("weeebot_dcmotor_option", "Number", [
        ['M1', 1],
        ['M2', 2]]);
    regOption("on_off", "Number", [
        [Translation.ON , 1],
        [Translation.OFF, 0]]);
    regOption("light_port", "Number", [
        [Translation.WB_OnBoard,21],
        [Translation.WB_PortA, 19],
        [Translation.WB_PortB, 18],
        [Translation.WB_PortC, 16],
        [Translation.WB_PortD, 15]]);
    regOption("sound_port", "Number", [
        [Translation.WB_OnBoard,17],
        [Translation.WB_PortA, 19],
        [Translation.WB_PortB, 18],
        [Translation.WB_PortC, 16],
        [Translation.WB_PortD, 15]]);
    regOption("sensor_port", "Number", [
        [Translation.WB_PortA, 19],
        [Translation.WB_PortB, 18],
        [Translation.WB_PortC, 16],
        [Translation.WB_PortD, 15]]);
    regOption("back_led_port", "Number", [
        [Translation.WB_MINI_LEFT_YELLOW, 4],
        [Translation.WB_MINI_LEFT_RED, 3],
        [Translation.WB_MINI_RIGHT_RED, 14],
        [Translation.WB_MINI_RIGHT_YELLOW, 13]]);
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
        ["OK",21],
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
    regOption("on_off", "Number", [
        [Translation.ON , 1],
        [Translation.OFF, 0]]);
    regOption("button_index", "Number", [
        ["1", 1],
        ["2", 2],
        ["3", 3],
        ["4", 4]]);
    regOption("mp3_device_type", "Number", [
        ["FLASH", 4],
        ["TF", 2]]);
    regOption("oled_size", "Number", [
        ["8",  8],
        ["16", 16]]);
    regOption("color_type", "Number", [
        [Translation.COLOUR_LIGHT,0],
        [Translation.COLOUR_RGB_RED,  1],
        [Translation.COLOUR_RGB_GREEN,2],
        [Translation.COLOUR_RGB_BLUE, 3]]);
    regOption("flame_index", "Number", [
        ["1",1],
        ["2",2],
        ["3",3]]);
    regOption("axis2", "Number", [
        [Translation.X_AXIS,0],
        [Translation.Y_AXIS,1]]);
    regOption("axis3", "Number", [
        [Translation.X_AXIS,0],
        [Translation.Y_AXIS,1],
        [Translation.Z_AXIS,2]]);
    regBlock("weeebot_motor_dc",   Translation.WB_DCMOTOR,    ["WEEEBOT_DCMOTOR_OPTION", "SPEED"]);
    regBlock("weeebot_motor_move", Translation.WB_MOTOR_MOVE, ["MOVE_DIRECTION", "SPEED"]);
    regBlock("on_board_servo", Translation.WB_BOARD_SERVO, ["SENSOR_PORT", "ANGLE"]);
    regBlock("test_tone_note", Translation.WB_TONE, ["TEST_TONE_NOTE_NOTE_OPTION", "TEST_TONE_NOTE_BEAT_OPTION"]);
    regBlock("weeebot_stop", Translation.WB_STOP_MOTOR, []);
    regBlock("weeebot_rgb", Translation.WB_RGB1, ["SENSOR_PORT", "PIXEL", "COLOR"]);
    regBlock("weeebot_rgb3", Translation.WB_RGB2, ["SENSOR_PORT", "PIXEL", "R", "G", "B"]);
    regBlock("weeebot_rgb_RJ11",  "RJ11 " + Translation.WB_RGB1, ["SENSOR_PORT", "PIXEL", "COLOR"]);
    regBlock("weeebot_rgb3_RJ11", "RJ11 " + Translation.WB_RGB2, ["SENSOR_PORT", "PIXEL", "R", "G", "B"]);
    regBlock("board_light_sensor", Translation.WB_LIGHT, ["LIGHT_PORT"], "Number");
    regBlock("board_temperature_sensor", Translation.WB_TEMPERATURE, ["SENSOR_PORT"], "Number");
    regBlock("board_sound_sensor", Translation.WB_SOUND, ["SOUND_PORT"], "Number");
    regBlock("weeebot_on_board_button", Translation.WB_BOARD_BUTTON, ["SENSOR_PORT"], "Boolean");
    regBlock("weeebot_infraread", Translation.WB_BOARD_IR_PRESSED, ["IR_CODE"], "Boolean");
    regBlock("line_follower", Translation.WB_LINE_FOLLOWER, ["SENSOR_PORT", "LINE_FOLLOWER_INDEX"], "Number");
    regBlock("ultrasonic", Translation.WB_ULTRASONIC, ["SENSOR_PORT"], "Number");
    regBlock("ultrasonic_led", Translation.WB_ULTRASONIC_LED, ["SENSOR_PORT", "ULTRASONIC_LED_INDEX", "COLOR"]);
    regBlock("ultrasonic_led_rgb", Translation.WB_ULTRASONIC_LED_RGB, ["SENSOR_PORT", "ULTRASONIC_LED_INDEX", "R", "G", "B"]);
    regBlock("ir_avoid_led", Translation.WB_IR_AVOID_LED, ["SENSOR_PORT", "ULTRASONIC_LED_INDEX", "COLOR"]);
    regBlock("ir_avoid_led_rgb", Translation.WB_IR_AVOID_LED_RGB, ["SENSOR_PORT", "ULTRASONIC_LED_INDEX", "R", "G", "B"]);
    regBlock("weeebot_led_matrix_number", Translation.WB_LED_MATRIX_NUMBER, ["SENSOR_PORT", "NUM"]);
    regBlock("weeebot_led_matrix_time", Translation.WB_LED_MATRIX_TIME, ["SENSOR_PORT", "HOUR", "SHOW_COLON", "SECOND"]);
    regBlock("weeebot_led_matrix_string", Translation.WB_LED_MATRIX_STRING, ["SENSOR_PORT", "X", "Y", "STR"]);
    regBlock("weeebot_led_matrix_bitmap", Translation.WB_LED_MATRIX_BITMAP, ["SENSOR_PORT", "X", "Y", "LED_MATRIX_DATA"]);
    regBlock("weeebot_led_matrix_pixel_show", Translation.WB_LED_MATRIX_PIXEL_SHOW, ["SENSOR_PORT", "X", "Y"]);
    regBlock("weeebot_led_matrix_pixel_hide", Translation.WB_LED_MATRIX_PIXEL_HIDE, ["SENSOR_PORT", "X", "Y"]);
    regBlock("weeebot_led_matrix_clear", Translation.WB_LED_MATRIX_CLEAR, ["SENSOR_PORT"]);
    regBlock("weeebot_ir_avoid", Translation.WB_IR_AVOID, ["SENSOR_PORT"], "Boolean");
    regBlock("weeebot_single_line_follower", Translation.WB_SINGLE_LINE_FOLLOWER, ["SENSOR_PORT"], "Number");
    regBlock("back_led_light", Translation.WB_MINI_BACK_LED, ["BACK_LED_PORT", "ON_OFF"]);
    regBlock("front_led_light", Translation.WB_MINI_FRONT_LED, ["SENSOR_PORT", "ULTRASONIC_LED_INDEX", "ON_OFF"]);
    //regBlock("front_led_light", Translation.WB_MINI_FRONT_LED, ["SENSOR_PORT", "ULTRASONIC_LED_INDEX", "ON_OFF"]);

    regBlock("humiture_humidity", Translation.WB_HUMITURE_HUMIDITY, ["SENSOR_PORT"], "Number");
    regBlock("humiture_temperature", Translation.WB_HUMITURE_TEMPERATURE, ["SENSOR_PORT"], "Number");
    regBlock("soil", Translation.WB_SOIL, ["SENSOR_PORT"], "Number");
    regBlock("segment_display_7", Translation.WB_7_SEGMENT_DISPLAY, ["SENSOR_PORT", "NUM"]);

    regBlock("weeebot_motor_dc_130", "5V 130 " + Translation.WB_DCMOTOR, ["SENSOR_PORT", "SPEED"]);
    regBlock("weeebot_single_led", Translation.WB_SINGLE_LED, ["SENSOR_PORT", "ON_OFF"]);
    regBlock("sliding_potentiometer", Translation.WB_SLIDING_POTENTIOMETER, ["SENSOR_PORT"], "Number");
    regBlock("potentiometer", Translation.WB_POTENTIOMETER, ["SENSOR_PORT"], "Number");
    regBlock("gas_sensor", Translation.WB_GAS, ["SENSOR_PORT"], "Number");

    regBlock("seven_segment", Translation.WB_7_SEGMENT_DISPLAY, ["SENSOR_PORT", "NUM"]);
    regBlock("led_button_light", Translation.WB_LED_BUTTON_LIGHT, ["SENSOR_PORT", "BUTTON_INDEX", "ON_OFF"]);
    regBlock("relay", Translation.WB_RELAY, ["SENSOR_PORT", "ON_OFF"]);
    regBlock("water_atomizer", Translation.WB_WATER_ATOMIZER, ["SENSOR_PORT", "ON_OFF"]);
    regBlock("color_sensor_white_balance", Translation.WB_COLOR_SENSOR_WHITE_BALANCE, ["SENSOR_PORT"]);
    regBlock("color_sensor_light", Translation.WB_COLOR_SENSOR_LIGHT, ["SENSOR_PORT", "ON_OFF"]);
    regBlock("mp3_play", Translation.WB_MP3_PLAY, ["SENSOR_PORT"]);
    regBlock("mp3_pause", Translation.WB_MP3_PAUSE, ["SENSOR_PORT"]);
    regBlock("mp3_next_music", Translation.WB_MP3_NEXT_MUSIC, ["SENSOR_PORT"]);
    regBlock("mp3_set_music", Translation.WB_MP3_SET_MUSIC, ["SENSOR_PORT", "NUM"]);
    regBlock("mp3_set_volume", Translation.WB_MP3_SET_VOLUME, ["SENSOR_PORT", "NUM"]);
    regBlock("mp3_set_device", Translation.WB_MP3_SET_DEVICE, ["SENSOR_PORT", "MP3_DEVICE_TYPE"]);
    regBlock("mp3_is_over", Translation.WB_MP3_IS_OVER, ["SENSOR_PORT"], "Boolean");
    regBlock("oled_set_size", Translation.WB_OLED_SET_SIZE, ["SENSOR_PORT", "OLED_SIZE"]);
    regBlock("oled_show_string", Translation.WB_OLED_SHOW_STRING, ["SENSOR_PORT", "X", "Y", "STR"]);
    regBlock("oled_show_number", Translation.WB_OLED_SHOW_NUMBER, ["SENSOR_PORT", "X", "Y", "NUM"]);
    regBlock("oled_clear_screen", Translation.WB_OLED_CLEAR_SCREEN, ["SENSOR_PORT"]);
    regBlock("color_sensor", Translation.WB_COLOR_SENSOR, ["SENSOR_PORT", "COLOR_TYPE"], "Number");
    regBlock("flame_sensor", Translation.WB_FLAME_SENSOR, ["SENSOR_PORT", "FLAME_INDEX"], "Number");
    regBlock("joystick", Translation.WB_JOYSTICK, ["SENSOR_PORT", "AXIS2"], "Number");
    regBlock("compass", Translation.WB_COMPASS, ["SENSOR_PORT", "AXIS3"], "Number");
    regBlock("gyro_gyration", Translation.WB_GYRO_GYRATION, ["SENSOR_PORT", "AXIS3"], "Number");
    regBlock("gyro_acceleration", Translation.WB_GYRO_ACCELERATION, ["SENSOR_PORT", "AXIS3"], "Number");
    regBlock("touch", Translation.WB_TOUCH, ["SENSOR_PORT"], "Boolean");
    regBlock("led_button", Translation.WB_LED_BUTTON, ["SENSOR_PORT", "BUTTON_INDEX"], "Boolean");
    regBlock("pir",  Translation.WB_PIR, ["SENSOR_PORT"], "Boolean");
    regBlock("tilt", Translation.WB_TILT, ["SENSOR_PORT", "LINE_FOLLOWER_INDEX"], "Boolean");
    regBlock("limit_switch", Translation.WB_LIMIT_SWITCH, ["SENSOR_PORT"], "Boolean");

    return result;
};