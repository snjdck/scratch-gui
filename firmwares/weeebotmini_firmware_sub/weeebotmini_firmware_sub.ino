#include <WeELFMini.h>

#define NTD1 294
#define NTD2 330
#define NTD3 350
#define NTD4 393
#define NTD5 441
#define NTD6 495
#define NTD7 556
#define NTDL1 147
#define NTDL2 165
#define NTDL3 175
#define NTDL4 196
#define NTDL5 221
#define NTDL6 248
#define NTDL7 278
#define NTDH1 589
#define NTDH2 661
#define NTDH3 700
#define NTDH4 786
#define NTDH5 882
#define NTDH6 990
#define NTDH7 112

#define FIRMWARE_VERSION "3"

#define LED_MATRIX_WIDTH 14
#define DEFAULT_IR_PIN OnBoard_IR

WeInfraredReceiver ir(OnBoard_IR);
WeBuzzer buzzer(OnBoard_Buzzer);
WeLEDPanelModuleMatrix5_14 ledPanel(PORT_C);
WeIRAvoidSensor IRAvoid(PORT_B);
WeUltrasonicSensor ultraSensor;
WeSingleLineFollower singleLF(PORT_A);
/*
WeMP3 mp3;
WePIRSensor pir;
WeRGBLED_RJ rgb_led_RJ;
WeServo servo;
We130DCMotor dc130;
WeTiltSwitch tilt;
//*/

WeDCMotor dc;
WeDCMotor MotorL(M2);
WeDCMotor MotorR(M1);

const uint8_t sensor_port[4] = {PORT_A,PORT_B,PORT_C,PORT_D};
uint8_t sensor_slot[4] = {0};
WeOneWire portDetect;

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

