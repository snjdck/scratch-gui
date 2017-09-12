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
Blockly.Arduino.init=function(a){
	Blockly.Arduino.definitions_=Object.create(null);
	Blockly.Arduino.includes_=Object.create(null);
	Blockly.Arduino.codeStage=Blockly.Arduino.Setup;
	Blockly.Arduino.tabPos=1;
	Blockly.Arduino.variableDB_?Blockly.Arduino.variableDB_.reset():Blockly.Arduino.variableDB_=new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_)
};
Blockly.Arduino.finish=function(a){
	var b=[],c;
	for(c in Blockly.Arduino.definitions_)
		b.push(Blockly.Arduino.definitions_[c]);
	var d=[];
	for(c in Blockly.Arduino.includes_)
		d.push(Blockly.Arduino.includes_[c]);
	c=Blockly.Arduino.Header;
	c+=d.join("\n\n");
	c=c+"\n\n"+b.join("\n\n");
	c=c+"\n\nvoid setup(){\n"+a+"\n}\n";
	Blockly.Arduino.codeStage==Blockly.Arduino.Setup&&(c+="\nvoid loop(){\n\n}\n");
	delete Blockly.Arduino.definitions_;
	delete Blockly.Arduino.includes_;
	delete Blockly.Arduino.codeStage;
	Blockly.Arduino.variableDB_.reset();
    return c
};
Blockly.Arduino.scrub_=function(a,b){
	var c=a.nextConnection&&a.nextConnection.targetBlock(),c=Blockly.Arduino.blockToCode(c);return b+c
};
Blockly.Arduino.scrubNakedValue=function(a){
	return a+"\n"
};
Blockly.Arduino.quote_=function(a){
	return a=a.replace(/\\/g,"\\\\").replace(/\n/g,"\\\n").replace(/\%/g,"\\%").replace(/'/g,"\\'")
};
Blockly.Arduino.tab=function(){
	return Blockly.Arduino.INDENT.repeat(Blockly.Arduino.tabPos)
};
Blockly.Arduino.arduino={};
Blockly.Arduino.arduino_pin_mode=function(a){
	var b=Blockly.Arduino.ORDER_NONE,c=Blockly.Arduino.valueToCode(a,"PINNUM",b);
	a=Blockly.Arduino.valueToCode(a,"ARDUINO_PIN_MODE_OPTION",b);
	return Blockly.Arduino.tab()+"pinMode("+c+","+a+")"+Blockly.Arduino.END
};
Blockly.Arduino.arduino_pwm_write=function(a){
	var b=Blockly.Arduino.ORDER_NONE,c=Blockly.Arduino.valueToCode(a,"ARDUINO_PWM_OPTION",b);
	a=Blockly.Arduino.valueToCode(a,"PWM",b);
	return Blockly.Arduino.tab()+"analogWrite("+c+","+a+")"+Blockly.Arduino.END
};
Blockly.Arduino.arduino_digital_write=function(a){
	var b=Blockly.Arduino.ORDER_NONE,c=Blockly.Arduino.valueToCode(a,"PINNUM",b);
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
	var b=Blockly.Arduino.ORDER_NONE,c=Blockly.Arduino.valueToCode(a,"VAL",b),d=Blockly.Arduino.valueToCode(a,"FROMLOW",b),e=Blockly.Arduino.valueToCode(a,"FROMHIGH",b),f=Blockly.Arduino.valueToCode(a,"TOLOW",b);
	a=Blockly.Arduino.valueToCode(a,"TOHIGH",b);
	return["map("+c+","+d+","+e+","+f+","+a+")",b]
};
Blockly.Arduino.arduino_tone=function(a){
	var b=Blockly.Arduino.ORDER_NONE,c=Blockly.Arduino.valueToCode(a,"PINNUM",b),d=Blockly.Arduino.valueToCode(a,"FREQUENCY",b);
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
	return[a.inputList[0].fieldRow[0].value_,Blockly.Arduino.ORDER_ATOMIC]
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
	var b=Blockly.Arduino.valueToCode(a,"TIMES",Blockly.Arduino.ORDER_HIGH),c=Blockly.Arduino.statementToCode(a,"SUBSTACK"),c=Blockly.Arduino.addLoopTrap(c,a.id);
	a=Blockly.Arduino.tab()+"for(int i=0;i<"+b+";i++){\n";Blockly.Arduino.tabPos++;
	Blockly.Arduino.tabPos--;
	return a=a+c+(Blockly.Arduino.tab()+"}\n")
};
Blockly.Arduino.control_forever=function(a){
	if(Blockly.Arduino.codeStage!=Blockly.Arduino.Loop){
		Blockly.Arduino.codeStage=Blockly.Arduino.Loop;
		Blockly.Arduino.tabPos=0;
		var b=Blockly.Arduino.statementToCode(a,"SUBSTACK"),b=Blockly.Arduino.addLoopTrap(b,a.id),c="\n}\n\nvoid loop(){\n"+b
	}else{
		var c=Blockly.Arduino.tab()+"while(1){\n";Blockly.Arduino.tabPos++;
		b=Blockly.Arduino.statementToCode(a,"SUBSTACK");
		b=Blockly.Arduino.addLoopTrap(b,a.id);
		Blockly.Arduino.tabPos--;
		c=c+b+(Blockly.Arduino.tab()+"}\n")
	}
	return c
};
Blockly.Arduino.control_if=function(a){
	var b=Blockly.Arduino.valueToCode(a,"CONDITION",Blockly.Arduino.ORDER_NONE)||"false",c=Blockly.Arduino.statementToCode(a,"SUBSTACK"),c=Blockly.Arduino.addLoopTrap(c,a.id);
	a=Blockly.Arduino.tab()+"if("+b+"){\n";
	Blockly.Arduino.tabPos++;
	Blockly.Arduino.tabPos--;
	return a=a+c+(Blockly.Arduino.tab()+"}\n")
};
Blockly.Arduino.control_if_else=function(a){
	var b=Blockly.Arduino.valueToCode(a,"CONDITION",Blockly.Arduino.ORDER_NONE)||"false",c=Blockly.Arduino.statementToCode(a,"SUBSTACK"),c=Blockly.Arduino.addLoopTrap(c,a.id);
	Blockly.Arduino.statementToCode(a,"SUBSTACK2");
	a=Blockly.Arduino.addLoopTrap(c,a.id);
	b=Blockly.Arduino.tab()+"if("+b+"){\n";
	Blockly.Arduino.tabPos++;
	Blockly.Arduino.tabPos--;
	b=b+c+(Blockly.Arduino.tab()+"}else{\n");
	Blockly.Arduino.tabPos++;
	Blockly.Arduino.tabPos--;
	return b=b+a+(Blockly.Arduino.tab()+"}\n")
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
	return["random("+b+","+a+")",Blockly.Arduino.ORDER_HIGH]
};
Blockly.Arduino.operator_compare=function(a){
	var b=Blockly.Arduino.valueToCode(a,"OPERAND1",Blockly.Arduino.ORDER_HIGH)||"0",c=Blockly.Arduino.valueToCode(a,"OPERAND2",Blockly.Arduino.ORDER_HIGH)||"0";
	return[b+{operator_gt:">",operator_equals:"==",operator_lt:"<"}[a.type]+c,Blockly.Arduino.ORDER_RELATIONAL]
};
Blockly.Arduino.operator_arithmetic=function(a){
	var b=Blockly.Arduino.valueToCode(a,"NUM1",Blockly.Arduino.ORDER_HIGH)||"0",c=Blockly.Arduino.valueToCode(a,"NUM2",Blockly.Arduino.ORDER_HIGH)||"0",d=Blockly.Arduino.ORDER_ADDITIVE;"operator_multiply"!=a.type&&"operator_divide"!=a.type||--d;
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

module.exports = Blockly.Arduino;






