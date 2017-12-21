#include <WeELFMini.h>

#ifdef _WeELF328P_H
#define MAX_SERVO_COUNT 10
#define LED_MATRIX_WIDTH 21
#define DEFAULT_IR_PIN PORT_2
#endif

#ifdef _WeELFMini_H
#define MAX_SERVO_COUNT 4
#define LED_MATRIX_WIDTH 14
#define DEFAULT_IR_PIN OnBoard_IR
#endif

const uint8_t sensor_port[4] = {PORT_A,PORT_B,PORT_C,PORT_D};
uint8_t sensor_slot[4] = {0};
WeOneWire portDetect;

WeIRAvoidSensor IRAvoid;
WeSingleLineFollower singleLF;
WeUltrasonicSensor ultraSensor;
WeLineFollower lineFollower;
WeLEDPanelModuleMatrix7_21 ledPanel;
WeDCMotor dc;
WeTemperature ts;
WeRGBLed led;
WeBuzzer buzzer(OnBoard_Buzzer);
WeInfraredReceiver ir(DEFAULT_IR_PIN);

Servo servos[MAX_SERVO_COUNT];
uint8_t servo_pins[MAX_SERVO_COUNT]={0};

uint8_t IR_VALUE = 0;

const uint8_t MSG_ID_STOP_ALL = 99;
const uint8_t MSG_ID_BOARD_RGB = 9;
const uint8_t MSG_ID_BOARD_BUTTON = 0;
const uint8_t MSG_ID_BOARD_BUZZER = 10;
const uint8_t MSG_ID_BOARD_LIGHT = 8;
const uint8_t MSG_ID_BOARD_IR = 7;
const uint8_t MSG_ID_BOARD_SOUND = 11;
const uint8_t MSG_ID_BOARD_TEMPERATURE = 12;

const uint8_t MSG_ID_DC_SPEED = 200;
const uint8_t MSG_ID_DC_MOVE = 201;
const uint8_t MSG_ID_DC_STOP = 102;
const uint8_t MSG_ID_SERVO = 202;
const uint8_t MSG_ID_ULTRASONIC_LED = 109;
const uint8_t MSG_ID_ULTRASONIC = 110;
const uint8_t MSG_ID_LINE_FOLLOWER = 111;
const uint8_t MSG_ID_LED_MATRIX_NUMBER = 112;
const uint8_t MSG_ID_LED_MATRIX_TIME = 113;
const uint8_t MSG_ID_LED_MATRIX_STRING = 114;
const uint8_t MSG_ID_LED_MATRIX_BITMAP = 115;
const uint8_t MSG_ID_LED_MATRIX_PIXEL_SHOW = 1;
const uint8_t MSG_ID_LED_MATRIX_PIXEL_HIDE = 2;
const uint8_t MSG_ID_LED_MATRIX_CLEAR = 3;
const uint8_t MSG_ID_SINGLE_LINE_FOLLOWER = 116;
const uint8_t MSG_ID_IR_AVOID = 117;

int searchServoPin(int pin){
	for(int i=0;i<MAX_SERVO_COUNT;i++){
		if(servo_pins[i] == pin){
			return i;
		}
		if(servo_pins[i]==0){
			servo_pins[i] = pin;
			return i;
		}
	}
	return 0;
}
// parse pin, 0~13 digital, 14.. analog pin
void parsePinVal(char * cmd, int * pin) {
  if (cmd[0] == 'A') {
    sscanf(cmd, "A%d\n", pin);
    *pin += A0;
  } else {
    sscanf(cmd, "%d\n", pin);
  }
}


void parsePinVal(char * cmd, int * pin, int * v0) {
  if (cmd[0] == 'A') {
    sscanf(cmd, "A%d %d\n", pin, v0);
    *pin += A0;
  } else {
    sscanf(cmd, "%d %d\n", pin, v0);
  }
}

void parsePinVal(char * cmd, int * pin, int * v0, int * v1) {
  if (cmd[0] == 'A') {
    sscanf(cmd, "A%d %d %d\n", pin, v0, v1);
    *pin += A0;
  } else {
    sscanf(cmd, "%d %d %d\n", pin, v0, v1);
  }
}

