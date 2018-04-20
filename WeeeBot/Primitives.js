"use strict";

function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function fetchRGB(argValues){
    var r = argValues.R;
    var g = argValues.G;
    var b = argValues.B;
    r = Math.round(Math.max(0, Math.min(255, r)));
    g = Math.round(Math.max(0, Math.min(255, g)));
    b = Math.round(Math.max(0, Math.min(255, b)));
    return {r, g, b};
}

function createCMD(...args){
    return "M" + args.join(" ");
}

function createPromise(util, ...args){
    var cmd = createCMD(...args);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":cmd, "resolve":resolve}]);
    });
}

function weeebot_motor_dc(argValues, util){
    var spd = argValues.SPEED;
    var idx = argValues.WEEEBOT_DCMOTOR_OPTION;
    return createPromise(util, 200, idx, spd);
}

function weeebot_motor_dc_130(argValues, util){
    var spd = argValues.SPEED;
    var idx = argValues.SENSOR_PORT;
    return createPromise(util, 204, idx, spd);
}

function weeebot_motor_move(argValues, util) {
    var spd = argValues.SPEED;
    var dir = argValues.MOVE_DIRECTION;
    var speeds;
    switch(Number(dir)){
    	case 2: speeds = [spd,-spd];break;
    	case 3: speeds = [spd,spd];break;
    	case 4: speeds = [-spd,-spd];break;
    	default:
    		speeds = [-spd,spd];
    }
    return createPromise(util, 201, ...speeds);
}

function on_board_servo(argValues, util) {
    var port = argValues.BOARD_PORT;
    var angle = argValues.ANGLE;
    return createPromise(util, 202, port, angle);
}

function weeebot_stop(argValues, util) {
    return createPromise(util, 102);
}

function weeebot_rgb(argValues, util, msgID=9, portName="BOARD_PORT_RGB") {
    var pin = argValues[portName];
    var pix = argValues.PIXEL;
    var color = argValues.COLOR;
    color = hexToRgb(color);
    return createPromise(util, msgID, pin, pix, color.r, color.g, color.b);
}

function weeebot_rgb3(argValues, util, msgID=9, portName="BOARD_PORT_RGB") {
    var pin = argValues[portName];
    var pix = argValues.PIXEL;
    var color = fetchRGB(argValues);
    return createPromise(util, msgID, pin, pix, color.r, color.g, color.b);
}

function weeebot_rgb_RJ11(argValues, util) {
    return weeebot_rgb(argValues, util, 13, "SENSOR_PORT");
}

function weeebot_rgb3_RJ11(argValues, util) {
    return weeebot_rgb3(argValues, util, 13, "SENSOR_PORT");
}

function board_light_sensor(argValues, util) {
    var port = argValues.BOARD_PORT;
    return createPromise(util, 8, port);
}

