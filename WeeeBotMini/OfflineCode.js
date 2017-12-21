
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
	arduino.board_port = option_handler;
	arduino.weeebot_stepper_option = option_handler;
	arduino.weeebot_dcmotor_option = option_handler;
    arduino.on_board_port = option_handler;
    arduino.sensor_port = option_handler;
    arduino.board_port_rgb = option_handler;
    arduino.ir_code = option_handler;
    arduino.line_follower_index = option_handler;
    arduino.ultrasonic_led_index = option_handler;
    arduino.move_direction = option_handler;

    function gen_rgb_code(block, color) {
        addInclude(arduino);
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, 'BOARD_PORT_RGB', order);
        var pix = arduino.valueToCode(block, 'PIXEL', order);

        var key = "led_" + port;

        arduino.definitions_[key] = `WeRGBLed ${key};`;
        arduino.setupCodes_[key] = `${key}.reset(${port});`;
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

        addInclude(arduino);
        arduino.definitions_["buzzer"] = "WeBuzzer buzzer(OnBoard_Buzzer);";
        return arduino.tab() + "buzzer.tone(" + note + "," + hz + ")" + arduino.END;
    };
    arduino.on_board_servo = function(block){
        var b = arduino.ORDER_NONE;
        var port = arduino.valueToCode(block, "BOARD_PORT", b);
        var angle = arduino.valueToCode(block, "ANGLE", b);

        const key = `servo_${port}`;

        addInclude(arduino);
        arduino.definitions_[key] = `Servo ${key};`;
        arduino.setupCodes_[key] = `${key}.attach(${port});`;
        return arduino.tab() + `${key}.write(${angle})` + arduino.END;
    }
    arduino.board_light_sensor = function(block){
        var b = arduino.ORDER_NONE;
        var pin = arduino.valueToCode(block, "BOARD_PORT", b);
        arduino.setupCodes_["pin_input_" + pin] = "pinMode(" + pin + ",INPUT);";
        return [`analogRead(${pin})`, b];
    };
    arduino.board_sound_sensor = function(block){
        var b = arduino.ORDER_NONE;
        var pin = arduino.valueToCode(block, "BOARD_PORT", b);
        arduino.setupCodes_["pin_input_" + pin] = "pinMode(" + pin + ",INPUT);";
        return [`analogRead(${pin})`, b];
    };

    arduino.board_temperature_sensor = function(block){
        addInclude(arduino);
        var b = arduino.ORDER_NONE;
        var port = arduino.valueToCode(block, "BOARD_PORT", b);

        var key = "ts_" + port;
        
        arduino.definitions_[key] = "WeTemperature " + key + ";";
        arduino.setupCodes_[key] = key + ".reset(" + port + ");";
        return [key + ".temperature()", b];
    };

    arduino.weeebot_on_board_button = function(block){
        addInclude(arduino);
        var b = arduino.ORDER_NONE;
        var pin = arduino.valueToCode(block, "ON_BOARD_PORT", b);
        arduino.setupCodes_["pin_input_" + pin] = "pinMode(" + pin + ",INPUT);";
        return ["!digitalRead(" + pin + ")", b];
    };

    arduino["weeebot_motor_dc"] = function (block) {
        var order = arduino.ORDER_NONE;
        addInclude(arduino);
        arduino.definitions_["dc"] = "WeDCMotor dc;";
        var index = arduino.valueToCode(block, 'WEEEBOT_DCMOTOR_OPTION', order);
        var spd = arduino.valueToCode(block, 'SPEED', order);

        var code = arduino.tab() + "dc.reset(" + index + ")" + arduino.END;
        code += arduino.tab() + "dc.run(" + spd + ")" + arduino.END;
        return code;
    };

    arduino["weeebot_stop"] = function (block) {
        var order = arduino.ORDER_NONE;
        addInclude(arduino);
        arduino.definitions_["dc"] = "WeDCMotor dc;";

        var code = arduino.tab() + "dc.reset(1)" + arduino.END;
        code += arduino.tab() + "dc.run(0)" + arduino.END;
        code += arduino.tab() + "dc.reset(2)" + arduino.END;
        code += arduino.tab() + "dc.run(0)" + arduino.END;
        return code;
    };

    arduino["weeebot_motor_move"] = function (block) {
        var order = arduino.ORDER_NONE;
        addInclude(arduino);
        arduino.definitions_["dc"] = "WeDCMotor dc;";
        arduino.definitions_["speed"] = "int speed;";

        var spd = arduino.valueToCode(block, 'SPEED', order);
        var dir = arduino.valueToCode(block, 'MOVE_DIRECTION', order).toString();
        var code = arduino.tab() + "speed = " + spd + arduino.END;
        code += arduino.tab() + "dc.reset(2)" + arduino.END;
        code += arduino.tab() + "dc.run(" + ("14".indexOf(dir) >= 0 ? "" : "-")  + "speed)" + arduino.END;
        code += arduino.tab() + "dc.reset(1)" + arduino.END;
        code += arduino.tab() + "dc.run(" + ("13".indexOf(dir) >= 0 ? "" : "-")  + "speed)" + arduino.END;
        return code;
    };

    arduino["weeebot_rgb"] = function (block) {
        var order = arduino.ORDER_NONE;
        var color = hexToRgb(arduino.valueToCode(block, 'COLOR', order));
        return gen_rgb_code(block, color);
    };

    arduino["weeebot_rgb3"] = function (block) {
        var order = arduino.ORDER_NONE;
        var color = {
            r: arduino.valueToCode(block, 'R', order),
            g: arduino.valueToCode(block, 'G', order),
            b: arduino.valueToCode(block, 'B', order)
        };
        return gen_rgb_code(block, color);
    };


