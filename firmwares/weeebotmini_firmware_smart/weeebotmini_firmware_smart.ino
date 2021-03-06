#include <WeELFMini.h>

#define NTD1 294
#define NTD2 330
#define NTD3 350
#define NTD4 393
#define NTD5 441
#define NTD6 495
#define NTD7 556

#define FIRMWARE_VERSION "2.8"

#define MAX_SERVO_COUNT 4
#define LED_MATRIX_WIDTH 14
#define DEFAULT_IR_PIN OnBoard_IR
#define BATTERY_PIN A6

const uint8_t sensor_port[4] = {PORT_A,PORT_B,PORT_C,PORT_D};
uint8_t sensor_slot[4] = {0};
WeOneWire portDetect;

WeIRAvoidSensor IRAvoid;
//WeSingleLineFollower singleLF;
WeUltrasonicSensor ultraSensor;
WeLineFollower lineFollower;
WeLEDPanelModuleMatrix5_14 ledPanel;
WeDCMotor dc;
We130DCMotor dc130[MAX_SERVO_COUNT];
WeTemperature ts;
WeRGBLed led;
WeRGBLED_RJ led_RJ11;
WePotentiometer potentiomter;
WeBuzzer buzzer(OnBoard_Buzzer);
WeInfraredReceiver ir(DEFAULT_IR_PIN);
WeHumiture humitureSensor;
WeTouchSensor touchSensor;
We7SegmentDisplay segmentDisplaySensor;
We4LEDButton button4led;
WePIRSensor pir;
//WeColorSensor colorSensor;
WeFlameSensor flameSensor;
WeLimitSwitch limitSwitch;
WeJoystick joystick;
WeCompassSensor compassSensor;
//WeGyroSensor gyro;
WeTiltSwitch tilt;
//WeRelay relay;
WeWaterAtomizer waterAtomizer;
WeMP3 mp3;
WeOLED oled;
WeLEDLineFollower ledLineFollower;

WeServo servo;

WeSpeechRecognition speechRec(0);
WeImageRecognition imageRec(0);
WeGestureSensor gestureSensor;

const uint8_t MSG_ID_BOARD_BUTTON = 0;
const uint8_t MSG_ID_LED_MATRIX_PIXEL_SHOW = 1;
const uint8_t MSG_ID_LED_MATRIX_PIXEL_HIDE = 2;
const uint8_t MSG_ID_LED_MATRIX_CLEAR = 3;
const uint8_t MSG_ID_QUERY_VERSION = 5;
const uint8_t MSG_ID_BATTERY = 6;
const uint8_t MSG_ID_BOARD_IR = 7;
const uint8_t MSG_ID_BOARD_LIGHT = 8;
const uint8_t MSG_ID_BOARD_RGB = 9;
const uint8_t MSG_ID_BOARD_BUZZER = 10;
const uint8_t MSG_ID_BOARD_SOUND = 11;
const uint8_t MSG_ID_BOARD_TEMPERATURE = 12;
const uint8_t MSG_ID_RJ11_RGB = 13;
const uint8_t MSG_ID_4_LED_BUTTON = 14;
const uint8_t MSG_ID_4_LED_BUTTON_LED = 15;
const uint8_t MSG_ID_PIR = 16;
const uint8_t MSG_ID_COLOR_WHITE_BALANCE = 17;
const uint8_t MSG_ID_COLOR_SET_LIGHT = 18;
const uint8_t MSG_ID_COLOR_VALUE = 19;
const uint8_t MSG_ID_FLAME = 20;
const uint8_t MSG_ID_LIMIT_SWITCH = 21;
const uint8_t MSG_ID_JOYSTICK = 22;
const uint8_t MSG_ID_COMPASS = 23;
const uint8_t MSG_ID_GYRO = 24;
const uint8_t MSG_ID_TILT = 25;
const uint8_t MSG_ID_RELAY = 26;
const uint8_t MSG_ID_WATER_ATOMIZER = 27;

