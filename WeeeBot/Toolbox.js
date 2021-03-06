
import {newXML, newNumberValue, newTextValue, newDropdownValue, newBlock} from "../WeeeCode/toolbox";
/*
function newXML(tagName, attrbutes, children){
    var result = "<" + tagName;
    if(attrbutes != null){
        for(var key in attrbutes){
            result += ` ${key}="${attrbutes[key]}"`;
        }
    }
    result += ">";
    if(children != null){
        for(var i=0; i<children.length; ++i){
            result += children[i];
        }
    }
    result += `</${tagName}>`;
    return result;
}

function newNumberValue(name, defaultValue){
    return newXML("value", {"name":name}, [
        newXML("shadow", {"type":"math_number"}, [
            newXML("field", {"name":"NUM"}, [defaultValue])
        ])
    ]);
}

function newTextValue(name, defaultValue){
    return newXML("value", {"name":name}, [
        newXML("shadow", {"type":"text"}, [
            newXML("field", {"name":"TEXT"}, [defaultValue])
        ])
    ]);
}

function newDropdownValue(name, defaultValue){
    return newXML("value", {"name":name}, [
        newXML("shadow", {"type":name.toLowerCase()}, [
            newXML("field", {"name":name}, [defaultValue])
        ])
    ]);
}

function newBlock(type, children){
    return newXML("block", {"type":type}, children);
}
*/
//A0 = 14
const SENSOR_PORTS = [0, 9, 10, 12, 4];
const PORTS = [0, 14, 15, 19, 18, 17, 16];

