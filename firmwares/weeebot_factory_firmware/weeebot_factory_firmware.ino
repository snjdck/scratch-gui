#include <WeELFPort.h>

WeRGBLed rgb(OnBoard_RGB);
WeInfraredReceiver ir(PORT_2);
WeBuzzer buzzer(OnBoard_Buzzer);

WeUltrasonicSensor ultraSensor;
WeLineFollower lineFollower;
WeLEDPanelModuleMatrix7_21 ledPanel;

WeDCMotor MotorL(M2);
WeDCMotor MotorR(M1);

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

#define RUN_F 0x01
#define RUN_B 0x02
#define RUN_L 0x04
#define RUN_R 0x08
#define STOP 0

enum{MODE_A, MODE_B, MODE_C, MODE_D, MODE_E, MODE_F};

int moveSpeed = 150;

int speedSetLeft = 0;
int speedSetRight = 0;

uint8_t motor_sta = STOP;
uint8_t mode = MODE_A;
bool speed_flag = false;
bool RGBUlt_flag = false;

void get_ir_command()
{
	static long time = millis();
	if(ir.decode()){
		uint32_t value = ir.value;
		time = millis();
		switch(value >> 16 & 0xff)
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
	}else if(millis() - time > 120){
		motor_sta = STOP;
		time = millis();
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
	switch(motor_sta){
	case RUN_F:
		Forward();
		break;
	case RUN_B:
		Backward();
		break;
	case RUN_L:
		TurnLeft();
		break;
	case RUN_R:
		TurnRight();
		break;
	case STOP:
		Stop();
		break;
	}
}

void setup()
{
	pinMode(OnBoard_Button, INPUT);
	Stop();

	for(int i=0;i<10;i++){
		rgb.setColorAt(0, i, 0, 0);  // led number, red, green, blue,
		rgb.show();
		delay(20);
	}
	buzzer.tone(NTD1, 500);
	for(int i=0;i<15;i++){
		rgb.setColorAt(0, 0, i, 0);  // led number, red, green, blue,
		rgb.show();
		delay(20);
	}
	buzzer.tone(NTD1, 500); 
	for(int i=0;i<15;i++){
		rgb.setColorAt(0, 0, 0, i);  // led number, red, green, blue,
		rgb.show();
		delay(20);   
	}
	buzzer.tone(NTD1, 500); 
	for(int i=0;i<10;i++){
		rgb.setColorAt(0, i, i, i);  // led number, red, green, blue,
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
}

void loopSensor()
{
	const uint8_t sensor_port[4] = {PORT_A, PORT_B, PORT_C, PORT_D};
	static uint8_t sensor_slot[4] = {0};
	static WeOneWire portDetect;

	for(int i=0; i<sizeof(sensor_slot); ++i){
		if(sensor_slot[i] > 0 == digitalRead(sensor_port[i])){
			continue;
		}
		if(sensor_slot[i] > 0){
			sensor_slot[i] = 0;
			continue;
		}
		//delay(400);
		portDetect.reset(sensor_port[i]);
		portDetect.reset();
		portDetect.write_byte(0x01);
		portDetect.respond();
		sensor_slot[i] = portDetect.read_byte();

		switch(sensor_slot[i]){
		case 1:
			ultraSensor.reset(sensor_port[i]);
			break;
		case 2:
			lineFollower.reset(sensor_port[i]);
			break;
		case 3:
			ledPanel.reset(sensor_port[i]);
			break;
		}
	}
}

void loop()
{
	get_ir_command();
	switch(mode){
	case MODE_A: modeA(); break;
	case MODE_B: modeB(); break;
	case MODE_C: modeC(); break;
	case MODE_F: modeF(); break;
	}
	if(RGBUlt_flag){
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
	const uint8_t base = 160;
	static uint8_t line_speed = 100;
	static uint8_t flag = 0;

	lineFollower.startRead();
	bool L_IN = lineFollower.readSensor1() > base;
	bool R_IN = lineFollower.readSensor2() > base;

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
	MotorL.run(lspeed);
	MotorR.run(rspeed);
}