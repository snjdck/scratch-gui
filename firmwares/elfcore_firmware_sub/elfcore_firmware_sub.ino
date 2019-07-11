#include <WeELFCore.h>

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

#define LED_MATRIX_WIDTH 21


WeUltrasonicSensor ultraSensor;
WeLineFollower lineFollower;
WeLEDPanelModuleMatrix7_21 ledPanel;
WeDCMotor_S dc;
WeRGBLed led(OnBoard_RGB);
WeRGBLed& rgb = led;

WeBuzzer buzzer(OnBoard_Buzzer);
WeInfraredReceiver ir(OnBoard_IR);

WeDCMotor_S MotorL(M2);
WeDCMotor_S MotorR(M1);

const uint8_t MSG_ID_BOARD_BUTTON = 0;
const uint8_t MSG_ID_LED_MATRIX_PIXEL_SHOW = 1;
const uint8_t MSG_ID_LED_MATRIX_PIXEL_HIDE = 2;
const uint8_t MSG_ID_LED_MATRIX_CLEAR = 3;
const uint8_t MSG_ID_QUERY_VERSION = 5;
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
//const uint8_t MSG_ID_FRONT_LED = 120;
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

const uint8_t MSG_ID_IR_SENDER = 220;
const uint8_t MSG_ID_ADAPTER_DIGITAL_WRITE = 221;
const uint8_t MSG_ID_ADAPTER_SERVO = 222;
const uint8_t MSG_ID_ADAPTER_RGB = 223;
const uint8_t MSG_ID_ADAPTER_DIGITAL_READ = 224;
const uint8_t MSG_ID_ADAPTER_ANALOG_READ = 225;
const uint8_t MSG_ID_ADAPTER_TEMPERATURE = 226;


// parse pin, 0~13 digital, 14.. analog pin


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

void doRgb(char * cmd)
{
	nextStr(&cmd);
	int port, pix, r, g, b;
	parsePinVal(cmd, &port, &pix, &r, &g, &b);
	led.reset(port);
	led.setColor(pix, r, g, b);
	led.show();
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
  if(pin == A7){
    pinMode(pin, INPUT);
    Serial.println(analogRead(pin));
  }else{
    WeLightSensor_RJ lightSensorRJ11(pin);
    Serial.println(lightSensorRJ11.read());
  }
	
}

void getSound(char *cmd)
{
	uint8_t pin = nextInt(&cmd);
	WeSoundSensor_RJ soundSensorRJ11(pin);
  Serial.println(soundSensorRJ11.read());
}