const uint8_t MSG_ID_MP3_SET_MUSIC = 28;
const uint8_t MSG_ID_MP3_SET_VOLUME = 29;
const uint8_t MSG_ID_MP3_SET_DEVICE = 30;
const uint8_t MSG_ID_MP3_NEXT_MUSIC = 31;
const uint8_t MSG_ID_MP3_PAUSE = 32;
const uint8_t MSG_ID_MP3_PLAY = 33;
const uint8_t MSG_ID_MP3_IS_OVER = 34;

const uint8_t MSG_ID_OLED_SET_SIZE = 35;
const uint8_t MSG_ID_OLED_SHOW_NUMBER = 36;
const uint8_t MSG_ID_OLED_SHOW_STRING = 37;
const uint8_t MSG_ID_OLED_CLEAR = 38;

const uint8_t MSG_ID_MP3_PREV_MUSIC = 39;

const uint8_t MSG_ID_STOP_ALL = 99;

const uint8_t MSG_ID_DC_STOP = 102;
const uint8_t MSG_ID_LINE_FOLLOWER_BOOL = 108;
const uint8_t MSG_ID_ULTRASONIC_RGB = 109;
const uint8_t MSG_ID_ULTRASONIC = 110;
const uint8_t MSG_ID_LINE_FOLLOWER = 111;
const uint8_t MSG_ID_LED_MATRIX_NUMBER = 112;
const uint8_t MSG_ID_LED_MATRIX_TIME = 113;
const uint8_t MSG_ID_LED_MATRIX_STRING = 114;
const uint8_t MSG_ID_LED_MATRIX_BITMAP = 115;
const uint8_t MSG_ID_SINGLE_LINE_FOLLOWER = 116;
const uint8_t MSG_ID_IR_AVOID = 117;
const uint8_t MSG_ID_IR_AVOID_RGB = 118;
const uint8_t MSG_ID_BACK_LED = 119;
const uint8_t MSG_ID_FRONT_LED = 120;
const uint8_t MSG_ID_TOUCH = 121;
const uint8_t MSG_ID_HUMITURE = 122;
const uint8_t MSG_ID_7SEGMENT = 123;
const uint8_t MSG_ID_SOIL = 124;
const uint8_t MSG_ID_SINGLE_LED = 125;
const uint8_t MSG_ID_POTENTIOMTER = 126;

const uint8_t MSG_ID_ULTRASONIC_LED = 127;
const uint8_t MSG_ID_IR_AVOID_LED = 128;

const uint8_t MSG_ID_LED_LINE_FOLLOWER = 129;
const uint8_t MSG_ID_LED_LINE_FOLLOWER_LIGHT = 130;

const uint8_t MSG_ID_DC_SPEED = 200;
const uint8_t MSG_ID_DC_MOVE = 201;
const uint8_t MSG_ID_SERVO = 202;
const uint8_t MSG_ID_DC_130_SPEED = 204;
const uint8_t MSG_ID_ENCODER_RUN = 205;
const uint8_t MSG_ID_ENCODER_RUN_SPEED = 206;
const uint8_t MSG_ID_ENCODER_MOVE = 207;

const uint8_t MSG_ID_GESTURE_READ = 208;
const uint8_t MSG_ID_SPEECH_REC_SET_KEYWORD = 209;
const uint8_t MSG_ID_SPEECH_REC_SET_PASSWORD = 210;
const uint8_t MSG_ID_SPEECH_REC_SET_MODE = 211;
const uint8_t MSG_ID_SPEECH_REC_READ = 212;
const uint8_t MSG_ID_IMAGE_REC_SET_MODE = 213;
const uint8_t MSG_ID_IMAGE_REC_COLOR_POSITION = 214;
const uint8_t MSG_ID_IMAGE_REC_AUTO_TRACKING = 215;
const uint8_t MSG_ID_IMAGE_REC_LINE_FOLLOW = 216;
const uint8_t MSG_ID_IMAGE_REC_VALUE = 217;

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

float nextFloat(char **cmd)
{
	nextStr(cmd);
	return atof(*cmd);
}

void printBoolean(bool value)
{
	Serial.println(value ? "true" : "false");
}