void parsePinVal(char * cmd, int * pin, int * v0, int * v1, int * v2, int * v3) {
  if (cmd[0] == 'A') {
    sscanf(cmd, "A%d %d %d %d %d\n", pin, v0, v1, v2, v3);
    *pin += A0;
  } else {
    sscanf(cmd, "%d %d %d %d %d\n", pin, v0, v1, v2, v3);
  }
}
/*
// parse left or right value
void parseLR(char * cmd, int * lvalue, int * rvalue){
  char * tmp;
  char * str;
  *lvalue = 0;
  *rvalue = 0;

  str = cmd;
  tmp = cmd;
  while(str!=NULL){
    str = strtok_r(0, " ", &tmp);
    if(str[0]=='L'){
    *lvalue = atoi(str+1);
    }else if(str[0]=='R'){
    *rvalue = atoi(str+1);
    }
  }
}

// parse left or right value
void parseLR(char * cmd, int * lvalue, int * rvalue, int * lspd, int * rspd) {
  char * tmp;
  char * str;
  *lvalue = 0;
  *rvalue = 0;
  *lspd = 400;
  *rspd = 400;

  str = cmd;
  tmp = cmd;
  while (str != NULL) {
    str = strtok_r(0, " ", &tmp);
    if (str[0] == 'L') {
      *lvalue = atoi(str + 1);
    } else if (str[0] == 'R') {
      *rvalue = atoi(str + 1);
    } else if (str[0] == 'A') {
      *lspd = atoi(str + 1);
    } else if (str[0] == 'B') {
      *rspd = atoi(str + 1);
    }
  }

}
*/

void nextStr(char **cmd)
{
	while(' ' != *(*cmd)++);
}

int nextInt(char **cmd)
{
	nextStr(cmd);
	return atoi(*cmd);
}

void nextCharInt(char **cmd, char *c, int *i)
{
	nextStr(cmd);
	*c = **cmd;
	*i = atoi(*cmd+1);
}




void doRgb(char * cmd)
{
	nextStr(&cmd);
	int port, pix, r, g, b;
	parsePinVal(cmd, &port, &pix, &r, &g, &b);
	led.reset(port);
	led.setColor(pix, r >> 4, g >> 4, b >> 4);
	led.show();
}

void doDcSpeed(char *cmd)
{
	dc.reset(nextInt(&cmd));
	dc.run(nextInt(&cmd));
}

void doServo(char *cmd)
{
	int pin = nextInt(&cmd);
	int v = nextInt(&cmd);
	Servo sv = servos[searchServoPin(pin)];
	if(v >= 0 && v <= 180)
	{
		if(!sv.attached())
		{
			sv.attach(pin);
		}
		sv.write(v);
	}
}

void doDcMove(char *cmd)
{
	dc.reset(M2);
	dc.run(nextInt(&cmd));
	dc.reset(M1);
	dc.run(nextInt(&cmd));
}

void doDcStop(char *cmd)
{
	dc.reset(M1);
	dc.run(0);
	dc.reset(M2);
	dc.run(0);
}

void getLightSensor(char *cmd)
{
	uint8_t pin = nextInt(&cmd);
	pinMode(pin, INPUT);
	Serial.println(analogRead(pin));
}

void getSound(char *cmd)
{
	uint8_t pin = nextInt(&cmd);
	pinMode(pin, INPUT);
	Serial.println(analogRead(pin));
}

void getIR(char *cmd)
{
	uint8_t pin = nextInt(&cmd);
	ir.reset(pin);
	int code = nextInt(&cmd);
	Serial.println(IR_VALUE == code ? "true" : "false");
}

void getTemperature(char *cmd)
{
	uint8_t pin = nextInt(&cmd);
	ts.reset(pin);
	float value = ts.temperature();
	Serial.println(value);
}

void getButton(char *cmd)
{
	uint8_t pin = nextInt(&cmd);
	pinMode(pin, INPUT);
	boolean pressed = digitalRead(pin) == 0;
	Serial.println(pressed ? "true" : "false");
}

void doTone(char *cmd)
{
	int note = nextInt(&cmd);
	int hz   = nextInt(&cmd);
	buzzer.tone(note, hz);
}

void getUltrasonic(char *cmd)
{
	int port = nextInt(&cmd);
	ultraSensor.reset(port);
	Serial.println(ultraSensor.distanceCm());
}

