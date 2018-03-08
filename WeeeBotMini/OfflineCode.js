"use strict";

function addInclude(arduino){
    arduino.includes_["weeebotmini"] = "#include <WeELFMini.h>";
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

module.exports = function(){
    const arduino = require("scratch-blocks").Arduino;
	function option_handler(block){
        var order = arduino.ORDER_ATOMIC;
        var code = block.inputList[0].fieldRow[0].value_;
        return [code, order];
    }

	arduino.test_tone_note_note_option = option_handler;
	arduino.test_tone_note_beat_option = option_handler;
	arduino.sound_port = option_handler;
	arduino.weeebot_stepper_option = option_handler;
	arduino.weeebot_dcmotor_option = option_handler;
    arduino.light_port = option_handler;
    arduino.sensor_port = option_handler;
    arduino.board_port_rgb = option_handler;
    arduino.ir_code = option_handler;
    arduino.line_follower_index = option_handler;
    arduino.ultrasonic_led_index = option_handler;
    arduino.move_direction = option_handler;
    arduino.back_led_port = option_handler;
    arduino.on_off = option_handler;

    function gen_rgb_code(block, color, type, prefix, portName) {
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, portName, order);
        var pix = arduino.valueToCode(block, 'PIXEL', order);

        var key = prefix + port;

        arduino.definitions_[key] = `${type} ${key}(${port});`;
        var code = arduino.tab() + `${key}.setColor(${pix}, ${color.r}, ${color.g}, ${color.b})` + arduino.END;
        code += arduino.tab() + `${key}.show()` + arduino.END;
        return code;
    };

    arduino["colour_picker"] = function (block) {
        var order = arduino.ORDER_ATOMIC;
        var code = block.inputList[0].fieldRow[0].colour_;
        return [code, order];
    };
    arduino.weeebot_program = function(block){
        var b = arduino.ORDER_NONE;
        addInclude(arduino);
        return "";
    }
	arduino.test_tone_note = function (block) {
        var b = arduino.ORDER_NONE;
        var note = arduino.valueToCode(block, "TEST_TONE_NOTE_NOTE_OPTION", b);
        var hz = arduino.valueToCode(block, "TEST_TONE_NOTE_BEAT_OPTION", b);

        arduino.definitions_["buzzer"] = "WeBuzzer buzzer(OnBoard_Buzzer);";
        return arduino.tab() + "buzzer.tone(" + note + "," + hz + ")" + arduino.END;
    };
    arduino.on_board_servo = function(block){
        var b = arduino.ORDER_NONE;
        var port = arduino.valueToCode(block, "SENSOR_PORT", b);
        var angle = arduino.valueToCode(block, "ANGLE", b);

        const key = `servo_${port}`;

        arduino.definitions_[key] = `Servo ${key};`;
        arduino.setupCodes_[key] = `${key}.attach(${port});`;
        return arduino.tab() + `${key}.write(${angle})` + arduino.END;
    }
    arduino.board_light_sensor = function(block){
        var b = arduino.ORDER_NONE;
        var pin = arduino.valueToCode(block, "LIGHT_PORT", b);
        arduino.setupCodes_["pin_input_" + pin] = "pinMode(" + pin + ",INPUT);";
        return [`analogRead(${pin})`, b];
    };
    arduino.board_sound_sensor = function(block){
        var b = arduino.ORDER_NONE;
        var pin = arduino.valueToCode(block, "SOUND_PORT", b);
        arduino.setupCodes_["pin_input_" + pin] = "pinMode(" + pin + ",INPUT);";
        return [`analogRead(${pin})`, b];
    };

    arduino.board_temperature_sensor = function(block){
        var b = arduino.ORDER_NONE;
        var port = arduino.valueToCode(block, "BOARD_PORT", b);

        var key = "ts_" + port;
        
        arduino.definitions_[key] = "WeTemperature " + key + ";";
        arduino.setupCodes_[key] = key + ".reset(" + port + ");";
        return [key + ".temperature()", b];
    };

    arduino.weeebot_on_board_button = function(block){
        var b = arduino.ORDER_NONE;
        var pin = arduino.valueToCode(block, "ON_BOARD_PORT", b);
        arduino.setupCodes_["pin_input_" + pin] = "pinMode(" + pin + ",INPUT);";
        return ["!digitalRead(" + pin + ")", b];
    };

    arduino["weeebot_motor_dc"] = function (block) {
        var order = arduino.ORDER_NONE;
        arduino.definitions_["dc"] = "WeDCMotor dc;";
        var index = arduino.valueToCode(block, 'WEEEBOT_DCMOTOR_OPTION', order);
        var spd = arduino.valueToCode(block, 'SPEED', order);

        var code = arduino.tab() + "dc.reset(" + index + ")" + arduino.END;
        code += arduino.tab() + "dc.run(" + spd + ")" + arduino.END;
        return code;
    };

    arduino["weeebot_stop"] = function (block) {
        var order = arduino.ORDER_NONE;
        arduino.definitions_["dc"] = "WeDCMotor dc;";
        return arduino.tab() + `dc.move(1, 0)` + arduino.END;
    };

    arduino["weeebot_motor_move"] = function (block) {
        var order = arduino.ORDER_NONE;
        arduino.definitions_["dc"] = "WeDCMotor dc;";
        var spd = arduino.valueToCode(block, 'SPEED', order);
        var dir = arduino.valueToCode(block, 'MOVE_DIRECTION', order).toString();
        return arduino.tab() + `dc.move(${dir}, ${spd})` + arduino.END;
    };

    arduino["weeebot_rgb"] = function (block) {
        var order = arduino.ORDER_NONE;
        var color = hexToRgb(arduino.valueToCode(block, 'COLOR', order));
        return gen_rgb_code(block, color, "WeRGBLed", "led_", 'SENSOR_PORT');
    };

    arduino["weeebot_rgb3"] = function (block) {
        var order = arduino.ORDER_NONE;
        var color = {
            r: arduino.valueToCode(block, 'R', order),
            g: arduino.valueToCode(block, 'G', order),
            b: arduino.valueToCode(block, 'B', order)
        };
        return gen_rgb_code(block, color, "WeRGBLed", "led_", "SENSOR_PORT");
    };

    arduino["weeebot_rgb_RJ11"] = function (block) {
        var order = arduino.ORDER_NONE;
        var color = hexToRgb(arduino.valueToCode(block, 'COLOR', order));
        return gen_rgb_code(block, color, "WeRGBLED_RJ", "led_RJ11_", 'SENSOR_PORT');
    };

    arduino["weeebot_rgb3_RJ11"] = function (block) {
        var order = arduino.ORDER_NONE;
        var color = {
            r: arduino.valueToCode(block, 'R', order),
            g: arduino.valueToCode(block, 'G', order),
            b: arduino.valueToCode(block, 'B', order)
        };
        return gen_rgb_code(block, color, "WeRGBLED_RJ", "led_RJ11_", 'SENSOR_PORT');
    };

    arduino["weeebot_infraread"] = function (block) {
        var order = arduino.ORDER_HIGH;
        var code = arduino.valueToCode(block, 'IR_CODE', order);

        arduino.definitions_["ir"] = "WeInfraredReceiver ir(OnBoard_IR);";
        arduino.setupCodes_["ir"] = "ir.begin();";
        arduino.updateCodes_["ir"] = "ir.loop();";
        return [`ir.isKeyPressed(${code})`, order];
    };

    arduino["line_follower"] = function (block) {
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        var index = arduino.valueToCode(block, "LINE_FOLLOWER_INDEX", order);

        var key = "lineFollower_" + port;

        arduino.definitions_[key] = "WeLineFollower "+key+"("+port+");";

        
        var code = key + ".startRead("+index+")";
        return [code, order];
    };

    arduino["ultrasonic"] = function (block) {
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, "SENSOR_PORT", order);

        var key = "ultrasonic_" + port;

        arduino.definitions_[key] = `WeUltrasonicSensor ${key}(${port});`;
        
        var code = key + ".distanceCm()";
        return [code, order];
    };

    arduino["ultrasonic_led"] = function (block) {
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        var index = arduino.valueToCode(block, "ULTRASONIC_LED_INDEX", order);
        var color = arduino.valueToCode(block, "COLOR", order);
        color = hexToRgb(color);

        var key = "ultrasonic_" + port;

        arduino.definitions_[key] = `WeUltrasonicSensor ${key}(${port});`;
        return arduino.tab() + `${key}.setColor(${index}, ${color.r}, ${color.g}, ${color.b})`  + arduino.END;
    };


    arduino["weeebot_led_matrix_number"] = function (block) {
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        var num = arduino.valueToCode(block, "NUM", order);

        arduino.definitions_["ledPanel"] = "WeLEDPanelModuleMatrix5_14 ledPanel;";

        var code = arduino.tab() + `ledPanel.reset(${port})`  + arduino.END;
        code +=    arduino.tab() + `ledPanel.showNum(${num})` + arduino.END;
        return code;
    };

    arduino.show_colon = option_handler;
    arduino.led_matrix_data = function (block) {
        var order = arduino.ORDER_ATOMIC;
        var code = block.inputList[0].fieldRow[0].getValue();
        return [code, order];
    };

    arduino["weeebot_led_matrix_time"] = function (block) {
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        var hour = arduino.valueToCode(block, "HOUR", order);
        var second = arduino.valueToCode(block, "SECOND", order);
        var showColon = arduino.valueToCode(block, "SHOW_COLON", order);

        arduino.definitions_["ledPanel"] = "WeLEDPanelModuleMatrix5_14 ledPanel;";

        var code = arduino.tab() + `ledPanel.reset(${port})`  + arduino.END;
        code +=    arduino.tab() + `ledPanel.showClock(${hour}, ${second}, ${showColon})` + arduino.END;
        return code;
    };
    arduino["weeebot_led_matrix_string"] = function (block) {
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        var x = arduino.valueToCode(block, "X", order);
        var y = arduino.valueToCode(block, "Y", order);
        var str = arduino.valueToCode(block, "STR", order);

        arduino.definitions_["ledPanel"] = "WeLEDPanelModuleMatrix5_14 ledPanel;";

        var code = arduino.tab() + `ledPanel.reset(${port})`  + arduino.END;
        code +=    arduino.tab() + `ledPanel.showChar(${x}, ${y}, "${str}")` + arduino.END;
        return code;
    };
    arduino["weeebot_led_matrix_bitmap"] = function (block) {
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        var x = arduino.valueToCode(block, "X", order);
        var y = arduino.valueToCode(block, "Y", order);

        var data = JSON.parse(arduino.valueToCode(block, "LED_MATRIX_DATA", order));
        var bytes = [];

        const w=14, h=5;
        for(var j=0; j<w; ++j){
            bytes[j] = 0;
            for(var i=0; i<h; ++i){
                if(data[i] & (1 << j)){
                    bytes[j] |= 1 << i;
                }
            }
        }

        arduino.definitions_["ledPanel"] = "WeLEDPanelModuleMatrix5_14 ledPanel;";
        arduino.definitions_["ledPanelData"] = "uint8_t ledPanelData[14];";

        var code = arduino.tab() + `ledPanel.reset(${port})`  + arduino.END;
        for(var i=0; i<w; i++){
            code += arduino.tab() + `ledPanelData[${i}] = 0x${bytes[i].toString(16)}` + arduino.END;
        }
        code +=    arduino.tab() + `ledPanel.showBitmap(${x}, ${y}, ledPanelData)` + arduino.END;
        return code;
    };

    function weeebot_led_matrix_pixel(block, method){
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        var x = arduino.valueToCode(block, "X", order);
        var y = arduino.valueToCode(block, "Y", order);

        arduino.definitions_["ledPanel"] = "WeLEDPanelModuleMatrix5_14 ledPanel;";

        var code = arduino.tab() + `ledPanel.reset(${port})`  + arduino.END;
        code +=    arduino.tab() + `ledPanel.${method}(${x}, ${y})` + arduino.END;
        return code;
    }
    arduino["weeebot_led_matrix_pixel_show"] = block => weeebot_led_matrix_pixel(block, "turnOnDot");
    arduino["weeebot_led_matrix_pixel_hide"] = block => weeebot_led_matrix_pixel(block, "turnOffDot");
    arduino["weeebot_led_matrix_clear"] = function(block){
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, "SENSOR_PORT", order);

        arduino.definitions_["ledPanel"] = "WeLEDPanelModuleMatrix5_14 ledPanel;";

        var code = arduino.tab() + `ledPanel.reset(${port})`  + arduino.END;
        code +=    arduino.tab() + `ledPanel.clearScreen()` + arduino.END;
        return code;
    }


    arduino["weeebot_ir_avoid"] = function(block){
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, "SENSOR_PORT", order);

        var key = "IRAvoid_" + port;

        arduino.definitions_[key] = `WeIRAvoidSensor ${key}(${port});`;
        
        var code = key + ".isObstacle()";
        return [code, order];
    }

    arduino["weeebot_single_line_follower"] = function(block){
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, "SENSOR_PORT", order);

        var key = "singleLF_" + port;

        arduino.definitions_[key] = `WeSingleLineFollower ${key}(${port});`;
        
        var code = key + ".read()";
        return [code, order];
    }

    arduino["ir_avoid_led"] = function (block) {
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        var index = arduino.valueToCode(block, "ULTRASONIC_LED_INDEX", order);
        var color = arduino.valueToCode(block, "COLOR", order);
        color = hexToRgb(color);

        var key = "IRAvoid_" + port;
        arduino.definitions_[key] = `WeIRAvoidSensor ${key}(${port});`;
        return arduino.tab() + `${key}.setColor(${index}, ${color.r}, ${color.g}, ${color.b})`  + arduino.END;
    };

    arduino["ir_avoid_led_rgb"] = function (block) {
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        var index = arduino.valueToCode(block, "ULTRASONIC_LED_INDEX", order);
        var color = {
            r: arduino.valueToCode(block, "R", order),
            g: arduino.valueToCode(block, "G", order),
            b: arduino.valueToCode(block, "B", order)
        };

        var key = "IRAvoid_" + port;

        arduino.definitions_[key] = `WeIRAvoidSensor ${key}(${port});`;
        return arduino.tab() + `${key}.setColor(${index}, ${color.r}, ${color.g}, ${color.b})`  + arduino.END;
    };

    arduino["ultrasonic_led_rgb"] = function (block) {
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        var index = arduino.valueToCode(block, "ULTRASONIC_LED_INDEX", order);
        var color = {
            r: arduino.valueToCode(block, "R", order),
            g: arduino.valueToCode(block, "G", order),
            b: arduino.valueToCode(block, "B", order)
        };

        var key = "ultrasonic_" + port;

        arduino.definitions_[key] = `WeUltrasonicSensor ${key}(${port});`;
        return arduino.tab() + `${key}.setColor(${index}, ${color.r}, ${color.g}, ${color.b})`  + arduino.END;
    };
    
    arduino.back_led_light = function(block){
        let order = arduino.ORDER_NONE;
        let pin = arduino.valueToCode(block, "BACK_LED_PORT", order);
        let on  = arduino.valueToCode(block, "ON_OFF", order);
        let key = `back_led_${pin}`;
        arduino.setupCodes_[key] = `pinMode(${pin}, OUTPUT);`;
        return arduino.tab() + `digitalWrite(${pin}, ${on})`  + arduino.END;
    }

    arduino.front_led_light = function(block){
        let order = arduino.ORDER_NONE;
        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        var index = arduino.valueToCode(block, "ULTRASONIC_LED_INDEX", order);
        var on = parseInt(arduino.valueToCode(block, "ON_OFF", order)) ? "ON" : "OFF";
        var key = "IRAvoid_" + port;

        arduino.definitions_[key] = `WeIRAvoidSensor ${key}(${port});`;
        
        var code = "";
        if(index & 1){
            code += arduino.tab() + `${key}.RightLED_${on}()`  + arduino.END;
        }
        if(index & 2){
            code += arduino.tab() + `${key}.LeftLED_${on}()`  + arduino.END;
        }
        return code;
    }

    arduino.humiture_humidity = function(block){
        let order = arduino.ORDER_NONE;
        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        var key = "humiture_" + port;

        arduino.definitions_[key] = `WeHumiture ${key}(${port});`;
        
        let code = `${key}.getHumidity(true)`;
        return [code, order];
    }

    arduino.humiture_temperature = function(block){
        let order = arduino.ORDER_NONE;
        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        var key = "humiture_" + port;

        arduino.definitions_[key] = `WeHumiture ${key}(${port});`;
        
        let code = `${key}.getTemperature(true)`;
        return [code, order];
    }

    arduino.touch = function(block){
        let order = arduino.ORDER_NONE;
        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        var key = "touchSensor_" + port;

        arduino.definitions_[key] = `WeTouchSensor ${key}(${port});`;
        
        let code = `${key}.touched()`;
        return [code, order];
    }

    arduino.soil = function(block){
        let order = arduino.ORDER_NONE;
        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        let code = `analogRead(${port})`;
        return [code, order];
    }

    arduino.segment_display_7 = function(block){
        let order = arduino.ORDER_NONE;
        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        var num = arduino.valueToCode(block, "NUM", order);
        var key = "segmentDisplaySensor_" + port;

        arduino.definitions_[key] = `We7SegmentDisplay ${key}(${port});`;
        
        return arduino.tab() + `${key}.showNumber(${num})` + arduino.END;
    }

    arduino["weeebot_motor_dc_130"] = function(block){
        var order = arduino.ORDER_NONE;

        var index = arduino.valueToCode(block, 'SENSOR_PORT', order);
        var spd = arduino.valueToCode(block, 'SPEED', order);

        let key = `dc_130_${index}`;

        arduino.definitions_[key] = `We130DCMotor ${key}(${index});`;

        let code = arduino.tab() + `${key}.run(${spd})` + arduino.END;
        return code;
    }

    arduino["weeebot_single_led"] = function(block){
        var order = arduino.ORDER_NONE;
        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        var isOn = arduino.valueToCode(block, "ON_OFF", order);

        arduino.setupCodes_["pin_input_" + port] = `pinMode(${port}, OUTPUT);`;
        return arduino.tab() + `digitalWrite(${port}, ${parseInt(isOn) ? "HIGH" : "LOW"})` + arduino.END;
    }

    function createAnalogHandler(type, name){
        arduino[name] = function(block){
            var order = arduino.ORDER_NONE;
            var port = arduino.valueToCode(block, "SENSOR_PORT", order);
            var key = name + "_" + port;
            arduino.definitions_[key] = `${type} ${key}(${port});`;
            var code = key + ".readAnalog()";
            return [code, order];
        };
    }

    createAnalogHandler("WeSlidingPotentiomter", "sliding_potentiometer");
    createAnalogHandler("WeGasSensor", "gas_sensor");
    createAnalogHandler("WePotentiomter", "potentiometer");
    
};