void getIR(char *cmd)
{
	uint8_t pin = nextInt(&cmd);
	ir.reset(pin);
	int code = nextInt(&cmd);
	printBoolean(ir.isKeyPressed(code));
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


void getSoil(char *cmd)
{
	int pin = nextInt(&cmd);
	Serial.println(analogRead(pin));
}

void doSingleLed(char *cmd)
{
	int port = nextInt(&cmd);
	int isOn = nextInt(&cmd);
	pinMode(port, OUTPUT);
	digitalWrite(port, isOn);
}

void doQueryVersion(char *cmd)
{
	Serial.println(FIRMWARE_VERSION);
}

void doSendIR(char *cmd)
{
  int code = nextInt(&cmd);
  int group = nextInt(&cmd);
  WeInfraredSender ir_sender(OnBoard_IR_T);
  ir_sender.send_nec_message(group, code);
}

void doAdapterDigitalWrite(char *cmd)
{
  int port = nextInt(&cmd);
  int index = nextInt(&cmd);
  int value = nextInt(&cmd);
  WeAdapter adapter(port);
  adapter.digitalWrite(index, value);
}

void doAdapterServo(char *cmd)
{
  int port = nextInt(&cmd);
  int index = nextInt(&cmd);
  int value = nextInt(&cmd);
  WeAdapter adapter(port);
  adapter.write(index, value);
}

void doAdapterRGB(char *cmd)
{
  int port = nextInt(&cmd);
  int index = nextInt(&cmd);
  int led_index = nextInt(&cmd);
  int r = nextInt(&cmd);
  int g = nextInt(&cmd);
  int b = nextInt(&cmd);
  WeAdapter adapter(port);
  adapter.RGBshow(index, led_index, r, g, b);
}

void getAdapterDigitalRead(char *cmd)
{
  int port = nextInt(&cmd);
  int index = nextInt(&cmd);
  WeAdapter adapter(port);
  Serial.println(adapter.digitalRead(index));
}

void getAdapterAnalogRead(char *cmd)
{
  int port = nextInt(&cmd);
  int index = nextInt(&cmd);
  WeAdapter adapter(port);
  Serial.println(adapter.analogRead(index));
}

void getAdapterTemperature(char *cmd)
{
  int port = nextInt(&cmd);
  int index = nextInt(&cmd);
  WeAdapter adapter(port);
  Serial.println(adapter.readTemperature(index));
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
		case MSG_ID_ULTRASONIC_RGB:
			handler = doUltrasonicRGB;
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

		case MSG_ID_SINGLE_LED:
			handler = doSingleLed;
			break;

		case MSG_ID_SOIL:
			queryFlag = true;
			handler = getSoil;
			break;
		case MSG_ID_QUERY_VERSION:
			queryFlag = true;
			handler = doQueryVersion;
			break;
    case MSG_ID_IR_SENDER:
      handler = doSendIR;
      break;
    case MSG_ID_ADAPTER_DIGITAL_WRITE:
      handler = doAdapterDigitalWrite;
      break;
    case MSG_ID_ADAPTER_SERVO:
      handler = doAdapterServo;
      break;
    case MSG_ID_ADAPTER_RGB:
      handler = doAdapterRGB;
      break;
    case MSG_ID_ADAPTER_DIGITAL_READ:
      queryFlag = true;
      handler = getAdapterDigitalRead;
      break;
    case MSG_ID_ADAPTER_ANALOG_READ:
      queryFlag = true;
      handler = getAdapterAnalogRead;
      break;
    case MSG_ID_ADAPTER_TEMPERATURE:
      queryFlag = true;
      handler = getAdapterTemperature;
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


enum{MODE_A, MODE_B, MODE_C, MODE_D, MODE_E, MODE_F};
byte mode = MODE_A;

enum{STOP, RUN_F, RUN_B, RUN_L, RUN_R}
motor_sta = STOP;

int moveSpeed = 150;

int speedSetLeft = 0;
int speedSetRight = 0;

bool speed_flag = false;
byte RGBUlt_flag = false;

long command_timestamp = 0;
uint8_t prev_mode = mode;
byte prev_RGBUlt_flag = RGBUlt_flag;
int prev_moveSpeed = moveSpeed;
bool bluetoothMode = false;
bool isJoystickMode = false;
int joystickSpeedL = 0;
int joystickSpeedR = 0;

void handle_command(uint8_t value)
{
  command_timestamp = millis();
  switch(value)
  {
  case IR_CONTROLLER_A:
    speed_flag = false;
    moveSpeed = 150;
    mode = MODE_A;
    Stop();
    buzzer.tone2(NTD1, 300);
    rgb.setColor(0,10,0,0);
    rgb.show();
    break;
  case IR_CONTROLLER_B:
    moveSpeed = 100;
    mode = MODE_B;
    Stop();
    buzzer.tone2(NTD2, 300);
    rgb.setColor(0,0,10,0);
    rgb.show();
    break;     
  case IR_CONTROLLER_C:
    mode = MODE_C;
    moveSpeed = 100;
    Stop();
    buzzer.tone2(NTD3, 300);
    rgb.setColor(0,0,0,10);
    rgb.show();
    break;
  case IR_CONTROLLER_D:
    speed_flag = true;
    moveSpeed = 200;
    buzzer.tone2(NTD4, 300);
    rgb.setColor(0,10,10,0);
    rgb.show();
    break;
  case IR_CONTROLLER_E:   
    speed_flag = true;
    moveSpeed = 255;
    buzzer.tone2(NTD5, 300);
    break;       
  case IR_CONTROLLER_F:
    mode = MODE_F;
    moveSpeed = 100;
    Stop();
    buzzer.tone2(NTD6, 300);
    rgb.setColor(0,0,10,10);
    rgb.show();
    break;
  case IR_CONTROLLER_OK:
    RGBUlt_flag = (RGBUlt_flag + 1) % 3;
    if(RGBUlt_flag == 0){
      ultraSensor.setColor1(0, 0, 0);
        ultraSensor.setColor2(0, 0, 0);
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

void SetDestSpeed(int value)
{
  const int speedStep = 100;
  const int sleepTime = 120;
  for(;;){
    int lspeed = speedStep + speedSetLeft;
    int rspeed = speedStep + speedSetRight;
    
    if(lspeed < value && rspeed < value){
      doRun(lspeed, rspeed);
      delay(sleepTime);
    }else if(lspeed < value){
      doRun(lspeed, value);
      delay(sleepTime);
    }else if(rspeed < value){
      doRun(value, rspeed);
      delay(sleepTime);
    }else{
      doRun(value, value);
      break;
    }
  }
}

void Forward()
{   
  if(speed_flag){
    doRun(moveSpeed, moveSpeed);
  }else{
    SetDestSpeed(moveSpeed);
  }
}

void Backward()
{
   doRun(-moveSpeed, -moveSpeed);
}
void TurnLeft()
{
   doRun(0, moveSpeed);
}
void TurnRight()
{
   doRun(moveSpeed, 0);
}
void Stop()
{
  if(speed_flag){
    doRun(0, 0);
  }else{
    SetDestSpeed(0);
  }
}

void doRun(int lspeed, int rspeed)
{
  speedSetLeft = lspeed;
  speedSetRight = rspeed;
  motor_run(lspeed, rspeed);
}

void modeA()
{
  if(isJoystickMode){
    motor_run(joystickSpeedL, joystickSpeedR);
    return;
  }
  switch(motor_sta){
  case RUN_F: Forward();  break;
  case RUN_B: Backward(); break;
  case RUN_L: TurnLeft(); break;
  case RUN_R: TurnRight();break;
  case STOP:  Stop();   break;
  }
}

void setup()
{
  pinMode(OnBoard_Button, INPUT);
  Stop();

  for(int i=0;i<10;i++){
    rgb.setColor(0, i, 0, 0);  // led number, red, green, blue,
    rgb.show();
    delay(20);
  }
  buzzer.tone(NTD1, 500);
  for(int i=0;i<15;i++){
    rgb.setColor(0, 0, i, 0);  // led number, red, green, blue,
    rgb.show();
    delay(20);
  }
  buzzer.tone(NTD1, 500); 
  for(int i=0;i<15;i++){
    rgb.setColor(0, 0, 0, i);  // led number, red, green, blue,
    rgb.show();
    delay(20);   
  }
  buzzer.tone(NTD1, 500); 
  for(int i=0;i<10;i++){
    rgb.setColor(0, i, i, i);  // led number, red, green, blue,
    rgb.show();
    delay(20);   
  }
  buzzer.tone(NTD6, 600);
  
  loopSensor();
  ultraSensor.setColor1(0, 0, 0);
  ultraSensor.setColor2(0, 0, 0);
  ledPanel.setBrightness(7);
  uint8_t bitmap[] = {0x41,0x42,0x04,0x08,0x10,0x20,0x40,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x40,0x20,0x10,0x08,0x04,0x42,0x41};
  ledPanel.showBitmap(0, 0, bitmap);

  ir.begin();
  Serial.begin(115200);
}

void bindSensor(uint8_t sensorType, uint8_t port)
{
  switch(sensorType){
  case 1:
    ultraSensor.reset(port);
    break;
  case 2:
    lineFollower.reset(port);
    break;
  case 3:
    ledPanel.reset(port);
    break;
  }
}

void loopSensor()
{
  const uint8_t sensor_port[] = {PORT_A, PORT_B, PORT_C, PORT_D};
  WeOneWire portDetect;

  for(int i=0; i<4; ++i){
    uint8_t port = sensor_port[i];
    if(!digitalRead(port)){
      continue;
    }
    //delay(400);
    portDetect.reset(port);
    portDetect.reset();
    portDetect.write_byte(0x01);
    portDetect.respond();

    uint8_t sensorType = portDetect.read_byte();
    bindSensor(sensorType, port);
  }
}

void loop()
{
  ErrorStatus ir_result = ir.loop();
  if(bluetoothMode){
    get_serial_command();
  }else if(Serial.available()){
    bluetoothMode = true;
  }else if(ir_result){
    handle_command(ir.value >> 16 & 0xFF);
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
  if(!digitalRead(OnBoard_Button)){
    pre_button();
  }
}

void modeB()
{
  randomSeed(analogRead(6));
  uint8_t d = ultraSensor.distanceCm();
  
  if(d >= 50 || d == 0){
    motor_run(moveSpeed, moveSpeed);
    delay(100);
  }else if (d > 15){
    switch(random(2)){
    case 0:
      motor_run(moveSpeed, -moveSpeed/5);
      break;
    case 1:
      motor_run(-moveSpeed/5, moveSpeed);
      break;
    }
    delay(200);
  }else{
    motor_run(-moveSpeed, -moveSpeed);
    delay(300);
    switch(random(2)){
    case 0:
      motor_run(moveSpeed, -moveSpeed);
      break;
    case 1:
      motor_run(-moveSpeed, moveSpeed);
      break;
    }
    delay(300);
  }
}

void modeC()
{
  const int base = 500;
  static uint8_t line_speed = 100;
  static uint8_t flag = 0;

  lineFollower.startRead();
  bool L_IN = lineFollower.readSensor1() < base;
  bool R_IN = lineFollower.readSensor2() < base;

  if(L_IN && R_IN){
    motor_run(line_speed, line_speed);
    ++line_speed;
  }else if(L_IN && !R_IN){
    flag = 1;
    motor_run(line_speed, line_speed);
    ++line_speed;
  }else if(!L_IN && R_IN){
    flag = 2;
    motor_run(line_speed, line_speed);
    ++line_speed;
  }else if(flag == 1){
    motor_run(-line_speed, line_speed);
    line_speed -= 20;
  }else if(flag == 2){
    motor_run(line_speed, -line_speed);
    line_speed -= 20;
  }
  if(line_speed < 150)
    line_speed = 150;
  else if(line_speed > 160)
    line_speed = 160;
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
  ultraSensor.setColor1(red, green, blue);
  ultraSensor.setColor2(red, green, blue);
}

void pre_button()
{
  Stop();
  mode = (mode + 1) % MODE_D;
  switch(mode){
  case MODE_A:
    buzzer.tone2(NTD1, 300);
    rgb.setColor(0,10,0,0);
    break;
  case MODE_B:
    buzzer.tone2(NTD2, 300);
    rgb.setColor(0,0,10,0);
    break;
  case MODE_C:
    buzzer.tone2(NTD3, 300);
    rgb.setColor(0,0,0,10);
    break;
  }
  rgb.show();
  delay(500);
}

void motor_run(int lspeed, int rspeed)
{
  MotorL.run(-lspeed);
  MotorR.run(rspeed);
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
    serial_reply(cmd, "weeebot_A_1");
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
    ultraSensor.setColor(index, r, g, b);
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
      ultraSensor.setColor1(0, 0, 0);
        ultraSensor.setColor2(0, 0, 0);
      motor_run(0, 0);
      buzzer.tone2(NTD1, 300);
    }else{
      handle_command(code);
    }
    return;
  }
  if(cmd[0] == 'M'){
    parseMcode(cmd);
  }
}