/*
    arduino["weeebot_power"] = function (block) {
        var order = arduino.ORDER_HIGH;

        arduino.includes_["weeebot"] = '#include "KittenBot.h"';
        arduino.definitions_["KittenBot"] = "KittenBot KittenBot;";
        var code = "KittenBot.getBatteryVoltage()";
        return [code, order];
    };

    arduino["weeebot_ping"] = function (block) {
        var order = arduino.ORDER_HIGH;
        arduino.includes_["weeebot"] = '#include "KittenBot.h"';
        arduino.definitions_["KittenBot"] = "KittenBot KittenBot;";

        var trig = arduino.valueToCode(block, 'TRIGPIN', order);
        var echo = arduino.valueToCode(block, 'ECHOPIN', order);
        var code = "KittenBot.SR04doPing(" + trig + "," + echo + ")";
        return [code, order];
    };
*/
    arduino["weeebot_infraread"] = function (block) {
        var order = arduino.ORDER_HIGH;
        var code = arduino.valueToCode(block, 'IR_CODE', order);

        addInclude(arduino);
        arduino.definitions_["ir"] = "WeInfraredReceiver ir(OnBoard_IR);";
        arduino.definitions_["ir_v"] = "uint8_t IR_VALUE = 0;"
        arduino.setupCodes_["ir"] = "ir.begin();";
        arduino.updateCodes_["ir"] = "loopIR();";
        arduino.funcDefs_["ir"] = `void loopIR()
{
    static unsigned long timestamp = 0;
    if(ir.decode()){
        timestamp = millis();
        IR_VALUE = (ir.value >> 16) & 0xFF;
    }else if(millis() - timestamp > 200){
        IR_VALUE = 0;
    }
}`;

        var code = "(IR_VALUE == " + code + ")";
        return [code, order]
        /*
        arduino.includes_["IRremote"] = '#include <IRremote.h>';
        arduino.definitions_["IRremote"] = "IRrecv irrecv;";
        arduino.definitions_["IRremote_result"] = "decode_results irResult;";

        var rxpin = arduino.valueToCode(block, 'RXPIN', order);
        arduino.setupCodes_["IRremote_attach"] = "irrecv.attach(" + rxpin + ");";
        arduino.setupCodes_["IRremote_enable"] = "irrecv.enableIRIn();";
        var code = "irrecv.readCode(&irResult)";
        return [code, order];
        */
    };

    arduino["line_follower"] = function (block) {
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        var index = arduino.valueToCode(block, "LINE_FOLLOWER_INDEX", order);

        var key = "lineFollower_" + port;

        addInclude(arduino);
        arduino.definitions_[key] = "WeLineFollower "+key+"("+port+");";

        
        var code = key + ".startRead("+index+")";
        return [code, order];
    };

    arduino["ultrasonic"] = function (block) {
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, "SENSOR_PORT", order);

        var key = "ultrasonic_" + port;

        addInclude(arduino);
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

        addInclude(arduino);
        arduino.definitions_[key] = `WeUltrasonicSensor ${key}(${port});`;
        
        var code = "";
        if(index & 1){
            code += arduino.tab() + `${key}.setColor1(${color.r}, ${color.g}, ${color.b})`  + arduino.END;
        }
        if(index & 2){
             code += arduino.tab() + `${key}.setColor2(${color.r}, ${color.g}, ${color.b})`  + arduino.END;
        }
        code += arduino.tab() + `${key}.RGBShow()` + arduino.END;
        return code;
    };


    arduino["weeebot_led_matrix_number"] = function (block) {
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, "SENSOR_PORT", order);
        var num = arduino.valueToCode(block, "NUM", order);

        addInclude(arduino);
        arduino.definitions_["ledPanel"] = "WeLEDPanelModuleMatrix7_21 ledPanel;";

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

        addInclude(arduino);
        arduino.definitions_["ledPanel"] = "WeLEDPanelModuleMatrix7_21 ledPanel;";

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

        addInclude(arduino);
        arduino.definitions_["ledPanel"] = "WeLEDPanelModuleMatrix7_21 ledPanel;";

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
        for(var j=0; j<21; ++j){
            bytes[j] = 0;
            for(var i=0; i<7; ++i){
                if(data[i] & (1 << j)){
                    bytes[j] |= 1 << i;
                }
            }
        }

        addInclude(arduino);
        arduino.definitions_["ledPanel"] = "WeLEDPanelModuleMatrix7_21 ledPanel;";
        arduino.definitions_["ledPanelData"] = "uint8_t ledPanelData[21];";

        var code = arduino.tab() + `ledPanel.reset(${port})`  + arduino.END;
        for(var i=0; i<21; i++){
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

        addInclude(arduino);
        arduino.definitions_["ledPanel"] = "WeLEDPanelModuleMatrix7_21 ledPanel;";

        var code = arduino.tab() + `ledPanel.reset(${port})`  + arduino.END;
        code +=    arduino.tab() + `ledPanel.${method}(${x}, ${y})` + arduino.END;
        return code;
    }
    arduino["weeebot_led_matrix_pixel_show"] = block => weeebot_led_matrix_pixel(block, "turnOnDot");
    arduino["weeebot_led_matrix_pixel_hide"] = block => weeebot_led_matrix_pixel(block, "turnOffDot");
    arduino["weeebot_led_matrix_clear"] = function(block){
        var order = arduino.ORDER_NONE;

        var port = arduino.valueToCode(block, "SENSOR_PORT", order);

        addInclude(arduino);
        arduino.definitions_["ledPanel"] = "WeLEDPanelModuleMatrix7_21 ledPanel;";

        var code = arduino.tab() + `ledPanel.reset(${port})`  + arduino.END;
        code +=    arduino.tab() + `ledPanel.clearScreen()` + arduino.END;
        return code;
    }
    