void doDcSpeed(char *cmd)
{
	dc.reset(nextInt(&cmd));
	dc.run(nextInt(&cmd));
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

void doTone(char *cmd)
{
	int note = nextInt(&cmd);
	int hz   = nextInt(&cmd);
	buzzer.tone2(note, hz);
}

void getIRAvoid(char *cmd)
{
	int port = nextInt(&cmd);
	IRAvoid.reset(port);
	printBoolean(IRAvoid.isObstacle());
}

void getSingleLineFollower(char *cmd)
{
	int port = nextInt(&cmd);
	singleLF.reset(port);
	Serial.println(singleLF.read());
}

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

void doIRAvoidLed(char *cmd)
{
	int port = nextInt(&cmd);
	int index = nextInt(&cmd);
	int isOn = nextInt(&cmd);
	IRAvoid.reset(port);
	IRAvoid.setLed(index, isOn);
}

void doQueryVersion(char *cmd)
{
	Serial.println(FIRMWARE_VERSION);
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
	// loopSensor();
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
		case MSG_ID_BOARD_IR:
			queryFlag = true;
			handler = getIR;
			break;
		case MSG_ID_BOARD_SOUND:
			queryFlag = true;
			handler = getSound;
			break;
		case MSG_ID_BOARD_LIGHT:
			queryFlag = true;
			handler = getLightSensor;
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
		case MSG_ID_IR_AVOID_RGB:
			handler = doIRAvoidRGB;
			break;
		case MSG_ID_FRONT_LED:
		case MSG_ID_IR_AVOID_LED:
			handler = doIRAvoidLed;
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
		case MSG_ID_BACK_LED:
			handler = doBackLed;
			break;
		case MSG_ID_QUERY_VERSION:
			queryFlag = true;
			handler = doQueryVersion;
			break;
		default:
			/*
			mp3.reset(0);
			pir.reset(0);
			rgb_led_RJ.reset(0);
			servo.reset(0);
			dc130.reset(0);
			tilt.reset(0);
			//*/
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

enum{MODE_A, MODE_B, MODE_C, MODE_D, MODE_E, MODE_F};
byte mode = MODE_A;

enum{STOP, RUN_F, RUN_B, RUN_L, RUN_R}
motor_sta = STOP;

int moveSpeed = 150;

byte RGBUlt_flag = 0;

long command_timestamp = 0;
uint8_t prev_mode = mode;
byte prev_RGBUlt_flag = RGBUlt_flag;
int prev_moveSpeed = moveSpeed;
bool bluetoothMode = false;
bool isJoystickMode = false;
int joystickSpeedL = 0;
int joystickSpeedR = 0;

bool mode_flag;

void handle_command(uint8_t value)
{
	command_timestamp = millis();
	switch(value)
	{
	case IR_CONTROLLER_A:
		moveSpeed = 150;
		mode = MODE_A;
		mode_flag = 0;
		Stop();
		buzzer.tone2(NTD1, 300);
		break;
	case IR_CONTROLLER_B:
		moveSpeed = 100;
		mode = MODE_B;
		mode_flag = 0;
		Stop();
		buzzer.tone2(NTD2, 300);
		break;     
	case IR_CONTROLLER_C:
		mode = MODE_C;
		moveSpeed = 100;
		mode_flag = 0;
		Stop();
		buzzer.tone2(NTD3, 300);
		break;
	case IR_CONTROLLER_D:
		moveSpeed = 200;
		buzzer.tone2(NTD4, 300);
		break;
	case IR_CONTROLLER_E:   
		moveSpeed = 255;
		buzzer.tone2(NTD5, 300);
		break;       
	case IR_CONTROLLER_F:
		mode = MODE_F;
		moveSpeed = 100;
		Stop();
		buzzer.tone2(NTD6, 300);
		break;
	case IR_CONTROLLER_OK:
		RGBUlt_flag = (RGBUlt_flag + 1) % 3;
		if(RGBUlt_flag == 0){
			IRAvoid.setColor1(0, 0, 0);
    		IRAvoid.setColor2(0, 0, 0);
		}
		buzzer.tone2(NTD6, 300);
		break;
	case IR_CONTROLLER_UP:
		motor_sta = RUN_F;
		isJoystickMode = false;
		break;
	case IR_CONTROLLER_DOWN:
		motor_sta = RUN_B;
		isJoystickMode = false; 
		break;
	case IR_CONTROLLER_RIGHT:
		motor_sta = RUN_R;
		isJoystickMode = false;
		break;
	case IR_CONTROLLER_LEFT:
		motor_sta = RUN_L;
		isJoystickMode = false;
		break;
	case IR_CONTROLLER_9:
		setMoveSpeed(NTDH2, 9);
		break;
	case IR_CONTROLLER_8:
		setMoveSpeed(NTDH1, 8);
		break;
	case IR_CONTROLLER_7:
		setMoveSpeed(NTD7, 7);
		break;
	case IR_CONTROLLER_6:
		setMoveSpeed(NTD6, 6);
		break;
	case IR_CONTROLLER_5:
		setMoveSpeed(NTD5, 5);
		break;
	case IR_CONTROLLER_4:
		setMoveSpeed(NTD4, 4);
		break;
	case IR_CONTROLLER_3:
		setMoveSpeed(NTD3, 3);
		break;
	case IR_CONTROLLER_2:
		setMoveSpeed(NTD2, 2);
		break;
	case IR_CONTROLLER_1:
		setMoveSpeed(NTD1, 0);
		break;
	}
}

void setMoveSpeed(uint16_t frequency, int level)
{
	buzzer.tone2(frequency, 300);
	moveSpeed = level * 16 + 75;
}

void Forward()
{   
	motor_run(moveSpeed, moveSpeed);
}

void Backward()
{
   motor_run(-moveSpeed, -moveSpeed);
}
void TurnLeft()
{
   motor_run(-moveSpeed, moveSpeed);
}
void TurnRight()
{
   motor_run(moveSpeed, -moveSpeed);
}
void Stop()
{
	motor_run(0, 0);
}

void modeA()
{
	if(isJoystickMode){
		motor_run(joystickSpeedL, joystickSpeedR);
		return;
	}
	switch(motor_sta){
	case RUN_F:	Forward();	break;
	case RUN_B:	Backward();	break;
	case RUN_L:	TurnLeft();	break;
	case RUN_R:	TurnRight();break;
	case STOP:	Stop();		break;
	}
}

void setup()
{
	buzzer.tone(NTD1, 1000); 

	LED_LEFT_RED(true);
	LED_RIGHT_RED(true);
	LED_LEFT_YELLOW(true);
	LED_RIGHT_YELLOW(true);
	
	Stop();

	IRAvoid.LeftLED_ON();
	IRAvoid.RightLED_ON();

	ledPanel.setBrightness(5); 
	ledPanel.clearScreen();
	ledPanel.showLine(0,0x11);
	ledPanel.showLine(1,0x02);
	ledPanel.showLine(2,0x04);
	ledPanel.showLine(3,0x08);
	ledPanel.showLine(4,0x10);
	ledPanel.showLine(5,0x00);
	ledPanel.showLine(6,0x00);
	ledPanel.showLine(7,0x00);
	ledPanel.showLine(8,0x00);
	ledPanel.showLine(9,0x10);
	ledPanel.showLine(10,0x08);   
	ledPanel.showLine(11,0x04);
	ledPanel.showLine(12,0x02);
	ledPanel.showLine(13,0x11);
	buzzer.tone(NTD6, 300);

	Serial.begin(115200);
	ir.begin();
}

void loop()
{
	if(bluetoothMode){
		get_serial_command();
	}else if(Serial.available()){
		bluetoothMode = true;
	}else if(ir.decode()){
		handle_command(ir.value >> 16 & 0xFF);
	}

	if(mode_flag){
	    ir.loop();
	}

	if(millis() - command_timestamp > 120){
		command_timestamp = millis();
		motor_sta = STOP;
	}
	switch(mode){
	case MODE_A: modeA(); break;
	case MODE_B: modeB(); break;
	case MODE_C: modeC(); break;
	case MODE_F: modeF(); break;

	}
	if(RGBUlt_flag == 1){
		mode_RGBult();
	}
}

void modeB()
{
	static long time = millis();
	if(IRAvoid.isObstacle()){
		randomSeed(analogRead(6));
		uint8_t randNumber = random(2);
		if(randNumber){
			motor_run(-moveSpeed/5, -moveSpeed);
		}else{
			motor_run(-moveSpeed, -moveSpeed/5);
		}
		delay(500);
	}else{
		motor_run(moveSpeed, moveSpeed);
	}
}

void modeC()
{
	const int lineSpeed = 100;
	const int turnTime = 200;
	const int threshold = 500;

	static unsigned long turnTimeEnd = 0;
	static int tryLeftFirst = 1;
	static int turnCount = 0;

	if(singleLF.read() <= threshold){//forward
		motor_run(lineSpeed, lineSpeed);
		turnTimeEnd = 0;
		turnCount = 0;
	}else if(!turnTimeEnd){
		motor_run(-lineSpeed * tryLeftFirst, lineSpeed * tryLeftFirst);
		turnTimeEnd = millis() + turnTime * (1 << turnCount);
	}else if(millis() >= turnTimeEnd){
		turnTimeEnd = 0;
		tryLeftFirst = -tryLeftFirst;
		turnCount++;
	}
}

void modeF()
{
	const int ult_speed = 150;
	static int f_cout = 0;

	if(f_cout > 20){
		motor_run(0, ult_speed);
		delay(100);
		f_cout--;
	}else if(f_cout < 20){
		motor_run(ult_speed, 0);
		delay(100);
		f_cout++;
	}

	if(f_cout == 21){
		f_cout = 0;
	}else if(f_cout == 19){
		f_cout = 40;
	}
}

void mode_RGBult()
{
	static float j, f, k;
	j += random(1, 6) / 6.0;
	f += random(1, 6) / 6.0;
	k += random(1, 6) / 6.0;
	float red   = 64 * (1 + sin(1 / 2.0 + j / 4.0));
	float green = 64 * (1 + sin(1 / 1.0 + f / 9.0 + 2.1));
	float blue  = 64 * (1 + sin(1 / 3.0 + k / 14.0 + 4.2));
	IRAvoid.setColor1(red, green, blue);
    IRAvoid.setColor2(red, green, blue);
}

void motor_run(int lSpeed, int rSpeed)
{
	MotorL.run(-lSpeed);
	MotorR.run( rSpeed);
	if(lSpeed > 0 && rSpeed > 0){
		if(!mode_flag){
			LED_LEFT_RED(false);
			LED_RIGHT_RED(false);
			LED_LEFT_YELLOW(false);
			LED_RIGHT_YELLOW(false);
			IRAvoid.LeftLED_OFF();
			IRAvoid.RightLED_OFF();
		}
	}else if(lSpeed > 0 && rSpeed <= 0){
		if(!mode_flag){
			LED_LEFT_RED(false);
			LED_RIGHT_RED(false);
			LED_LEFT_YELLOW(false);
			LED_RIGHT_YELLOW(true);
			IRAvoid.LeftLED_OFF();
			IRAvoid.RightLED_ON();
		}
	}else if(lSpeed <= 0 && rSpeed > 0){
		if(!mode_flag){
			LED_LEFT_RED(false);
			LED_RIGHT_RED(false);
			LED_LEFT_YELLOW(true);
			LED_RIGHT_YELLOW(false);
			IRAvoid.LeftLED_ON();
			IRAvoid.RightLED_OFF();
		}
	}else{
		if(!mode_flag){
			LED_LEFT_RED(true);
			LED_RIGHT_RED(true); 
			LED_LEFT_YELLOW(false);
			LED_RIGHT_YELLOW(false);
			IRAvoid.LeftLED_OFF();
			IRAvoid.RightLED_OFF();
		}
	}
}

void get_serial_command()
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
			handle_serial_command(buffer);
			//memset(buffer, 0, buffer_len);
		}else{
			buffer[buffer_index] = nextChar;
			buffer_index = (buffer_index + 1) % buffer_len;
		}
	}
}