void getIRAvoid(char *cmd)
{
	int port = nextInt(&cmd);
	IRAvoid.reset(port);
	Serial.println(IRAvoid.isObstacle() ? "true" : "false");
}

void getSingleLineFollower(char *cmd)
{
	int port = nextInt(&cmd);
	singleLF.reset(port);
	Serial.println(singleLF.read());
}

void doUltrasonicLed(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	ultraSensor.reset(port);
	int r = nextInt(&cmd);
	int g = nextInt(&cmd);
	int b = nextInt(&cmd);
	if(index & 1){
		ultraSensor.setColor1(r,g,b);
	}
	if(index & 2){
		ultraSensor.setColor2(r,g,b);
	}
	ultraSensor.RGBShow();
}

void getLineFollower(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	lineFollower.reset(port);
	lineFollower.startRead();
	uint8_t value = index == 1 ? lineFollower.readSensor1() : lineFollower.readSensor2();
	Serial.println(value);
}
void doLedMatrixShowNumber(char *cmd)
{
	int port = nextInt(&cmd);
	int value = nextInt(&cmd);
	ledPanel.reset(port);
	ledPanel.showNum(value);
}
void doLedMatrixShowTime(char *cmd)
{
	int port = nextInt(&cmd);
	int hour = nextInt(&cmd);
	int second = nextInt(&cmd);
	int show_colon = nextInt(&cmd);
	ledPanel.reset(port);
	ledPanel.showClock(hour, second, show_colon);
}

void doLedMatrixShowString(char *cmd)
{
	int port = nextInt(&cmd);
	int x = nextInt(&cmd);
	int y = nextInt(&cmd);
	nextStr(&cmd);
	ledPanel.reset(port);
	ledPanel.showChar(x,y,cmd);
}
void doLedMatrixShowBitmap(char *cmd)
{
	int port = nextInt(&cmd);
	int x = nextInt(&cmd);
	int y = nextInt(&cmd);
	byte data[LED_MATRIX_WIDTH];
	for(int i=0; i<LED_MATRIX_WIDTH; ++i){
		data[i] = nextInt(&cmd);
	}
	ledPanel.reset(port);
	ledPanel.showBitmap(x,y,data);
}

void doLedMatrixShowPixel(char *cmd)
{
	int port = nextInt(&cmd);
	int x = nextInt(&cmd);
	int y = nextInt(&cmd);
	ledPanel.reset(port);
	ledPanel.turnOnDot(x,y);
}

void doLedMatrixHidePixel(char *cmd)
{
	int port = nextInt(&cmd);
	int x = nextInt(&cmd);
	int y = nextInt(&cmd);
	ledPanel.reset(port);
	ledPanel.turnOffDot(x,y);
}

void doLedMatrixClear(char *cmd)
{
	int port = nextInt(&cmd);
	ledPanel.reset(port);
	ledPanel.clearScreen();
}

void doStopAll(char *cmd)
{
	//stop motor
	doDcStop(0);
#ifdef OnBoard_RGB
	led.reset(OnBoard_RGB);
	led.setColor(0,0,0,0);
	led.show();
#endif
	//stop RJ11 sensors
	for(int i=0; i<sizeof(sensor_slot);++i){
		if(!sensor_slot[i]){
			continue;
		}
		if(1 == sensor_slot[i]){
			ultraSensor.reset(sensor_port[i]);
			ultraSensor.setColor1(0,0,0);
			ultraSensor.setColor2(0,0,0);
			ultraSensor.RGBShow();
		}else if(3 == sensor_slot[i]){
			ledPanel.reset(sensor_port[i]);
			ledPanel.clearScreen();
		}
	}
}

