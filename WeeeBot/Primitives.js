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

function weeebot_motor_dc(argValues, util){
    var spd = argValues.SPEED;
    var idx = argValues.WEEEBOT_DCMOTOR_OPTION;
    //var cmd = "M200 "+idx +" "+spd;
    var cmd = createCMD(200, idx, spd);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":"OK", "resolve":resolve}]);
    });
}

function weeebot_motor_move(argValues, util) {
    var spd = argValues.SPEED;
    var dir = argValues.MOVE_DIRECTION;
    var speeds;
    switch(dir){
    	case 2: speeds = [-spd,-spd];break;
    	case 3: speeds = [-spd,spd];break;
    	case 4: speeds = [spd,-spd];break;
    	default:
    		speeds = [spd,spd];
    }
    var cmd = createCMD(201, ...speeds);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":"OK", "resolve":resolve}]);
    });
}

function on_board_servo(argValues, util) {
    var port = argValues.BOARD_PORT;
    var angle = argValues.ANGLE;
    //var cmd = "M202 " + port + " " + angle;
    var cmd = createCMD(202, port, angle);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":"OK", "resolve":resolve}]);
    });
}

function weeebot_stop(argValues, util) {
    //var cmd = "M102";
    var cmd = createCMD(102);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":"OK", "resolve":resolve}]);
    });
}

function weeebot_rgb(argValues, util) {
    var pin = argValues.BOARD_PORT_RGB;
    var pix = argValues.PIXEL;
    var color = argValues.COLOR;
    color = hexToRgb(color);
    //var cmd = "M9 "+pin+" "+pix+" "+color.r+" "+color.g+" "+color.b;
    var cmd = createCMD(9, pin, pix, color.r, color.g, color.b);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":"OK", "resolve":resolve}]);
    });
}

function weeebot_rgb3(argValues, util) {
    var pin = argValues.BOARD_PORT_RGB;
    var pix = argValues.PIXEL;
    var r = argValues.R;
    var g = argValues.G;
    var b = argValues.B;
    r = Math.round(2.55 * Math.max(0, Math.min(100, r)));
    g = Math.round(2.55 * Math.max(0, Math.min(100, g)));
    b = Math.round(2.55 * Math.max(0, Math.min(100, b)));
    var cmd = createCMD(9, pin, pix, r, g, b);
    //var cmd = "M9 "+ pin + " " + pix + " " + r + " " + g + " " + b;
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":"OK", "resolve":resolve}]);
    });
}

function weeebot_distance(argValues, util) {
    var pin = argValues.PINNUM;
    var cmd = createCMD(110, pin);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":cmd, "resolve":resolve}]);
    });
}
function board_light_sensor(argValues, util) {
    var port = argValues.BOARD_PORT;
    var cmd = createCMD(8, port);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":cmd, "resolve":resolve}]);
    });
}

function board_temperature_sensor(argValues, util) {
    var port = argValues.BOARD_PORT;
    //var cmd = "M12 " + port;
    var cmd = createCMD(12, port);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":cmd, "resolve":resolve}]);
    });
}
function board_sound_sensor(argValues, util) {
    var port = argValues.BOARD_PORT;
    //var cmd = "M11 " + port;
    var cmd = createCMD(11, port);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":cmd, "resolve":resolve}]);
    });
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
    //var cmd = "M7 "+ port + " " + code;
    var cmd = createCMD(7, port, code);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":cmd, "resolve":resolve}]);
    });
}
function weeebot_on_board_button(argValues, util){
    var port = argValues.ON_BOARD_PORT;
    //var cmd = "M0 " + port;
    var cmd = createCMD(0, port);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":cmd, "resolve":resolve}]);
    });
}
function test_tone_note(argValues, util){
    var note = argValues.TEST_TONE_NOTE_NOTE_OPTION;
    var hz = argValues.TEST_TONE_NOTE_BEAT_OPTION;
    //var cmd = "M10 "+ note + " " + hz;
    var cmd = createCMD(10, note, hz);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":"OK", "resolve":resolve}]);
    });
}
function ultrasonic(argValues, util){
    var port = argValues.SENSOR_PORT;
    var cmd = createCMD(110, port);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":cmd, "resolve":resolve}]);
    });
}
function ultrasonic_led(argValues, util){
    var port = argValues.SENSOR_PORT;
    var index = argValues.ULTRASONIC_LED_INDEX;
    var color = argValues.COLOR;
    color = hexToRgb(color);
    var cmd = createCMD(109, port, index, color.r, color.g, color.b);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":"OK", "resolve":resolve}]);
    });
}
function line_follower(argValues, util){
    var port = argValues.SENSOR_PORT;
    var index = argValues.LINE_FOLLOWER_INDEX;
    var cmd = createCMD(111, port, index);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":cmd, "resolve":resolve}]);
    });
}
function weeebot_led_matrix_number(argValues, util){
    var port = argValues.SENSOR_PORT;
    var num = argValues.NUM;
    
    var cmd = createCMD(112, port, num);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":"OK", "resolve":resolve}]);
    });
}
function weeebot_led_matrix_time(argValues, util){
    var port = argValues.SENSOR_PORT
    var hour = argValues.HOUR;
    var second = argValues.SECOND;
    var showColon = argValues.SHOW_COLON
    var cmd = createCMD(113, port, hour, second, showColon);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":"OK", "resolve":resolve}]);
    });
}
function weeebot_led_matrix_string(argValues, util){
    var port = argValues.SENSOR_PORT;
    var x = argValues.X;
    var y = argValues.Y;
    var str = argValues.STR;
    var cmd = createCMD(114, port, x, y, str);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":"OK", "resolve":resolve}]);
    });
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
    
    var cmd = createCMD(115, port, x, y, ...bytes);
    return new Promise(resolve => {
        util.ioQuery('serial', 'sendMsg', [cmd]);
        util.ioQuery('serial', 'regResolve', [{"slot":"OK", "resolve":resolve}]);
    });
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
        weeebot_led_matrix_bitmap
    };
};