void doRgb(char * cmd)
{
	nextStr(&cmd);
	int port, pix, r, g, b;
	parsePinVal(cmd, &port, &pix, &r, &g, &b);
	led.reset(port);
	led.setColor(pix, r, g, b);
	led.show();
}

void doRj11RGB(char *cmd)
{
	nextStr(&cmd);
	int port, pix, r, g, b;
	parsePinVal(cmd, &port, &pix, &r, &g, &b);
	led_RJ11.reset(port);
	led_RJ11.setColor(pix, r, g, b);
	led_RJ11.RGBShow();
}

void doDcSpeed(char *cmd)
{
	dc.reset(nextInt(&cmd));
	dc.run(nextInt(&cmd));
}

void doDc130Speed(char *cmd)
{
	int port = nextInt(&cmd);
	int speed = nextInt(&cmd);
	for(int i=0; i<MAX_SERVO_COUNT; ++i){
		if(port != sensor_port[i])
			continue;
		dc130[i].runTo(speed);
		return;
	}
}

void doServo(char *cmd)
{
	int pin = nextInt(&cmd);
	int v = nextInt(&cmd);
	servo.reset(pin, true);
	servo.write(v);
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
	printBoolean(ir.isKeyPressed(code));
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
	printBoolean(pressed);
}

void doTone(char *cmd)
{
	int note = nextInt(&cmd);
	int hz   = nextInt(&cmd);
	buzzer.tone2(note, hz);
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
	printBoolean(IRAvoid.isObstacle());
}
/*
void getSingleLineFollower(char *cmd)
{
	int port = nextInt(&cmd);
	singleLF.reset(port);
	Serial.println(singleLF.read());
}
*/
void doIRAvoidRGB(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	int r = nextInt(&cmd);
	int g = nextInt(&cmd);
	int b = nextInt(&cmd);
	IRAvoid.reset(port);
	IRAvoid.setColor(index, r, g, b);
}

void doUltrasonicRGB(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	int r = nextInt(&cmd);
	int g = nextInt(&cmd);
	int b = nextInt(&cmd);
	ultraSensor.reset(port);
	ultraSensor.setColor(index, r, g, b);
}

void doIRAvoidLed(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	int isOn = nextInt(&cmd);
	IRAvoid.reset(port);
	IRAvoid.setLed(index, isOn);
}

void doUltrasonicLed(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	int isOn = nextInt(&cmd);
	ultraSensor.reset(port);
	ultraSensor.setLed(index, isOn);
}

void getLineFollower(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	lineFollower.reset(port);
	Serial.println(lineFollower.startRead(index));
}

void getLineFollowerBool(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	lineFollower.reset(port);
	printBoolean(lineFollower.startRead(index) < 640);
}

