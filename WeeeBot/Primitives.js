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
    util.ioQuery('serial', 'sendMsg', [cmd]);
    console.log("motorDc "+cmd);
}

function weeebot_motor_move(argValues, util) {
    var spd = argValues.SPEED;
    //var cmd = "M201 "+spd;
    var cmd = createCMD(201, spd);
    util.ioQuery('serial', 'sendMsg', [cmd]);
}

function on_board_servo(argValues, util) {
    var port = argValues.BOARD_PORT;
    var angle = argValues.ANGLE;
    //var cmd = "M202 " + port + " " + angle;
    var cmd = createCMD(202, port, angle);
    console.log(cmd);
    util.ioQuery('serial', 'sendMsg', [cmd]);
}

function weeebot_stop(argValues, util) {
    //var cmd = "M102";
    var cmd = createCMD(102);
    util.ioQuery('serial', 'sendMsg', cmd);
}

function weeebot_rgb(argValues, util) {
    var pin = argValues.BOARD_PORT_RGB;
    var pix = argValues.PIXEL;
    var color = argValues.COLOR;
    color = hexToRgb(color);
    //var cmd = "M9 "+pin+" "+pix+" "+color.r+" "+color.g+" "+color.b;
    var cmd = createCMD(9, pin, pix, color.r, color.g, color.b);
    util.ioQuery('serial', 'sendMsg', cmd);
}

function weeebot_rgb3(argValues, util) {
    var pin = argValues.BOARD_PORT_RGB;
    var pix = argValues.PIXEL;
    var r = argValues.R;
    var g = argValues.G;
    var b = argValues.B;
    r = 2.55 * Math.max(0, Math.min(100, r));
    g = 2.55 * Math.max(0, Math.min(100, g));
    b = 2.55 * Math.max(0, Math.min(100, b));
    var cmd = createCMD(9, pin, pix, r, g, b);
    //var cmd = "M9 "+ pin + " " + pix + " " + r + " " + g + " " + b;
    util.ioQuery('serial', 'sendMsg', cmd);
}

function weeebot_distance(argValues, util) {
    var pin = argValues.PINNUM;
    //var cmd = "M110 "+pin;
    var cmd = createCMD(110, pin);
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":("M110 "+pin), "resolve":resolve});
    });
    return exePromise;
}
function board_light_sensor(argValues, util) {
    var port = argValues.BOARD_PORT;
    //var cmd = "M8 " + port;
    var cmd = createCMD(8, port);
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":cmd, "resolve":resolve});
    });
    return exePromise;
}

function board_temperature_sensor(argValues, util) {
    var port = argValues.BOARD_PORT;
    //var cmd = "M12 " + port;
    var cmd = createCMD(12, port);
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":cmd, "resolve":resolve});
    });
    return exePromise;
}
function board_sound_sensor(argValues, util) {
    var port = argValues.BOARD_PORT;
    //var cmd = "M11 " + port;
    var cmd = createCMD(11, port);
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":cmd, "resolve":resolve});
    });
    return exePromise;
}
function weeebot_encoder_move(argValues, util) {
    var port = argValues.MOTOR_PORT;
    var speed = argValues.SPEED;
    var distance = argValues.DISTANCE;
    //var cmd = "M202 " + port + " " + speed + " " + distance;
    var cmd = createCMD(202, port, speed, distance);
    console.log(cmd);
    //util.ioQuery('serial', 'sendMsg', cmd);
}
function weeebot_steppermove(argValues, util) {
    var port = argValues.MOTOR_PORT;
    var speed = argValues.SPEED;
    var distance = argValues.DISTANCE;
    //var cmd = "M203 " + port + " " + speed + " " + distance;
    var cmd = createCMD(203, port, speed, distance);
    console.log(cmd);
    //util.ioQuery('serial', 'sendMsg', cmd);
}
function weeebot_infraread(argValues, util) {
    var port = argValues.BOARD_PORT;
    var code = argValues.IR_CODE;
    //var cmd = "M7 "+ port + " " + code;
    var cmd = createCMD(7, port, code);
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":cmd, "resolve":resolve});
    });
    return exePromise;
}
function weeebot_on_board_button(argValues, util){
    var port = argValues.ON_BOARD_PORT;
    //var cmd = "M0 " + port;
    var cmd = createCMD(0, port);
    console.log(cmd)
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":cmd, "resolve":resolve});
    });
    return exePromise;
}
function test_tone_note(argValues, util){
    var note = argValues.TEST_TONE_NOTE_NOTE_OPTION;
    var hz = argValues.TEST_TONE_NOTE_BEAT_OPTION;
    //var cmd = "M10 "+ note + " " + hz;
    var cmd = createCMD(10, note, hz);
    console.log(cmd)
    util.ioQuery('serial', 'sendMsg', [cmd]);
}
function ultrasonic(argValues, util){
    var port = argValues.SENSOR_PORT;
    var cmd = createCMD(110, port);
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":cmd, "resolve":resolve});
    });
    return exePromise;
}
function ultrasonic_led(argValues, util){
    var port = argValues.SENSOR_PORT;
    var index = argValues.ULTRASONIC_LED_INDEX;
    var color = argValues.COLOR;
    color = hexToRgb(color);
    var cmd = createCMD(109, port, index, color.r, color.g, color.b);
    util.ioQuery('serial', 'sendMsg', cmd);
}
function line_follower(argValues, util){
    var port = argValues.SENSOR_PORT;
    var index = argValues.LINE_FOLLOWER_INDEX;
    var cmd = createCMD(111, port, index);
    var exePromise = new Promise(function(resolve) {
        util.ioQuery('serial', 'sendMsg', cmd);
        util.ioQuery('serial', 'regResolve', {"slot":cmd, "resolve":resolve});
    });
    return exePromise;
}
function weeebot_led_matrix_number(argValues, util){
    var port = argValues.SENSOR_PORT
    var num = argValues.NUM;
    var cmd = createCMD(112, port, num);
    util.ioQuery('serial', 'sendMsg', cmd);
}
function weeebot_led_matrix_time(argValues, util){
    var port = argValues.SENSOR_PORT
    var hour = argValues.HOUR;
    var second = argValues.SECOND;
    var showColon = argValues.SHOW_COLON
    var cmd = createCMD(113, port, hour, second, showColon);
    util.ioQuery('serial', 'sendMsg', cmd);
}
function weeebot_led_matrix_string(argValues, util){
    var port = argValues.SENSOR_PORT
    var x = argValues.X;
    var y = argValues.Y;
    var str = argValues.STR
    var cmd = createCMD(114, port, x, y, str);
    util.ioQuery('serial', 'sendMsg', cmd);
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
        weeebot_led_matrix_string
    };
};