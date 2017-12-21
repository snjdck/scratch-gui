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

function weeebot_motor_move(argValues, util) {
    var spd = argValues.SPEED;
    var dir = argValues.MOVE_DIRECTION;
    var speeds;
    switch(Number(dir)){
    	case 2: speeds = [-spd,-spd];break;
    	case 3: speeds = [-spd,spd];break;
    	case 4: speeds = [spd,-spd];break;
    	default:
    		speeds = [spd,spd];
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

function weeebot_rgb(argValues, util) {
    var pin = argValues.BOARD_PORT_RGB;
    var pix = argValues.PIXEL;
    var color = argValues.COLOR;
    color = hexToRgb(color);
    return createPromise(util, 9, pin, pix, color.r, color.g, color.b);
}

function weeebot_rgb3(argValues, util) {
    var pin = argValues.BOARD_PORT_RGB;
    var pix = argValues.PIXEL;
    var r = argValues.R;
    var g = argValues.G;
    var b = argValues.B;
    r = Math.round(Math.max(0, Math.min(255, r)));
    g = Math.round(Math.max(0, Math.min(255, g)));
    b = Math.round(Math.max(0, Math.min(255, b)));
    return createPromise(util, 9, pin, pix, r, g, b);
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
    var port = 2;
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

function weeebot_ir_avoid(argValues, util){
    var port = argValues.SENSOR_PORT;
    return createPromise(util, 117, port);
}

function weeebot_single_line_follower(argValues, util){
    var port = argValues.SENSOR_PORT;
    return createPromise(util, 116, port);
}
module.exports = function(){
    return {
        weeebot_motor_dc,
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
        line_follower,
        weeebot_led_matrix_number,
        weeebot_led_matrix_time,
        weeebot_led_matrix_string,
        weeebot_led_matrix_bitmap,
        weeebot_led_matrix_pixel_show,
        weeebot_led_matrix_pixel_hide,
        weeebot_led_matrix_clear
    };
};