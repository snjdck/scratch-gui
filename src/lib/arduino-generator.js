/**
 * Created by Riven on 2016/12/22.
 */
const Blockly = require("scratch-blocks");

Blockly.Arduino=new Blockly.Generator("Arduino");
Blockly.Arduino.addReservedWords("_,void,char");
Blockly.Arduino.ORDER_ATOMIC=0;
Blockly.Arduino.ORDER_HIGH=1;
Blockly.Arduino.ORDER_EXPONENTIATION=2;
Blockly.Arduino.ORDER_UNARY=3;
Blockly.Arduino.ORDER_MULTIPLICATIVE=4;
Blockly.Arduino.ORDER_ADDITIVE=5;
Blockly.Arduino.ORDER_CONCATENATION=6;
Blockly.Arduino.ORDER_RELATIONAL=7;
Blockly.Arduino.ORDER_AND=8;
Blockly.Arduino.ORDER_OR=9;
Blockly.Arduino.ORDER_NONE=99;
Blockly.Arduino.Null=0;
Blockly.Arduino.Setup=1;
Blockly.Arduino.Loop=2;
Blockly.Arduino.INDENT="\t";
Blockly.Arduino.END=";\n";
Blockly.Arduino.Header="#include <Arduino.h>\n";

Blockly.Arduino["motion_movesteps"] = function(block){
    return "";
}
Blockly.Arduino["motion_turnright"] = function(block){
    return "";
}
Blockly.Arduino["motion_turnleft"] = function(block){
    return "";
}
Blockly.Arduino["motion_pointindirection"] = function(block){
    return "";
}
Blockly.Arduino["motion_pointtowards"] = function(block){
    return "";
}
Blockly.Arduino["motion_gotoxy"] = function(block){
    return "";
}
Blockly.Arduino["motion_goto"] = function(block){
    return "";
}
Blockly.Arduino["motion_glidesecstoxy"] = function(block){
    return "";
}
Blockly.Arduino["motion_glideto"] = function(block){
    return "";
}
Blockly.Arduino["motion_changexby"] = function(block){
    return "";
}
Blockly.Arduino["motion_setx"] = function(block){
    return "";
}
Blockly.Arduino["motion_changeyby"] = function(block){
    return "";
}
Blockly.Arduino["motion_sety"] = function(block){
    return "";
}
Blockly.Arduino["motion_ifonedgebounce"] = function(block){
    return "";
}
Blockly.Arduino["motion_setrotationstyle"] = function(block){
    return "";
}
Blockly.Arduino["motion_xposition"] = function(block){
    return "";
}
Blockly.Arduino["motion_yposition"] = function(block){
    return "";
}
Blockly.Arduino["motion_direction"] = function(block){
    return "";
}
Blockly.Arduino["looks_sayforsecs"] = function(block){
    return "";
}
Blockly.Arduino["looks_say"] = function(block){
    return "";
}
Blockly.Arduino["looks_thinkforsecs"] = function(block){
    return "";
}
Blockly.Arduino["looks_think"] = function(block){
    return "";
}
Blockly.Arduino["looks_show"] = function(block){
    return "";
}
Blockly.Arduino["looks_hide"] = function(block){
    return "";
}
Blockly.Arduino["looks_switchcostumeto"] = function(block){
    return "";
}
Blockly.Arduino["looks_nextcostume"] = function(block){
    return "";
}
Blockly.Arduino["looks_nextbackdrop"] = function(block){
    return "";
}
Blockly.Arduino["looks_switchbackdropto"] = function(block){
    return "";
}
Blockly.Arduino["looks_switchbackdroptoandwait"] = function(block){
    return "";
}
Blockly.Arduino["looks_changeeffectby"] = function(block){
    return "";
}
Blockly.Arduino["looks_seteffectto"] = function(block){
    return "";
}
Blockly.Arduino["looks_cleargraphiceffects"] = function(block){
    return "";
}
Blockly.Arduino["looks_changesizeby"] = function(block){
    return "";
}
Blockly.Arduino["looks_setsizeto"] = function(block){
    return "";
}
Blockly.Arduino["looks_gotofront"] = function(block){
    return "";
}
Blockly.Arduino["looks_gobacklayers"] = function(block){
    return "";
}
Blockly.Arduino["looks_costumeorder"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["looks_backdroporder"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["looks_backdropname"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["looks_size"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["sound_play"] = function(block){
    return "";
}
Blockly.Arduino["sound_playuntildone"] = function(block){
    return "";
}
Blockly.Arduino["sound_stopallsounds"] = function(block){
    return "";
}
Blockly.Arduino["sound_playdrumforbeats"] = function(block){
    return "";
}
Blockly.Arduino["sound_restforbeats"] = function(block){
    return "";
}
Blockly.Arduino["sound_playnoteforbeats"] = function(block){
    return "";
}
Blockly.Arduino["sound_setinstrumentto"] = function(block){
    return "";
}
Blockly.Arduino["sound_changeeffectby"] = function(block){
    return "";
}
Blockly.Arduino["sound_seteffectto"] = function(block){
    return "";
}
Blockly.Arduino["sound_cleareffects"] = function(block){
    return "";
}
Blockly.Arduino["sound_changevolumeby"] = function(block){
    return "";
}
Blockly.Arduino["sound_setvolumeto"] = function(block){
    return "";
}
Blockly.Arduino["sound_volume"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["sound_changetempoby"] = function(block){
    return "";
}
Blockly.Arduino["sound_settempotobpm"] = function(block){
    return "";
}
Blockly.Arduino["sound_tempo"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["event_whenflagclicked"] = function(block){
    return "";
}
Blockly.Arduino["event_whenkeypressed"] = function(block){
    return "";
}
Blockly.Arduino["event_whenthisspriteclicked"] = function(block){
    return "";
}
Blockly.Arduino["event_whenbackdropswitchesto"] = function(block){
    return "";
}
Blockly.Arduino["event_whengreaterthan"] = function(block){
    return "";
}
Blockly.Arduino["event_whenbroadcastreceived"] = function(block){
    return "";
}
Blockly.Arduino["event_broadcast"] = function(block){
    return "";
}
Blockly.Arduino["event_broadcastandwait"] = function(block){
    return "";
}
Blockly.Arduino["control_wait"] = function(block){
}
Blockly.Arduino["control_repeat"] = function(block){
}
Blockly.Arduino["control_forever"] = function(block){
}
Blockly.Arduino["control_if"] = function(block){
}
Blockly.Arduino["control_if_else"] = function(block){
}
Blockly.Arduino["control_wait_until"] = function(block){
	var condition = Blockly.Arduino.valueToCode(block, "CONDITION", Blockly.Arduino.ORDER_NONE);
	var code = condition ? `while(!(${condition}))` : "while(0)";
	return Blockly.Arduino.tab() + code + Blockly.Arduino.END;
}
Blockly.Arduino["control_repeat_until"] = function(block){
	var condition = Blockly.Arduino.valueToCode(block, "CONDITION", Blockly.Arduino.ORDER_NONE);
	var code = condition ? `while(!(${condition}))` : "while(0)";
	var case1 = Blockly.Arduino.statementToCode(block, "SUBSTACK");
	case1 = Blockly.Arduino.addLoopTrap(case1, block.id);
	return Blockly.Arduino.tab() + code + "{\n"
	+ case1
	+ Blockly.Arduino.tab() + "}\n";
}
Blockly.Arduino["control_stop"] = function(block){
    return "";
}
Blockly.Arduino["control_start_as_clone"] = function(block){
    return "";
}
Blockly.Arduino["control_create_clone_of"] = function(block){
    return "";
}
Blockly.Arduino["control_delete_this_clone"] = function(block){
    return "";
}
Blockly.Arduino["sensing_touchingobject"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["sensing_touchingcolor"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["sensing_coloristouchingcolor"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["sensing_distanceto"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["sensing_keypressed"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["sensing_mousedown"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["sensing_mousex"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["sensing_mousey"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["sensing_loudness"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["sensing_timer"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["sensing_resettimer"] = function(block){
    return "";
}
Blockly.Arduino["sensing_of"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["sensing_current"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["sensing_dayssince2000"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["pen_clear"] = function(block){
    return "";
}
Blockly.Arduino["pen_stamp"] = function(block){
    return "";
}
Blockly.Arduino["pen_pendown"] = function(block){
    return "";
}
Blockly.Arduino["pen_penup"] = function(block){
    return "";
}
Blockly.Arduino["pen_setpencolortocolor"] = function(block){
    return "";
}
Blockly.Arduino["pen_changepencolorby"] = function(block){
    return "";
}
Blockly.Arduino["pen_setpencolortonum"] = function(block){
    return "";
}
Blockly.Arduino["pen_changepenshadeby"] = function(block){
    return "";
}
Blockly.Arduino["pen_setpenshadeto"] = function(block){
    return "";
}
Blockly.Arduino["pen_changepensizeby"] = function(block){
    return "";
}
Blockly.Arduino["pen_setpensizeto"] = function(block){
    return "";
}
Blockly.Arduino["operator_add"] = function(block){
}
Blockly.Arduino["operator_subtract"] = function(block){
}
Blockly.Arduino["operator_multiply"] = function(block){
}
Blockly.Arduino["operator_divide"] = function(block){
}
Blockly.Arduino["operator_random"] = function(block){
}
Blockly.Arduino["operator_lt"] = function(block){
}
Blockly.Arduino["operator_equals"] = function(block){
}
Blockly.Arduino["operator_gt"] = function(block){
}
Blockly.Arduino["operator_and"] = function(block){
	var order = Blockly.Arduino.ORDER_HIGH;
	var a=Blockly.Arduino.valueToCode(block,"OPERAND1", order) || "0";
	var b=Blockly.Arduino.valueToCode(block,"OPERAND2", order) || "0";
	return [`${a} && ${b}`, Blockly.Arduino.ORDER_AND];
}
Blockly.Arduino["operator_or"] = function(block){
	var order = Blockly.Arduino.ORDER_HIGH;
	var a=Blockly.Arduino.valueToCode(block,"OPERAND1", order) || "0";
	var b=Blockly.Arduino.valueToCode(block,"OPERAND2", order) || "0";
	return [`${a} || ${b}`, Blockly.Arduino.ORDER_OR];
}
Blockly.Arduino["operator_not"] = function(block){
	var order = Blockly.Arduino.ORDER_HIGH;
	var a=Blockly.Arduino.valueToCode(block,"OPERAND", order) || "0";
	return [`!${a}`, Blockly.Arduino.ORDER_UNARY];
}
Blockly.Arduino["operator_join"] = function(block){
	return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["operator_letter_of"] = function(block){
	return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["operator_length"] = function(block){
	return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["operator_contains"] = function(block){
	return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["operator_mod"] = function(block){
	var order = Blockly.Arduino.ORDER_HIGH;
	var a=Blockly.Arduino.valueToCode(block,"NUM1", order) || "0";
	var b=Blockly.Arduino.valueToCode(block,"NUM2", order) || "0";
	return [`fmod(${a}, ${b})`, Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["operator_round"] = function(block){
	var order = Blockly.Arduino.ORDER_HIGH;
	var a=Blockly.Arduino.valueToCode(block,"NUM", order) || "0";
	return [`round(${a})`, Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["operator_mathop"] = function(block){
}
Blockly.Arduino["data_listcontents"] = function(block){
    return "";
}
Blockly.Arduino["data_addtolist"] = function(block){
    return "";
}
Blockly.Arduino["data_deleteoflist"] = function(block){
    return "";
}
Blockly.Arduino["data_insertatlist"] = function(block){
    return "";
}
Blockly.Arduino["data_replaceitemoflist"] = function(block){
    return "";
}
Blockly.Arduino["data_itemoflist"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["data_lengthoflist"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["data_listcontainsitem"] = function(block){
    return ["0", Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino["data_showlist"] = function(block){
    return "";
}
Blockly.Arduino["data_hidelist"] = function(block){
    return "";
}

Blockly.Arduino.init=function(workspace){
	Blockly.Arduino.definitions_=Object.create(null);
	Blockly.Arduino.includes_=Object.create(null);
	Blockly.Arduino.setupCodes_ = Object.create(null);
	Blockly.Arduino.codeStage=Blockly.Arduino.Setup;
	Blockly.Arduino.tabPos=1;
	if(Blockly.Arduino.variableDB_){
		Blockly.Arduino.variableDB_.reset();
	}else{
		Blockly.Arduino.variableDB_ = new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_);
	}
	for(var v of workspace.variableMap_.getAllVariables()){
		Blockly.Arduino.definitions_[v] = `float ${v.name};`;
	}
	/*
	var variables = workspace.variableList;
	for (var i = 0; i < variables.length; i++) {
		var v = variables[i];
		Blockly.Arduino.definitions_[v] = `float ${v};`;
	}
	*/
};
Blockly.Arduino.finish = function (code) {
    // Convert the definitions dictionary into a list.
    var definitions = [];
    for (var name in Blockly.Arduino.definitions_) {
        definitions.push(Blockly.Arduino.definitions_[name]);
    }
    // add including
    var including = [];
    for (var name in Blockly.Arduino.includes_) {
        including.push(Blockly.Arduino.includes_[name]);
    }

    // add instance setup
    var setuping = [];
    for (var name in Blockly.Arduino.setupCodes_) {
        setuping.push(Blockly.Arduino.setupCodes_[name]);
    }

    var ret = Blockly.Arduino.Header;
    ret += including.join('\r\n');
    ret += "\r\n";
    ret += definitions.join('\r\n');
    ret += "\r\n\r\n";
    ret += "void setup(){\n\t";
    ret += setuping.join('\r\n\t');
    ret += "\r\n";
    ret += code;
    ret += "\n}\n";
    // add redundant loop
    if (Blockly.Arduino.codeStage == Blockly.Arduino.Setup) {
        ret += "\nvoid loop(){\r\n}\n";
    }

    // Clean up temporary data.
    delete Blockly.Arduino.definitions_;
    delete Blockly.Arduino.includes_;
    delete Blockly.Arduino.setupCodes_;
    delete Blockly.Arduino.codeStage;
    delete Blockly.Arduino.ir_enabled;
    Blockly.Arduino.variableDB_.reset();

    return ret;
};
Blockly.Arduino.scrub_=function(a,b){
	return b + Blockly.Arduino.blockToCode(a.nextConnection && a.nextConnection.targetBlock());
};
Blockly.Arduino.scrubNakedValue=function(a){
	return a + "\n"
};
Blockly.Arduino.quote_=function(a){
	return a=a.replace(/\\/g,"\\\\").replace(/\n/g,"\\\n").replace(/\%/g,"\\%").replace(/'/g,"\\'")
};
Blockly.Arduino.tab=function(){
	return Blockly.Arduino.INDENT.repeat(Blockly.Arduino.tabPos)
};
Blockly.Arduino.arduino={};
Blockly.Arduino.arduino_pin_mode=function(block){
	var b=Blockly.Arduino.ORDER_NONE;
	var pin =Blockly.Arduino.valueToCode(block,"PINNUM",b);
	var mode=Blockly.Arduino.valueToCode(block,"ARDUINO_PIN_MODE_OPTION",b);
	return Blockly.Arduino.tab()+`pinMode(${pin}, ${mode})`+Blockly.Arduino.END
};
Blockly.Arduino.arduino_pwm_write=function(a){
	var b=Blockly.Arduino.ORDER_NONE,
	c=Blockly.Arduino.valueToCode(a,"ARDUINO_PWM_OPTION",b);
	a=Blockly.Arduino.valueToCode(a,"PWM",b);
	return Blockly.Arduino.tab()+"analogWrite("+c+","+a+")"+Blockly.Arduino.END
};
Blockly.Arduino.arduino_digital_write=function(a){
	var b=Blockly.Arduino.ORDER_NONE,
	c=Blockly.Arduino.valueToCode(a,"PINNUM",b);
	a=Blockly.Arduino.valueToCode(a,"ARDUINO_LEVEL_OPTION",b);
	return Blockly.Arduino.tab()+"digitalWrite("+c+","+a+")"+Blockly.Arduino.END
};
Blockly.Arduino.arduino_digital_read=function(a){
	var b=Blockly.Arduino.ORDER_NONE;
	return["digitalRead("+Blockly.Arduino.valueToCode(a,"PINNUM",b)+")",b]
};
Blockly.Arduino.arduino_analog_read=function(a){
	var b=Blockly.Arduino.ORDER_NONE;
	return["analogRead("+Blockly.Arduino.valueToCode(a,"PINNUM",b)+")",b]
};
Blockly.Arduino.arduino_map=function(a){
	var b=Blockly.Arduino.ORDER_NONE,
	c=Blockly.Arduino.valueToCode(a,"VAL",b),
	d=Blockly.Arduino.valueToCode(a,"FROMLOW",b),
	e=Blockly.Arduino.valueToCode(a,"FROMHIGH",b),
	f=Blockly.Arduino.valueToCode(a,"TOLOW",b);
	a=Blockly.Arduino.valueToCode(a,"TOHIGH",b);
	return["map("+c+","+d+","+e+","+f+","+a+")",b]
};
Blockly.Arduino.arduino_tone=function(a){
	var b=Blockly.Arduino.ORDER_NONE,
	c=Blockly.Arduino.valueToCode(a,"PINNUM",b),
	d=Blockly.Arduino.valueToCode(a,"FREQUENCY",b);
	a=Blockly.Arduino.valueToCode(a,"DURATION",b);
	return Blockly.Arduino.tab()+"tone("+c+","+d+","+a+")"+Blockly.Arduino.END
};
Blockly.Arduino.arduino_servo=function(a){
	var b=Blockly.Arduino.ORDER_NONE;
	Blockly.Arduino.includes_.servo="#include <Servo.h>";
	Blockly.Arduino.definitions_.servo="Servo servo;";
	var c=Blockly.Arduino.valueToCode(a,"PINNUM",b);
	a=Blockly.Arduino.valueToCode(a,"ANGLE",b);
	c=Blockly.Arduino.tab()+"servo.attach("+c+")"+Blockly.Arduino.END;
	return c+=Blockly.Arduino.tab()+"servo.write("+a+")"+Blockly.Arduino.END
};
Blockly.Arduino.arduino_menu_option=function(a){
	return[a.inputList[0].fieldRow[0].value_, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.arduino_println=function(a){
	a=Blockly.Arduino.valueToCode(a,"TEXT",Blockly.Arduino.ORDER_NONE);
	return -1<a.indexOf("(")?Blockly.Arduino.tab()+"Serial.println("+a+")"+Blockly.Arduino.END:Blockly.Arduino.tab()+'Serial.println("'+a+'")'+Blockly.Arduino.END
};
Blockly.Arduino.arduino_pin_mode_option=Blockly.Arduino.arduino_menu_option;
Blockly.Arduino.arduino_pwm_option=Blockly.Arduino.arduino_menu_option;
Blockly.Arduino.arduino_level_option=Blockly.Arduino.arduino_menu_option;
Blockly.Arduino.arduino_analog_in_option=Blockly.Arduino.arduino_menu_option;
Blockly.Arduino.control={};
Blockly.Arduino.control_wait=function(a){
	a=Blockly.Arduino.valueToCode(a,"DURATION",Blockly.Arduino.ORDER_HIGH)+"*1000";
	return Blockly.Arduino.tab()+"delay("+a+")"+Blockly.Arduino.END
};
Blockly.Arduino.control_repeat=function(a){
	var b=Blockly.Arduino.valueToCode(a,"TIMES",Blockly.Arduino.ORDER_HIGH),
	c=Blockly.Arduino.statementToCode(a,"SUBSTACK"),
	c=Blockly.Arduino.addLoopTrap(c,a.id);
	a=Blockly.Arduino.tab()+"for(int i=0;i<"+b+";i++){\n";
	//Blockly.Arduino.tabPos++;
	//Blockly.Arduino.tabPos--;
	return a+c+(Blockly.Arduino.tab()+"}\n")
};
Blockly.Arduino['control_forever'] = function (block) {
    // if first forever, treat it as loop
    var code;
    if (Blockly.Arduino.codeStage != Blockly.Arduino.Loop) {
        Blockly.Arduino.codeStage = Blockly.Arduino.Loop;
        Blockly.Arduino.tabPos = 0;
        //var order = Blockly.Arduino.ORDER_HIGH;
        var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
        branch = Blockly.Arduino.addLoopTrap(branch, block.id);
        code = "\n}\n"; // finish up setup
        code += "\nvoid loop(){\n";
        code += branch;
    } else {
        code = Blockly.Arduino.tab() + "while(1){\n";
        Blockly.Arduino.tabPos++;
        var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
        branch = Blockly.Arduino.addLoopTrap(branch, block.id);
        code += branch;
        Blockly.Arduino.tabPos--;
        code += Blockly.Arduino.tab() + "}\n";
    }
    return code;
};
Blockly.Arduino.control_if=function(block){
	var condition = Blockly.Arduino.valueToCode(block, "CONDITION",Blockly.Arduino.ORDER_NONE) || "false";
	var case1 = Blockly.Arduino.statementToCode(block,"SUBSTACK");
	case1 = Blockly.Arduino.addLoopTrap(case1, block.id);
	return Blockly.Arduino.tab() + "if(" + condition + "){\n"
    + case1
    + Blockly.Arduino.tab() + "}\n";
};
Blockly.Arduino.control_if_else=function(block){
	var condition = Blockly.Arduino.valueToCode(block, "CONDITION",Blockly.Arduino.ORDER_NONE) || "false";
	var case1 = Blockly.Arduino.statementToCode(block,"SUBSTACK");
	case1=Blockly.Arduino.addLoopTrap(case1, block.id);
	var case2 = Blockly.Arduino.statementToCode(block,"SUBSTACK2");
	case2=Blockly.Arduino.addLoopTrap(case2, block.id);
	return Blockly.Arduino.tab() + "if(" + condition + "){\n"
	+ case1 + Blockly.Arduino.tab() + "}else{\n"
    + case2 + Blockly.Arduino.tab() + "}\n";
};
Blockly.Arduino.looks_say=function(a){
	a=Blockly.Arduino.valueToCode(a,"MESSAGE",Blockly.Arduino.ORDER_ATOMIC);
	return Blockly.Arduino.tab()+"Serial.println(String('"+a+"'));\n"
};
Blockly.Arduino.event={};
Blockly.Arduino.event_whenflagclicked=function(a){
	return""
};
Blockly.Arduino.operator={};
Blockly.Arduino.math_number=function(a){
	return[parseFloat(a.getFieldValue("NUM")),Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.text=function(a){
	return[Blockly.Arduino.quote_(a.getFieldValue("TEXT")),Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.operator_random=function(a){
	var b=Blockly.Arduino.valueToCode(a,"FROM",Blockly.Arduino.ORDER_HIGH)||"0";
	a=Blockly.Arduino.valueToCode(a,"TO",Blockly.Arduino.ORDER_HIGH)||"0";
	return["random("+b+","+a+"+1)",Blockly.Arduino.ORDER_HIGH]
};
Blockly.Arduino.operator_compare=function(a){
	var b=Blockly.Arduino.valueToCode(a,"OPERAND1",Blockly.Arduino.ORDER_HIGH)||"0",
	    c=Blockly.Arduino.valueToCode(a,"OPERAND2",Blockly.Arduino.ORDER_HIGH)||"0";
	return[b+{operator_gt:">",operator_equals:"==",operator_lt:"<"}[a.type]+c,Blockly.Arduino.ORDER_RELATIONAL]
};
Blockly.Arduino.operator_arithmetic=function(a){
	var b=Blockly.Arduino.valueToCode(a,"NUM1",Blockly.Arduino.ORDER_HIGH)||"0",
	    c=Blockly.Arduino.valueToCode(a,"NUM2",Blockly.Arduino.ORDER_HIGH)||"0",
	    d=Blockly.Arduino.ORDER_ADDITIVE;
	"operator_multiply"!=a.type&&"operator_divide"!=a.type||--d;
	return[b+{operator_add:"+",operator_subtract:"-",operator_multiply:"*",operator_divide:"/"}[a.type]+c,d]
};
Blockly.Arduino.operator_add=Blockly.Arduino.operator_arithmetic;
Blockly.Arduino.operator_subtract=Blockly.Arduino.operator_arithmetic;
Blockly.Arduino.operator_multiply=Blockly.Arduino.operator_arithmetic;
Blockly.Arduino.operator_divide=Blockly.Arduino.operator_arithmetic;
Blockly.Arduino.operator_gt=Blockly.Arduino.operator_compare;
Blockly.Arduino.operator_equals=Blockly.Arduino.operator_compare;
Blockly.Arduino.operator_lt=Blockly.Arduino.operator_compare;
Blockly.Arduino.math_angle=Blockly.Arduino.math_number;
Blockly.Arduino.math_positive_number=Blockly.Arduino.math_number;
Blockly.Arduino.math_whole_number=Blockly.Arduino.math_number;

Blockly.Arduino['operator_join'] = function (block) {
    var order = Blockly.Arduino.ORDER_HIGH;
    var branch1 = Blockly.Arduino.valueToCode(block, 'STRING1', order);
    if (branch1.indexOf("(") == -1) {
        branch1 = "\"" + branch1 + "\"";
    }

    var branch2 = Blockly.Arduino.valueToCode(block, 'STRING2', order);
    if (branch2.indexOf("(") == -1) {
        branch2 = "\"" + branch2 + "\"";
    }

    var code = "String(" + branch1 + ")+String(" + branch2 + ")";
    return [code, order];
};

Blockly.Arduino['arduino_println'] = function (block) {
    var order = Blockly.Arduino.ORDER_NONE;
    var arg0 = Blockly.Arduino.valueToCode(block, 'TEXT', order);
    Blockly.Arduino.setupCodes_["serial"] = "Serial.begin(115200);";
    if (arg0.indexOf("(") > -1) {
        var code = Blockly.Arduino.tab() + "Serial.println(" + arg0 + ")" + Blockly.Arduino.END;
    } else {
        var code = Blockly.Arduino.tab() + "Serial.println(\"" + arg0 + "\")" + Blockly.Arduino.END;
    }
    return code;
};

Blockly.Arduino['arduino_pwm_write'] = function (block) {
    var order = Blockly.Arduino.ORDER_NONE;
    var arg0 = Blockly.Arduino.valueToCode(block, 'ARDUINO_PWM_OPTION', order);
    var arg1 = Blockly.Arduino.valueToCode(block, 'PWM', order);
    var code = Blockly.Arduino.tab() + "analogWrite(" + arg0 + "," + arg1 + ")" + Blockly.Arduino.END;
    return code;
};

Blockly.Arduino["arduino_pulsein"] = function (block) {
    var order = Blockly.Arduino.ORDER_ATOMIC;
    var pin = Blockly.Arduino.valueToCode(block, 'PINNUM', order);
    var code = "pulseIn(" + pin + ",HIGH)";
    return [code, order];
};



Blockly.Arduino["data_variablemenu"] = function (block) {
    var order = Blockly.Arduino.ORDER_HIGH;
    var code = block.inputList[0].fieldRow[0].value_;
    return [code, order];
};


Blockly.Arduino["event_arduinobegin"] = function (block) {
    return "";
};

/* generator for variables */
Blockly.Arduino["data_variable"] = function (block) {
    var order = Blockly.Arduino.ORDER_NONE;
    var code = Blockly.Arduino.valueToCode(block, 'VARIABLE', order);
    return code;
};

Blockly.Arduino["data_setvariableto"] = function (block) {
    var order = Blockly.Arduino.ORDER_NONE;
    var n = Blockly.Arduino.valueToCode(block, 'VARIABLE', order);
    var v = Blockly.Arduino.valueToCode(block, 'VALUE', order);

    var code = Blockly.Arduino.tab() + n + " = " + v + Blockly.Arduino.END;
    return code;
};

Blockly.Arduino["data_changevariableby"] = function (block) {
    var order = Blockly.Arduino.ORDER_NONE;
    var n = Blockly.Arduino.valueToCode(block, 'VARIABLE', order);
    var v = Blockly.Arduino.valueToCode(block, 'VALUE', order);
    var code = Blockly.Arduino.tab() + n + " += " + v + Blockly.Arduino.END;
    return code;
};

Blockly.Arduino["operator_mathop"] = function (block) {
    var order = Blockly.Arduino.ORDER_HIGH;
    var op = Blockly.Arduino.valueToCode(block, 'OPERATOR', order);
    var v = Blockly.Arduino.valueToCode(block, 'NUM', order);
    switch(op){
    	case "ceiling": return [`ceil(${v})`, order];
    	case "ln": return [`log(${v})`, order];
    	case "log": return [`log10(${v})`, order];
    	case "e ^": return [`exp(${v})`, order];
    	case "10 ^": return [`pow(10,${v})`, order];
    	case "sin":
    	case "cos":
    	case "tan": return [`${op}(${v}*PI/180.0)`, order];
    	case "asin":
    	case "acos":
    	case "atan": return [`(${op}(${v})/PI*180.0)`, order];
    }
    return [`${op}(${v})`, order];
};

Blockly.Arduino["operator_mathop_menu"] = function (block) {
    var order = Blockly.Arduino.ORDER_ATOMIC;
    var code = block.inputList[0].fieldRow[0].value_;
    return [code, order];
};

module.exports = Blockly.Arduino;