const toolbox = newXML("category", {"name":"WeeeBot", "key":"WeeeBot", "colour":"#FF6680", "secondaryColour":"#FF3355"}, [
        newBlock("weeebot_program"),
        newBlock("weeebot_motor_dc", [
            newDropdownValue("WEEEBOT_DCMOTOR_OPTION", 1),
            newNumberValue("SPEED", 100)
        ]),
        newBlock("weeebot_motor_move", [
            newDropdownValue("MOVE_DIRECTION", 1),
            newNumberValue("SPEED", 120)
        ]),
        newBlock("weeebot_stop"),
        newBlock("weeebot_motor_dc_130", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newNumberValue("SPEED", 0)
        ]),
        /*newBlock("weeebot_steppermove", [
            newDropdownValue("MOTOR_PORT", 3),
            newNumberValue("SPEED", 3000),
            newNumberValue("DISTANCE", 1000)
        ]),
        newBlock("weeebot_encoder_move", [
            newDropdownValue("MOTOR_PORT", 3),
            newNumberValue("SPEED", 100),
            newNumberValue("DISTANCE", 1000)
        ]),*/
        newBlock("on_board_servo", [
            newDropdownValue("BOARD_PORT", PORTS[1]),
            newNumberValue("ANGLE", 90)
        ]),
        newBlock("test_tone_note", [
            newDropdownValue("TEST_TONE_NOTE_NOTE_OPTION", 262),
            newDropdownValue("TEST_TONE_NOTE_BEAT_OPTION", 500)
        ]),
        newBlock("weeebot_rgb", [
            newDropdownValue("BOARD_PORT_RGB", 3),
            newNumberValue("PIXEL", 0),
            newXML("value", {"name":"COLOR"}, [newXML("shadow", {"type":"colour_picker"})])
        ]),
        newBlock("weeebot_rgb3", [
            newDropdownValue("BOARD_PORT_RGB", 3),
            newNumberValue("PIXEL", 0),
            newNumberValue("R", 255),
            newNumberValue("G", 255),
            newNumberValue("B", 255)
        ]),
        newBlock("weeebot_rgb_RJ11", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newNumberValue("PIXEL", 0),
            newXML("value", {"name":"COLOR"}, [newXML("shadow", {"type":"colour_picker"})])
        ]),
        newBlock("weeebot_rgb3_RJ11", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newNumberValue("PIXEL", 0),
            newNumberValue("R", 255),
            newNumberValue("G", 255),
            newNumberValue("B", 255)
        ]),
        newBlock("led_strip", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newNumberValue("PIXEL", 0),
            newNumberValue("R", 255),
            newNumberValue("G", 255),
            newNumberValue("B", 255)
        ]),
        newBlock("weeebot_led_matrix_number", [
            newDropdownValue("SENSOR_PORT", 12),
            newNumberValue("NUM", 100)
        ]),
        newBlock("weeebot_led_matrix_time", [
            newDropdownValue("SENSOR_PORT", 12),
            newNumberValue("HOUR", 12),
            newDropdownValue("SHOW_COLON", 1),
            newNumberValue("SECOND", 34)
        ]),
        newBlock("weeebot_led_matrix_string", [
            newDropdownValue("SENSOR_PORT", 12),
            newNumberValue("X", 0),
            newNumberValue("Y", 0),
            newTextValue("STR", "Hi")
        ]),
        newBlock("weeebot_led_matrix_bitmap", [
            newDropdownValue("SENSOR_PORT", 12),
            newNumberValue("X", 0),
            newNumberValue("Y", 0),
            newXML("value", {"name":"LED_MATRIX_DATA"}, [newXML("shadow", {"type":"led_matrix_data"})])
        ]),
        newBlock("weeebot_led_matrix_pixel_show", [
            newDropdownValue("SENSOR_PORT", 12),
            newNumberValue("X", 0),
            newNumberValue("Y", 0)
        ]),
        newBlock("weeebot_led_matrix_pixel_hide", [
            newDropdownValue("SENSOR_PORT", 12),
            newNumberValue("X", 0),
            newNumberValue("Y", 0)
        ]),
        newBlock("weeebot_led_matrix_clear", [
            newDropdownValue("SENSOR_PORT", 12)
        ]),
        newBlock("ultrasonic_led", [
            newDropdownValue("SENSOR_PORT", 10),
            newDropdownValue("ULTRASONIC_LED_INDEX", 3),
            newXML("value", {"name":"COLOR"}, [newXML("shadow", {"type":"colour_picker"})])
        ]),
        newBlock("ultrasonic_led_rgb", [
            newDropdownValue("SENSOR_PORT", 10),
            newDropdownValue("ULTRASONIC_LED_INDEX", 3),
            newNumberValue("R", 255),
            newNumberValue("G", 255),
            newNumberValue("B", 255)
        ]),
        newBlock("ir_avoid_led", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[2]),
            newDropdownValue("ULTRASONIC_LED_INDEX", 3),
            newXML("value", {"name":"COLOR"}, [newXML("shadow", {"type":"colour_picker"})])
        ]),
        newBlock("ir_avoid_led_rgb", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[2]),
            newDropdownValue("ULTRASONIC_LED_INDEX", 3),
            newNumberValue("R", 255),
            newNumberValue("G", 255),
            newNumberValue("B", 255)
        ]),
        newBlock("weeebot_single_led", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newDropdownValue("ON_OFF", 1)
        ]),
        newBlock("seven_segment", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newNumberValue("NUM", 100)
        ]),
        newBlock("led_button_light", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newDropdownValue("BUTTON_INDEX", 1),
            newDropdownValue("ON_OFF", 1)
        ]),
        newBlock("relay", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newDropdownValue("ON_OFF", 1)
        ]),
        newBlock("water_atomizer", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newDropdownValue("ON_OFF", 1)
        ]),
        newBlock("color_sensor_white_balance", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1])
        ]),
        newBlock("color_sensor_light", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newDropdownValue("ON_OFF", 1)
        ]),
        newBlock("mp3_play", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1])
        ]),
        newBlock("mp3_pause", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1])
        ]),
        newBlock("mp3_next_music", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1])
        ]),
        newBlock("mp3_set_music", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newNumberValue("NUM", 1)
        ]),
        newBlock("mp3_set_volume", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newNumberValue("NUM", 0)
        ]),
        newBlock("mp3_set_device", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newDropdownValue("MP3_DEVICE_TYPE", 4)
        ]),
        newBlock("oled_set_size", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newDropdownValue("OLED_SIZE", 8)
        ]),
        newBlock("oled_show_string", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newNumberValue("X", 0),
            newNumberValue("Y", 0),
            newTextValue("STR", "Hi")
        ]),
        newBlock("oled_show_number", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newNumberValue("X", 0),
            newNumberValue("Y", 0),
            newNumberValue("NUM", 100)
        ]),
        newBlock("oled_clear_screen", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1])
        ]),
        newBlock("line_follower", [
            newDropdownValue("SENSOR_PORT", 9),
            newDropdownValue("LINE_FOLLOWER_INDEX", 1)
        ]),
        newBlock("ultrasonic", [
            newDropdownValue("SENSOR_PORT", 10)
        ]),
        newBlock("board_light_sensor", [
            newDropdownValue("BOARD_PORT", PORTS[1])
        ]),
        newBlock("board_sound_sensor", [
            newDropdownValue("BOARD_PORT", PORTS[3])
        ]),
        newBlock("board_temperature_sensor", [
            newDropdownValue("BOARD_PORT", PORTS[1])
        ]),
        newBlock("weeebot_single_line_follower", [
            newDropdownValue("BOARD_PORT", PORTS[1])
        ]),
        newBlock("humiture_humidity", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1])
        ]),
        newBlock("humiture_temperature", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1])
        ]),
        newBlock("soil", [
            newDropdownValue("BOARD_PORT", PORTS[1])
        ]),
        newBlock("sliding_potentiometer", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1])
        ]),
        newBlock("potentiometer", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1])
        ]),
        newBlock("gas_sensor", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1])
        ]),
        newBlock("color_sensor", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newDropdownValue("COLOR_TYPE", 0)
        ]),
        newBlock("flame_sensor", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newDropdownValue("FLAME_INDEX", 1)
        ]),
        newBlock("joystick", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newDropdownValue("AXIS2", 0)
        ]),
        newBlock("compass", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newDropdownValue("AXIS3", 0)
        ]),
        newBlock("gyro_gyration", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newDropdownValue("AXIS3", 0)
        ]),
        newBlock("gyro_acceleration", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newDropdownValue("AXIS3", 0)
        ]),
        newBlock("weeebot_on_board_button", [
            newDropdownValue("ON_BOARD_PORT", 2)
        ]),
        newBlock("weeebot_infraread", [
            newDropdownValue("BOARD_PORT", PORTS[2]),
            newDropdownValue("IR_CODE", 69)
        ]),
        newBlock("weeebot_ir_avoid", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[2])
        ]),
        newBlock("touch", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1])
        ]),
        newBlock("led_button", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newDropdownValue("BUTTON_INDEX", 1)
        ]),
        newBlock("pir", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1])
        ]),
        newBlock("tilt", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1]),
            newDropdownValue("LINE_FOLLOWER_INDEX", 1)
        ]),
        newBlock("limit_switch", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1])
        ]),
        newBlock("mp3_is_over", [
            newDropdownValue("SENSOR_PORT", SENSOR_PORTS[1])
        ])
    ]);
export default toolbox;