function board_temperature_sensor(argValues, util) {
    var port = argValues.BOARD_PORT;
    return createPromise(util, 12, port);
}
function board_sound_sensor(argValues, util) {
    var port = argValues.BOARD_PORT;
    return createPromise(util, 11, port);
}
function weeebot_encoder_move(argValues, util) {
    var port = argValues.MOTOR_PORT;
    var speed = argValues.SPEED;
    var distance = argValues.DISTANCE;
    //var cmd = "M202 " + port + " " + speed + " " + distance;
    var cmd = createCMD(202, port, speed, distance);
    console.log(cmd);
    //util.ioQuery('serial', 'sendMsg', [cmd]);
}
function weeebot_steppermove(argValues, util) {
    var port = argValues.MOTOR_PORT;
    var speed = argValues.SPEED;
    var distance = argValues.DISTANCE;
    //var cmd = "M203 " + port + " " + speed + " " + distance;
    var cmd = createCMD(203, port, speed, distance);
    console.log(cmd);
    //util.ioQuery('serial', 'sendMsg', [cmd]);
}
function weeebot_infraread(argValues, util) {
    var port = argValues.BOARD_PORT;
    var code = argValues.IR_CODE;
    return createPromise(util, 7, port, code);
}
function weeebot_on_board_button(argValues, util){
    var port = argValues.ON_BOARD_PORT;
    return createPromise(util, 0, port);
}
function test_tone_note(argValues, util){
    var note = argValues.TEST_TONE_NOTE_NOTE_OPTION;
    var hz = argValues.TEST_TONE_NOTE_BEAT_OPTION;
    return createPromise(util, 10, note, hz);
}
function ultrasonic(argValues, util){
    var port = argValues.SENSOR_PORT;
    return createPromise(util, 110, port);
}
function ultrasonic_led(argValues, util){
    var port = argValues.SENSOR_PORT;
    var index = argValues.ULTRASONIC_LED_INDEX;
    var color = hexToRgb(argValues.COLOR);
    return createPromise(util, 109, port, index, color.r, color.g, color.b);
}
function ultrasonic_led_rgb(argValues, util){
    var port = argValues.SENSOR_PORT;
    var index = argValues.ULTRASONIC_LED_INDEX;
    var color = fetchRGB(argValues);
    return createPromise(util, 109, port, index, color.r, color.g, color.b);
}
function line_follower(argValues, util){
    var port = argValues.SENSOR_PORT;
    var index = argValues.LINE_FOLLOWER_INDEX;
    return createPromise(util, 111, port, index);
}
function weeebot_led_matrix_number(argValues, util){
    var port = argValues.SENSOR_PORT;
    var num = argValues.NUM;
    return createPromise(util, 112, port, num);
}
function weeebot_led_matrix_time(argValues, util){
    var port = argValues.SENSOR_PORT
    var hour = argValues.HOUR;
    var second = argValues.SECOND;
    var showColon = argValues.SHOW_COLON;
    return createPromise(util, 113, port, hour, second, showColon);
}
function weeebot_led_matrix_string(argValues, util){
    var port = argValues.SENSOR_PORT;
    var x = argValues.X;
    var y = argValues.Y;
    var str = argValues.STR;
    return createPromise(util, 114, port, x, y, str);
}

function weeebot_led_matrix_bitmap(argValues, util){
    var port = argValues.SENSOR_PORT;
    var x = argValues.X;
    var y = argValues.Y;
    var data = JSON.parse(argValues.LED_MATRIX_DATA);
    var bytes = [];
    for(var j=0; j<21; ++j){
        bytes[j] = 0;
        for(var i=0; i<7; ++i){
            if(data[i] & (1 << j)){
                bytes[j] |= 1 << i;
            }
        }
    }
    return createPromise(util, 115, port, x, y, ...bytes);
}

function weeebot_led_matrix_pixel_show(argValues, util){
    var port = argValues.SENSOR_PORT;
    var x = argValues.X;
    var y = argValues.Y;
    return createPromise(util, 1, port, x, y);
}

function weeebot_led_matrix_pixel_hide(argValues, util){
    var port = argValues.SENSOR_PORT;
    var x = argValues.X;
    var y = argValues.Y;
    return createPromise(util, 2, port, x, y);
}

function weeebot_led_matrix_clear(argValues, util){
    var port = argValues.SENSOR_PORT;
    return createPromise(util, 3, port);
}

function weeebot_single_led(argValues, util){
    var port = argValues.SENSOR_PORT;
    var isOn = argValues.ON_OFF;
    return createPromise(util, 125, port, isOn);
}

function sliding_potentiometer(argValues, util){
    var port = argValues.SENSOR_PORT;
    return createPromise(util, 126, port);
}

function gas_sensor(argValues, util){
    var port = argValues.SENSOR_PORT;
    return createPromise(util, 126, port);
}

function potentiometer(argValues, util){
    var port = argValues.SENSOR_PORT;
    return createPromise(util, 126, port);
}

function seven_segment(argValues, util){
    var port = argValues.SENSOR_PORT;
    var num = argValues.NUM;
    return createPromise(util, 123, port, num);
}

