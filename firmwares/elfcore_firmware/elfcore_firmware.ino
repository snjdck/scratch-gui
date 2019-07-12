#include <WeELFCore.h>

#define FIRMWARE_VERSION "3"

#define LED_MATRIX_WIDTH 21


WeUltrasonicSensor ultraSensor;
WeLineFollower lineFollower;
WeLEDPanelModuleMatrix7_21 ledPanel;
WeDCMotor_S dc;
WeRGBLed led(OnBoard_RGB);

WeBuzzer buzzer(OnBoard_Buzzer);
WeInfraredReceiver ir(OnBoard_IR);


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

void setup()
{
  ir.begin();
  Serial.begin(115200);
}

void loop()
{
  ir.loop();
  get_serial_command();
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

void handle_serial_command(char *cmd)
{
  if(cmd[0] == 'M'){
    parseMcode(cmd);
  }
}