void parseMcode(char *cmd)
{
	bool queryFlag = false;
	void (*handler)(char*);
	switch(atoi(cmd+1))
	{
		case MSG_ID_BOARD_IR:
			queryFlag = true;
			handler = getIR;
			break;
		case MSG_ID_BOARD_SOUND:
			queryFlag = true;
			handler = getSound;
			break;
		case MSG_ID_BOARD_TEMPERATURE:
			queryFlag = true;
			handler = getTemperature;
			break;
		case MSG_ID_BOARD_BUTTON:
			queryFlag = true;
			handler = getButton;
			break;
		case MSG_ID_BOARD_LIGHT:
			queryFlag = true;
			handler = getLightSensor;
			break;
		case MSG_ID_BOARD_RGB:
			handler = doRgb;
			break;
		case MSG_ID_BOARD_BUZZER:
			handler = doTone;
			break;
		case MSG_ID_DC_SPEED:
			handler = doDcSpeed;
			break;
		case MSG_ID_DC_MOVE:
			handler = doDcMove;
			break;
		case MSG_ID_DC_STOP:
			handler = doDcStop;
			break;
		case MSG_ID_SERVO:
			handler = doServo;
			break;
		case MSG_ID_ULTRASONIC_LED:
			handler = doUltrasonicLed;
			break;
		case MSG_ID_ULTRASONIC:
			queryFlag = true;
			handler = getUltrasonic;
			break;
		case MSG_ID_LINE_FOLLOWER:
			queryFlag = true;
			handler = getLineFollower;
			break;
		case MSG_ID_LED_MATRIX_NUMBER:
			handler = doLedMatrixShowNumber;
			break;
		case MSG_ID_LED_MATRIX_TIME:
			handler = doLedMatrixShowTime;
			break;
		case MSG_ID_LED_MATRIX_STRING:
			handler = doLedMatrixShowString;
			break;
		case MSG_ID_LED_MATRIX_BITMAP:
			handler = doLedMatrixShowBitmap;
			break;
		case MSG_ID_STOP_ALL:
			handler = doStopAll;
			break;
		case MSG_ID_LED_MATRIX_PIXEL_SHOW:
			handler = doLedMatrixShowPixel;
			break;
		case MSG_ID_LED_MATRIX_PIXEL_HIDE:
			handler = doLedMatrixHidePixel;
			break;
		case MSG_ID_LED_MATRIX_CLEAR:
			handler = doLedMatrixClear;
			break;
		case MSG_ID_SINGLE_LINE_FOLLOWER:
			queryFlag = true;
			handler = getSingleLineFollower;
			break;
		case MSG_ID_IR_AVOID:
			queryFlag = true;
			handler = getIRAvoid;
			break;
		default:
			return;
	}
	Serial.write(cmd, strlen(cmd));
	handler(cmd);
	if(!queryFlag){
		Serial.println("OK");
	}
}

void parseCmd(char *cmd)
{
	if(cmd[0] == 'M'){
		parseMcode(cmd);
	}
}

void onSetup()
{
	pinMode(PORT_A, INPUT);
	pinMode(PORT_B, INPUT);
	pinMode(PORT_C, INPUT);
	pinMode(PORT_D, INPUT);
	ir.begin();
}

void setup()
{
	Serial.begin(115200);
	onSetup();
}

void loop()
{
	loopIR();
	loopSerial();
	loopSensor();
}

void loopIR()
{
	static unsigned long timestamp = 0;
	if(ir.decode()){
		timestamp = millis();
		IR_VALUE = (ir.value >> 16) & 0xFF;
	}else if(millis() - timestamp > 200){
		IR_VALUE = 0;
	}
}

void loopSerial()
{
	const int buffer_len = 128;
	static char buffer[buffer_len];
	static int buffer_index = 0;

	while(Serial.available())
	{
		char nextChar = Serial.read();
		if(nextChar == '\n'){
			while(buffer[--buffer_index] == '\r');
			buffer[buffer_index+1] = ' ';
			buffer[buffer_index+2] = 0;
			buffer_index = 0;
			parseCmd(buffer);
		}else{
			buffer[buffer_index] = nextChar;
			buffer_index = (buffer_index + 1) % buffer_len;
		}
	}
}

void loopSensor()
{
	for(int i=0; i<sizeof(sensor_slot);++i){
		if(sensor_slot[i] > 0 == digitalRead(sensor_port[i])){
			continue;
		}
		if(sensor_slot[i] > 0){
			sensor_slot[i] = 0;
			continue;
		}
		delay(400);
		portDetect.reset(sensor_port[i]);
		portDetect.reset();
		portDetect.write_byte(0x01);
		portDetect.respond();
		sensor_slot[i] = portDetect.read_byte();
	}
}