function led_button_light(argValues, util){
    var port = argValues.SENSOR_PORT;
    var index = argValues.BUTTON_INDEX;
    var isOn = argValues.ON_OFF;
    return createPromise(util, 15, port, index, isOn);
}

function relay(argValues, util){
    var port = argValues.SENSOR_PORT;
    var isOn = argValues.ON_OFF;
    return createPromise(util, 26, port, isOn);
}

function water_atomizer(argValues, util){
    var port = argValues.SENSOR_PORT;
    var isOn = argValues.ON_OFF;
    return createPromise(util, 27, port, isOn);
}

function color_sensor_white_balance(argValues, util){
    var port = argValues.SENSOR_PORT;
    return createPromise(util, 17, port);
}

function color_sensor_light(argValues, util){
    var port = argValues.SENSOR_PORT;
    var isOn = argValues.ON_OFF;
    return createPromise(util, 18, port, isOn);
}

function mp3_play(argValues, util){
    var port = argValues.SENSOR_PORT;
    return createPromise(util, 33, port);
}

function mp3_pause(argValues, util){
    var port = argValues.SENSOR_PORT;
    return createPromise(util, 32, port);
}

function mp3_next_music(argValues, util){
    var port = argValues.SENSOR_PORT;
    return createPromise(util, 31, port);
}

function mp3_set_music(argValues, util){
    var port = argValues.SENSOR_PORT;
    var num = argValues.NUM;
    return createPromise(util, 28, port, num);
}

function mp3_set_volume(argValues, util){
    var port = argValues.SENSOR_PORT;
    var num = argValues.NUM;
    return createPromise(util, 29, port, num);
}

function mp3_set_device(argValues, util){
    var port = argValues.SENSOR_PORT;
    var num = argValues.MP3_DEVICE_TYPE;
    return createPromise(util, 30, port, num);
}

function mp3_is_over(argValues, util){
    var port = argValues.SENSOR_PORT;
    return createPromise(util, 34, port);
}

function oled_set_size(argValues, util){
    var port = argValues.SENSOR_PORT;
    var size = argValues.OLED_SIZE;
    return createPromise(util, 35, port, size);
}

function oled_show_string(argValues, util){
    var port = argValues.SENSOR_PORT;
    var x = argValues.X;
    var y = argValues.Y;
    var str = argValues.STR;
    return createPromise(util, 37, port, x, y, str);
}

function oled_show_number(argValues, util){
    var port = argValues.SENSOR_PORT;
    var x = argValues.X;
    var y = argValues.Y;
    var num = argValues.NUM;
    return createPromise(util, 36, port, x, y, num);
}

function oled_clear_screen(argValues, util){
    var port = argValues.SENSOR_PORT;
    return createPromise(util, 38, port);
}

function color_sensor(argValues, util){
    var port = argValues.SENSOR_PORT;
    var type = argValues.COLOR_TYPE;
    return createPromise(util, 19, port, type);
}

function flame_sensor(argValues, util){
    var port = argValues.SENSOR_PORT;
    var index = argValues.FLAME_INDEX;
    return createPromise(util, 20, port, index);
}

function joystick(argValues, util){
    var port = argValues.SENSOR_PORT;
    var axis = argValues.AXIS2;
    return createPromise(util, 22, port, axis);
}

function limit_switch(argValues, util){
    var port = argValues.SENSOR_PORT;
    return createPromise(util, 21, port);
}

function compass(argValues, util){
    var port = argValues.SENSOR_PORT;
    var axis = argValues.AXIS3;
    return createPromise(util, 23, port, axis);
}

function gyro_gyration(argValues, util){
    var port = argValues.SENSOR_PORT;
    var axis = argValues.AXIS3;
    return createPromise(util, 24, port, axis);
}

function gyro_acceleration(argValues, util){
    var port = argValues.SENSOR_PORT;
    var axis = argValues.AXIS3;
    return createPromise(util, 24, port, parseInt(axis)+3);
}