void doLedMatrixShowNumber(char *cmd)
{
	int port = nextInt(&cmd);
	float value = nextFloat(&cmd);
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

void doBackLed(char *cmd)
{
	int pin = nextInt(&cmd);
	int on = nextInt(&cmd);
	digitalWrite(pin, on);
}
void doFrontLed(char *cmd)
{
	int pin = nextInt(&cmd);
	int index = nextInt(&cmd);
	int on = nextInt(&cmd);
	IRAvoid.reset(pin);
	if(index & 2){
		if(on){
			IRAvoid.LeftLED_ON();
		}else{
			IRAvoid.LeftLED_OFF();
		}
	}
	if(index & 1){
		if(on){
			IRAvoid.RightLED_ON();
		}else{
			IRAvoid.RightLED_OFF();
		}
	}
}

void getTouch(char *cmd)
{
	int pin = nextInt(&cmd);
	touchSensor.reset(pin);
	printBoolean(touchSensor.touched());
}

void getHumiture(char *cmd)
{
	int pin = nextInt(&cmd);
	int v = nextInt(&cmd);
	humitureSensor.reset(pin);
	humitureSensor.startRead();
	if(v == 0){
		Serial.println(humitureSensor.getTemperature());
	}else{
		Serial.println(humitureSensor.getHumidity());
	}
}

void getSoil(char *cmd)
{
	int pin = nextInt(&cmd);
	Serial.println(analogRead(pin));
}

void do7Segment(char *cmd)
{
	int pin = nextInt(&cmd);
	float v = nextFloat(&cmd);
	segmentDisplaySensor.reset(pin);
	segmentDisplaySensor.showNumber(v);
}

void doSingleLed(char *cmd)
{
	int port = nextInt(&cmd);
	int isOn = nextInt(&cmd);
	pinMode(port, OUTPUT);
	digitalWrite(port, isOn);
}

void getPotentiomter(char *cmd)
{
	int port = nextInt(&cmd);
	potentiomter.reset(port);
	Serial.println(potentiomter.readAnalog());
}

void doQueryVersion(char *cmd)
{
	Serial.println(FIRMWARE_VERSION);
}

void get4LedButton(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	button4led.reset(port);
	printBoolean(button4led.readKey() == index);
}

void do4LedButtonLight(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	int isOn = nextInt(&cmd);
	button4led.reset(port);
	button4led.setLed(index, isOn);
}

void getPIR(char *cmd)
{
	int port = nextInt(&cmd);
	pir.reset(port);
	printBoolean(pir.readSensor());
}
/*
void setColorSensorWhiteBalance(char *cmd)
{
	int port = nextInt(&cmd);
	colorSensor.reset(port);
	colorSensor.whitebalance();
}

void setColorSensorLight(char *cmd)
{
	int port = nextInt(&cmd);
	int isOn = nextInt(&cmd);
	colorSensor.reset(port);
	colorSensor.setLight(isOn);
}

void getColorSensorValue(char *cmd)
{
	int port = nextInt(&cmd);
	int type = nextInt(&cmd);
	colorSensor.reset(port);
	Serial.println(colorSensor.readValue(type));
}
*/
void getFlameValue(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	flameSensor.reset(port);
	Serial.println(flameSensor.readValue(index));
}

void getLimitSwitch(char *cmd)
{
	int port = nextInt(&cmd);
	limitSwitch.reset(port);
	printBoolean(limitSwitch.read());
}

void getJoystick(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	joystick.reset(port);
	Serial.println(joystick.readValue(index));
}

void getCompass(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	compassSensor.reset(port);
	Serial.println(compassSensor.readValue(index));
}
/*
void getGyro(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	gyro.reset(port);
	Serial.println(gyro.readValue(index));
}
*/
void getTilt(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	tilt.reset(port);
	printBoolean(tilt.readSensor(index));
}
/*
void setRelay(char *cmd)
{
	int port = nextInt(&cmd);
	int isOn = nextInt(&cmd);
	relay.reset(port);
	relay.setNC(isOn);
}
*/
void setWaterAtomizer(char *cmd)
{
	int port = nextInt(&cmd);
	int isOn = nextInt(&cmd);
	waterAtomizer.reset(port);
	waterAtomizer.setRun(isOn);
}

void getMp3IsOver(char *cmd)
{
	int port = nextInt(&cmd);
	mp3.reset(port);
	printBoolean(mp3.isOver());
}

void doMp3Play(char *cmd)
{
	int port = nextInt(&cmd);
	mp3.reset(port);
	mp3.play();
}

void doMp3Pause(char *cmd)
{
	int port = nextInt(&cmd);
	mp3.reset(port);
	mp3.pause();
}

void doMp3NextMusic(char *cmd)
{
	int port = nextInt(&cmd);
	mp3.reset(port);
	mp3.nextMusic();
}

void doMp3PrevMusic(char *cmd)
{
	int port = nextInt(&cmd);
	mp3.reset(port);
	mp3.prevMusic();
}

void doMp3SetDevice(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	mp3.reset(port);
	mp3.appointDevice(index);
}

void doMp3SetMusic(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	mp3.reset(port);
	mp3.appointMusic(index);
}

void doMp3SetVolume(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	mp3.reset(port);
	mp3.appointVolume(index);
}

void doOledSetSize(char *cmd)
{
	int port = nextInt(&cmd);
	int value = nextInt(&cmd);
	oled.reset(port);
	oled.setSize(value);
}

void doOledShowString(char *cmd)
{
	int port = nextInt(&cmd);
	int x = nextInt(&cmd);
	int y = nextInt(&cmd);
	nextStr(&cmd);
	oled.reset(port);
	oled.showString(x, y, cmd);
}

void doOledShowNumber(char *cmd)
{
	int port = nextInt(&cmd);
	int x = nextInt(&cmd);
	int y = nextInt(&cmd);
	float value = nextFloat(&cmd);
	oled.reset(port);
	oled.showNum(x, y, value);
}

void doOledClear(char *cmd)
{
	int port = nextInt(&cmd);
	oled.reset(port);
	oled.clearScreen();
}

void getLedLineFollower(char *cmd)
{
	int port = nextInt(&cmd);
	ledLineFollower.reset(port);
	Serial.println(ledLineFollower.readSensor());
}
void doLedLineFollowerLight(char *cmd)
{
	int port = nextInt(&cmd);
	bool isOn = nextInt(&cmd);
	ledLineFollower.reset(port);
	ledLineFollower.showLED(isOn);
}

void getBattery(char *cmd)
{
	const int count = 50;
	uint16_t value = 0;
	for(int i=0; i<count; i++){
		value += analogRead(BATTERY_PIN);
	}
	double v = value * 0.00537 / count;
	v = min(4.1, max(3.0, v));
	v = (v - 3.0) / 1.2;
	int percent = round(100 * v);
	Serial.println(percent);
}


void getGestureRead(char *cmd)
{
	int port = nextInt(&cmd);
	int value = nextInt(&cmd);
	gestureSensor.reset(port);
	printBoolean(gestureSensor.read() == value);
}

void doSpeechRecSetKeyword(char *cmd)
{
	int port = nextInt(&cmd);
	nextStr(&cmd);
	char *keyword = cmd;
	speechRec.reset(port);
	speechRec.setKeyword(keyword);
}

void doSpeechRecSetPassword(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	nextStr(&cmd);
	char *password = cmd;
	speechRec.reset(port);
	speechRec.setPassword(index, password);
}

void doSpeechRecSetMode(char *cmd)
{
	int port = nextInt(&cmd);
	int mode = nextInt(&cmd);
	speechRec.reset(port);
	speechRec.setTriggerMode(mode);
}

void getSpeechRecRead(char *cmd)
{
	int port = nextInt(&cmd);
	speechRec.reset(port);
	Serial.println(speechRec.read());
}

void doImageRecSetMode(char *cmd)
{
	int port = nextInt(&cmd);
	int mode = nextInt(&cmd);
	imageRec.reset(port);
	if(mode == 0){
		imageRec.setAutoTrackingMode();
	}else{
		imageRec.setLineFollowerMode();
	}
}

void getImageRecColorPosition(char *cmd)
{
	int port = nextInt(&cmd);
	int color = nextInt(&cmd);
	imageRec.reset(port);
	printBoolean(imageRec.getColorPosition(color));
}

void getImageRecAutoTracking(char *cmd)
{
	int port = nextInt(&cmd);
	imageRec.reset(port);
	printBoolean(imageRec.getAutoPosition());
}
void getImageRecLineFollow(char *cmd)
{
	int port = nextInt(&cmd);
	imageRec.reset(port);
	printBoolean(imageRec.getLineFollowerAngle());
}
void getImageRecValue(char *cmd)
{
	int port = nextInt(&cmd);
	int type = nextInt(&cmd);
	imageRec.reset(port);
	if(type == 0){
		Serial.println(imageRec.centerX);
	}else if(type == 1){
		Serial.println(imageRec.centerY);
	}else if(type == 2){
		Serial.println(imageRec.pixels);
	}else if(type == 3){
		Serial.println(imageRec.angle);
	}
}

void doStopAll(char *cmd)
{
	//stop motor
	doDcStop(0);
	//stop back led
	digitalWrite(MINI_LEFT_RED, LOW);
	digitalWrite(MINI_LEFT_YELLOW, LOW);
	digitalWrite(MINI_RIGHT_RED, LOW);
	digitalWrite(MINI_RIGHT_YELLOW, LOW);
	loopSensor();
	//stop RJ11 sensors
	for(int i=0; i<sizeof(sensor_slot);++i){
		if(!sensor_slot[i]){
			continue;
		}
		if(1 == sensor_slot[i]){
			ultraSensor.reset(sensor_port[i]);
			ultraSensor.setColor1(0,0,0);
			ultraSensor.setColor2(0,0,0);
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
		case MSG_ID_BATTERY:
			queryFlag = true;
			handler = getBattery;
			break;
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
		case MSG_ID_DC_130_SPEED:
			handler = doDc130Speed;
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
		case MSG_ID_ULTRASONIC_RGB:
			handler = doUltrasonicRGB;
			break;
		case MSG_ID_IR_AVOID_RGB:
			handler = doIRAvoidRGB;
			break;
		case MSG_ID_ULTRASONIC_LED:
			handler = doUltrasonicLed;
			break;
		case MSG_ID_FRONT_LED:
		case MSG_ID_IR_AVOID_LED:
			handler = doIRAvoidLed;
			break;
		case MSG_ID_ULTRASONIC:
			queryFlag = true;
			handler = getUltrasonic;
			break;
		case MSG_ID_LINE_FOLLOWER:
			queryFlag = true;
			handler = getLineFollower;
			break;
		case MSG_ID_LINE_FOLLOWER_BOOL:
			queryFlag = true;
			handler = getLineFollowerBool;
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
		/*case MSG_ID_SINGLE_LINE_FOLLOWER:
			queryFlag = true;
			handler = getSingleLineFollower;
			break;*/
		case MSG_ID_IR_AVOID:
			queryFlag = true;
			handler = getIRAvoid;
			break;
		case MSG_ID_BACK_LED:
			handler = doBackLed;
			break;
		case MSG_ID_SINGLE_LED:
			handler = doSingleLed;
			break;
		case MSG_ID_POTENTIOMTER:
			queryFlag = true;
			handler = getPotentiomter;
			break;
		case MSG_ID_RJ11_RGB:
			handler = doRj11RGB;
			break;
		case MSG_ID_TOUCH:
			queryFlag = true;
			handler = getTouch;
			break;
		case MSG_ID_HUMITURE:
			queryFlag = true;
			handler = getHumiture;
			break;
		case MSG_ID_SOIL:
			queryFlag = true;
			handler = getSoil;
			break;
		case MSG_ID_7SEGMENT:
			handler = do7Segment;
			break;
		case MSG_ID_QUERY_VERSION:
			queryFlag = true;
			handler = doQueryVersion;
			break;
		case MSG_ID_4_LED_BUTTON:
			queryFlag = true;
			handler = get4LedButton;
			break;
		case MSG_ID_4_LED_BUTTON_LED:
			handler = do4LedButtonLight;
			break;
		case MSG_ID_PIR:
			queryFlag = true;
			handler = getPIR;
			break;
		/*case MSG_ID_COLOR_WHITE_BALANCE:
			handler = setColorSensorWhiteBalance;
			break;
		case MSG_ID_COLOR_SET_LIGHT:
			handler = setColorSensorLight;
			break;
		case MSG_ID_COLOR_VALUE:
			queryFlag = true;
			handler = getColorSensorValue;
			break;*/
		case MSG_ID_FLAME:
			queryFlag = true;
			handler = getFlameValue;
			break;
		case MSG_ID_LIMIT_SWITCH:
			queryFlag = true;
			handler = getLimitSwitch;
			break;
		case MSG_ID_JOYSTICK:
			queryFlag = true;
			handler = getJoystick;
			break;
		case MSG_ID_COMPASS:
			queryFlag = true;
			handler = getCompass;
			break;
		/*case MSG_ID_GYRO:
			queryFlag = true;
			handler = getGyro;
			break;*/
		case MSG_ID_TILT:
			queryFlag = true;
			handler = getTilt;
			break;
		/*case MSG_ID_RELAY:
			handler = setRelay;
			break;*/
		case MSG_ID_WATER_ATOMIZER:
			handler = setWaterAtomizer;
			break;
		case MSG_ID_MP3_IS_OVER:
			queryFlag = true;
			handler = getMp3IsOver;
			break;
		case MSG_ID_MP3_PLAY:
			handler = doMp3Play;
			break;
		case MSG_ID_MP3_PAUSE:
			handler = doMp3Pause;
			break;
		case MSG_ID_MP3_NEXT_MUSIC:
			handler = doMp3NextMusic;
			break;
		case MSG_ID_MP3_PREV_MUSIC:
			handler = doMp3PrevMusic;
			break;
		case MSG_ID_MP3_SET_DEVICE:
			handler = doMp3SetDevice;
			break;
		case MSG_ID_MP3_SET_MUSIC:
			handler = doMp3SetMusic;
			break;
		case MSG_ID_MP3_SET_VOLUME:
			handler = doMp3SetVolume;
			break;
		case MSG_ID_OLED_SET_SIZE:
			handler = doOledSetSize;
			break;
		case MSG_ID_OLED_SHOW_STRING:
			handler = doOledShowString;
			break;
		case MSG_ID_OLED_SHOW_NUMBER:
			handler = doOledShowNumber;
			break;
		case MSG_ID_OLED_CLEAR:
			handler = doOledClear;
			break;
		case MSG_ID_LED_LINE_FOLLOWER:
			queryFlag = true;
			handler = getLedLineFollower;
			break;
		case MSG_ID_LED_LINE_FOLLOWER_LIGHT:
			handler = doLedLineFollowerLight;
			break;
		case MSG_ID_GESTURE_READ:
			queryFlag = true;
			handler = getGestureRead;
			break;
		case MSG_ID_SPEECH_REC_SET_KEYWORD:
			handler = doSpeechRecSetKeyword;
			break;
		case MSG_ID_SPEECH_REC_SET_PASSWORD:
			handler = doSpeechRecSetPassword;
			break;
		case MSG_ID_SPEECH_REC_SET_MODE:
			handler = doSpeechRecSetMode;
			break;
		case MSG_ID_SPEECH_REC_READ:
			queryFlag = true;
			handler = getSpeechRecRead;
			break;
		case MSG_ID_IMAGE_REC_SET_MODE:
			handler = doImageRecSetMode;
			break;
		case MSG_ID_IMAGE_REC_COLOR_POSITION:
			queryFlag = true;
			handler = getImageRecColorPosition;
			break;
		case MSG_ID_IMAGE_REC_AUTO_TRACKING:
			queryFlag = true;
			handler = getImageRecAutoTracking;
			break;
		case MSG_ID_IMAGE_REC_LINE_FOLLOW:
			queryFlag = true;
			handler = getImageRecLineFollow;
			break;
		case MSG_ID_IMAGE_REC_VALUE:
			queryFlag = true;
			handler = getImageRecValue;
			break;
		default:
			return;
	}
	if(queryFlag){
		Serial.write(cmd, strlen(cmd));
	}
	handler(cmd);
	if(!queryFlag){
		Serial.write(cmd, strlen(cmd));
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
	for(int i=0; i<MAX_SERVO_COUNT; ++i){
		dc130[i].reset(sensor_port[i]);
	}
	pinMode(PORT_A, INPUT);
	pinMode(PORT_B, INPUT);
	pinMode(PORT_C, INPUT);
	pinMode(PORT_D, INPUT);
	pinMode(MINI_LEFT_RED, OUTPUT);
	pinMode(MINI_RIGHT_RED, OUTPUT);
	pinMode(MINI_LEFT_YELLOW, OUTPUT);
	pinMode(MINI_RIGHT_YELLOW, OUTPUT);
	pinMode(BATTERY_PIN, INPUT);
	ir.begin();
}

void setup()
{
	Serial.begin(115200);
	onSetup();
}

void loop()
{
	ir.loop();
	loopSerial();
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