/*
    arduino["weeebot_lcd"] = function (block) {
        var order = arduino.ORDER_NONE;
        arduino.includes_["LiquidCrystal_I2C"] = "#include <LiquidCrystal_I2C.h>";
        arduino.definitions_["LiquidCrystal_I2C"] = "LiquidCrystal_I2C lcd(0x3f, 16, 2);";
        arduino.setupCodes_["lcd_init"] = "lcd.begin();";
        arduino.setupCodes_["lcd_backlight"] = "lcd.backlight();";
        var txt = arduino.valueToCode(block, 'TEXT', order);

        if (txt.indexOf("(") > -1) {
            var code = arduino.tab() + "lcd.print(" + txt + ")" + arduino.END;
        } else {
            var code = arduino.tab() + "lcd.print(\"" + txt + "\")" + arduino.END;
        }
        return code;
    };

    arduino["weeebot_ledattach"] = function (block) {
        var order = arduino.ORDER_NONE;
        arduino.includes_["LedControl"] = "#include \"LedControl.h\"";
        arduino.definitions_["LedControl"] = "LedControl lc;";

        var dio = arduino.valueToCode(block, 'DIO', order);
        var clk = arduino.valueToCode(block, 'CLK', order);
        var cs = arduino.valueToCode(block, 'CS', order);

        arduino.setupCodes_["LedControl_attach"] = "lc.attach(" + dio + "," + clk + "," + cs + ",1);";
        arduino.setupCodes_["LedControl_shutdown"] = "lc.shutdown(0,false);";
        arduino.setupCodes_["LedControl_setIntensity"] = "lc.setIntensity(0,8);";
        arduino.setupCodes_["LedControl_clearDisplay"] = "lc.clearDisplay(0);";

        return "";
    };

    arduino["weeebot_leddraw"] = function (block) {
        var order = arduino.ORDER_NONE;
        arduino.includes_["LedControl"] = "#include \"LedControl.h\"";
        arduino.definitions_["LedControl"] = "LedControl lc;";

        var col = arduino.valueToCode(block, 'COL', order);
        var row = arduino.valueToCode(block, 'ROW', order);
        var v = arduino.valueToCode(block, 'VAL', order);

        var code = arduino.tab() + "lc.setLed(0," + row + "," + col + "," + v + ")" + arduino.END;

        return code;
    };
    */
};