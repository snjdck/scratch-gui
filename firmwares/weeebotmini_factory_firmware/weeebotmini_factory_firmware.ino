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

WeInfraredReceiver ir(OnBoard_IR);
WeBuzzer buzzer(OnBoard_Buzzer);
WeLEDPanelModuleMatrix5_14 ledPanel(PORT_C);
WeIRAvoidSensor IRAvoid(PORT_B);
WeSingleLineFollower singleLF(PORT_A);

WeDCMotor MotorL(M2);
WeDCMotor MotorR(M1);

enum{MODE_A, MODE_B, MODE_C, MODE_D, MODE_E, MODE_F};
byte mode = MODE_A;

enum{STOP, RUN_F, RUN_B, RUN_L, RUN_R}
motor_sta = STOP;

int moveSpeed = 150;

bool RGBUlt_flag = false;

long command_timestamp = 0;
uint8_t prev_mode = mode;
bool prev_RGBUlt_flag = RGBUlt_flag;
int prev_moveSpeed = moveSpeed;
bool bluetoothMode = false;

void handle_command(uint8_t value)
{
	command_timestamp = millis();
	switch(value)
	{
	case IR_CONTROLLER_A:
		moveSpeed = 150;
		mode = MODE_A;
		Stop();
		buzzer.tone2(NTD1, 300);
		break;
	case IR_CONTROLLER_B:
		moveSpeed = 100;
		mode = MODE_B;
		Stop();
		buzzer.tone2(NTD2, 300);
		break;     
	case IR_CONTROLLER_C:
		mode = MODE_C;
		moveSpeed = 100;
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
		RGBUlt_flag = !RGBUlt_flag;
		buzzer.tone2(NTD6, 300);
		break;
	case IR_CONTROLLER_UP:
		motor_sta = RUN_F;
		break;
	case IR_CONTROLLER_DOWN:
		motor_sta = RUN_B;  
		break;
	case IR_CONTROLLER_RIGHT:
		motor_sta = RUN_R;
		break;
	case IR_CONTROLLER_LEFT:
		motor_sta = RUN_L;
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
	if(RGBUlt_flag){
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
	const int lineFollowerSpeed = 100;
	const int turnTime = 200;
	const int threshold = 500;

	static unsigned long turnTimeEnd = 0;
	static int tryLeftFirst = 1;
	static int turnCount = 0;

	if(singleLF.read() >= threshold){//forward
		motor_run(lineFollowerSpeed, lineFollowerSpeed);
		turnTimeEnd = 0;
		turnCount = 0;
	}else if(!turnTimeEnd){
		motor_run(-lineFollowerSpeed * tryLeftFirst, lineFollowerSpeed * tryLeftFirst);
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

int nextInt(char **cmd)
{
	while(' ' != *(*cmd)++);
	return atoi(*cmd);
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
			RGBUlt_flag = false;
			motor_run(0, 0);
			buzzer.tone2(NTD1, 300);
		}else{
			handle_command(code);
		}
		return;
	}
}