// int nextInt(char **cmd)
// {
// 	while(' ' != *(*cmd)++);
// 	return atoi(*cmd);
// }

bool isCmd(char *buffer, char *cmd)
{
	while(*cmd){
		if(*buffer != *cmd){
			return false;
		}
		++buffer;
		++cmd;
	}
	return true;
}

void serial_reply(char *buffer, char *info)
{
	Serial.write(buffer, strlen(buffer));
	Serial.println(info);
}

void handle_serial_command(char *cmd)
{
	if(isCmd(cmd, "VER")){
		serial_reply(cmd, "weeebotmini_A_1");
		return;
	}
	if(isCmd(cmd, "LFA")){
		serial_reply(cmd, "OK");
		ledPanel.clearScreen();
		return;
	}
	if(isCmd(cmd, "LF")){
		serial_reply(cmd, "OK");
		int x = nextInt(&cmd);
		int y = nextInt(&cmd);
		ledPanel.turnOffDot(x, y);
		return;
	}
	if(isCmd(cmd, "LO")){
		serial_reply(cmd, "OK");
		int x = nextInt(&cmd);
		int y = nextInt(&cmd);
		ledPanel.turnOnDot(x, y);
		return;
	}
	if(isCmd(cmd, "BZ")){
		int note = nextInt(&cmd);
		int hz   = nextInt(&cmd);
		buzzer.tone2(note, hz);
		return;
	}
	if(isCmd(cmd, "RGB")){
		int index = nextInt(&cmd);
		int r = nextInt(&cmd);
		int g = nextInt(&cmd);
		int b = nextInt(&cmd);
		IRAvoid.setColor(index, r, g, b);
		return;
	}
	if(isCmd(cmd, "JS")){
		isJoystickMode = true;
		joystickSpeedL = nextInt(&cmd);
		joystickSpeedR = nextInt(&cmd);
		return;
	}
	if(isCmd(cmd, "IR")){
		serial_reply(cmd, "OK");
		uint8_t code = atoi(cmd + 2);
		if(code == 1){
			mode = prev_mode;
			moveSpeed = prev_moveSpeed;
			RGBUlt_flag = prev_RGBUlt_flag; 
			buzzer.tone2(NTD1, 300);
		}else if(code == 2){
			prev_RGBUlt_flag = RGBUlt_flag;
			prev_moveSpeed = moveSpeed;
			prev_mode = mode;

			mode = MODE_A;
			RGBUlt_flag = 0;
			IRAvoid.setColor1(0, 0, 0);
    		IRAvoid.setColor2(0, 0, 0);
			motor_run(0, 0);
			buzzer.tone2(NTD1, 300);
		}else{
			mode_flag = 0;
			handle_command(code);
		}
		return;
	}
 
	if(cmd[0] == 'M'){
		mode_flag = 1;
    	parseMcode(cmd);
  	}
}