function touch(argValues, util){
    var port = argValues.SENSOR_PORT;
    return createPromise(util, 121, port);
}

function led_button(argValues, util){
    var port = argValues.SENSOR_PORT;
    var index = argValues.BUTTON_INDEX;
    return createPromise(util, 14, port, index);
}

function pir(argValues, util){
    var port = argValues.SENSOR_PORT;
    return createPromise(util, 16, port);
}

function tilt(argValues, util){
    var port = argValues.SENSOR_PORT;
    var index = argValues.LINE_FOLLOWER_INDEX;
    return createPromise(util, 25, port, index);
}

function ir_avoid_led(argValues, util){
    var port = argValues.SENSOR_PORT;
    var index = argValues.ULTRASONIC_LED_INDEX;
    var color = hexToRgb(argValues.COLOR);
    return createPromise(util, 118, port, index, color.r, color.g, color.b);
}
function ir_avoid_led_rgb(argValues, util){
    var port = argValues.SENSOR_PORT;
    var index = argValues.ULTRASONIC_LED_INDEX;
    var color = fetchRGB(argValues);
    return createPromise(util, 118, port, index, color.r, color.g, color.b);
}

function weeebot_ir_avoid(argValues, util){
    var port = argValues.SENSOR_PORT;
    return createPromise(util, 117, port);
}

function weeebot_single_line_follower(argValues, util){
    var port = argValues.BOARD_PORT;
    return createPromise(util, 116, port);
}
function soil(argValues, util){
    var pin = argValues.BOARD_PORT;
    return createPromise(util, 124, pin);
}
function humiture_humidity(argValues, util){
    var pin = argValues.SENSOR_PORT;
    return createPromise(util, 122, pin, 1);
}
function humiture_temperature(argValues, util){
    var pin = argValues.SENSOR_PORT;
    return createPromise(util, 122, pin, 0);
}

function led_strip(argValues, util){
    return weeebot_rgb3(argValues, util, 9, "SENSOR_PORT");
}

module.exports = function(){
    return {
        led_strip,
        weeebot_single_line_follower,
        soil,
        humiture_humidity,
        humiture_temperature,
        weeebot_ir_avoid,
        ir_avoid_led,
        ir_avoid_led_rgb,
        weeebot_motor_dc,
        weeebot_motor_dc_130,
        weeebot_motor_move,
        on_board_servo,
        weeebot_stop,
        weeebot_rgb,
        weeebot_rgb3,
        board_light_sensor,
        board_temperature_sensor,
        board_sound_sensor,
        weeebot_encoder_move,
        weeebot_steppermove,
        weeebot_infraread,
        weeebot_on_board_button,
        test_tone_note,
        ultrasonic,
        ultrasonic_led,
        ultrasonic_led_rgb,
        line_follower,
        weeebot_single_led,
        sliding_potentiometer,
        potentiometer,
        gas_sensor,
        weeebot_rgb_RJ11,
        weeebot_rgb3_RJ11,
        weeebot_led_matrix_number,
        weeebot_led_matrix_time,
        weeebot_led_matrix_string,
        weeebot_led_matrix_bitmap,
        weeebot_led_matrix_pixel_show,
        weeebot_led_matrix_pixel_hide,
        weeebot_led_matrix_clear,

        seven_segment,
        led_button_light,
        relay,
        water_atomizer,
		color_sensor_white_balance,
		color_sensor_light,
		mp3_play,
		mp3_pause,
		mp3_next_music,
		mp3_set_music,
		mp3_set_volume,
		mp3_set_device,
		mp3_is_over,
		oled_set_size,
		oled_show_string,
		oled_show_number,
		oled_clear_screen,
		color_sensor,
		flame_sensor,
		joystick,
		limit_switch,
		compass,
		gyro_gyration,
		gyro_acceleration,
		touch,
		led_button,
		pir,
        tilt
    };
};