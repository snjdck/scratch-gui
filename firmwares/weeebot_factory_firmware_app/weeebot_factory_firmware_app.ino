#include <WeELFPort.h>

WeRGBLed rgb(OnBoard_RGB);
WeInfraredReceiver ir(PORT_2);
WeBuzzer buzzer(OnBoard_Buzzer);
WeUltrasonicSensor ultraSensor(PORT_B);
WeLineFollower lineFollower(PORT_A);
WeLEDPanelModuleMatrix7_21 ledPanel(PORT_C);
WeButton button(OnBoard_Button);

WeDCMotor MotorL(M2);
WeDCMotor MotorR(M1);

int speedSetLeft = 0;
int speedSetRight = 0;
const int speedStep = 100;
const int delayInterval = 120;

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
#define RUN_B 0x01<<1
#define RUN_L 0x01<<2
#define RUN_R 0x01<<3
#define STOP 0

enum
{
  MODE_A,
  MODE_B,
  MODE_C,
  MODE_D,
  MODE_E,
  MODE_F
};

//boolean isAvailable = false;

int moveSpeed = 150;
int minSpeed = 75;

uint8_t motor_sta = STOP;
uint8_t mode = MODE_A;
uint8_t speed_flag=0;
uint8_t RGBUlt_flag=0;
uint8_t prevspeed_L = 0;
uint8_t prevspeed_R = 0;
int ult_speed=150;

long ir_timestamp = 0;
uint8_t prev_mode = mode;
uint8_t prev_RGBUlt_flag = RGBUlt_flag;
int prev_moveSpeed = moveSpeed;


void handle_ir_command(uint8_t value)
{
	switch (value)
    {
      case IR_CONTROLLER_A:
        speed_flag=0;
        moveSpeed = 150;
        mode = MODE_A;
        Stop();
        cli();
        buzzer.tone(NTD1, 300);
        sei();
        rgb.setColor(0,10,0,0);
        rgb.show();
        break;
      case IR_CONTROLLER_B:
        moveSpeed = 100;
        mode = MODE_B;
        Stop();
        cli();
        buzzer.tone(NTD2, 300);
        sei();
        rgb.setColor(0,0,10,0);
        rgb.show();
        break;     
      case IR_CONTROLLER_C:
        mode = MODE_C;
        moveSpeed = 100;
        Stop();
        cli();
        buzzer.tone(NTD3, 300);
        sei();
        rgb.setColor(0,0,0,10);
        rgb.show();
        break;
      case IR_CONTROLLER_D:
        speed_flag=1;
        moveSpeed = 200;
        cli();
        buzzer.tone(NTD4, 300);
        sei();
        rgb.setColor(0,10,10,0);
        rgb.show();
        break;
      case IR_CONTROLLER_E:   
        speed_flag=1;
        moveSpeed = 255;
        cli();
        buzzer.tone(NTD5, 300);
        sei();
        break;       
     case IR_CONTROLLER_F:
        mode = MODE_F;
        moveSpeed = 100;
        Stop();
        cli();
        buzzer.tone(NTD6, 300);
        sei();
        rgb.setColor(0,0,10,10);
        rgb.show();
        break;
     case IR_CONTROLLER_OK:
        RGBUlt_flag=!RGBUlt_flag;
        cli();
        buzzer.tone(NTD6, 300);
        sei();
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
        cli();
        buzzer.tone(NTDH2, 300);
        sei();
        moveSpeed=minSpeed+16*9;
        break;
      case IR_CONTROLLER_8:
        cli();
        buzzer.tone(NTDH1, 300);
        sei();
        moveSpeed=minSpeed+16*8;
        break;
      case IR_CONTROLLER_7:
        cli();
        buzzer.tone(NTD7, 300);
        sei();
        moveSpeed=minSpeed+16*7;
        break;
      case IR_CONTROLLER_6:
        cli();
        buzzer.tone(NTD6, 300);
        sei();
        moveSpeed=minSpeed+16*6;
        break;
      case IR_CONTROLLER_5:
        cli();
        buzzer.tone(NTD5, 300);
        sei();
         moveSpeed=minSpeed+16*5;    
        break;
      case IR_CONTROLLER_4:
        cli();
        buzzer.tone(NTD4, 300);
        sei();
        moveSpeed=minSpeed+16*4;  
        break;
      case IR_CONTROLLER_3:
        cli();
        buzzer.tone(NTD3, 300);
        sei();
        moveSpeed=minSpeed+16*3;   
        break;
      case IR_CONTROLLER_2:
        cli();
        buzzer.tone(NTD2, 300);
        sei();
        moveSpeed=minSpeed+16*2; 
        break;
      case IR_CONTROLLER_1:
        cli();
        buzzer.tone(NTD1, 300);
        sei();
        moveSpeed=minSpeed;   
        break;
    }
}

void get_ir_command()
{
  if (ir.decode())
  {
    uint32_t value = ir.value;
    ir_timestamp = millis();
    handle_ir_command(value >> 16 & 0xFF);
  }
  else if (millis() - ir_timestamp > 120)
  {
     motor_sta = STOP;
     ir_timestamp = millis();
  }
}

void SetDestSpeed(int value)
{
  while (speedSetLeft - value > speedStep){
      speedSetLeft -= speedStep;
      speedSetRight = speedSetLeft;
      doRun();
      delay(delayInterval);
    }
    speedSetLeft = speedSetRight = value;
    doRun();
}

void Forward()
{   
    if(speed_flag==0)
    {
       SetDestSpeed(-moveSpeed);
    }
    else
    {
       speedSetLeft = -moveSpeed;
       speedSetRight = -moveSpeed;
       doRun();
    }
}
void Backward()
{
   speedSetLeft = moveSpeed;
   speedSetRight = moveSpeed;
   doRun();
}
void TurnLeft()
{
   speedSetLeft = 0;
   speedSetRight = -moveSpeed;
   doRun();
}
void TurnRight()
{
   speedSetLeft = -moveSpeed;
   speedSetRight = 0;
   doRun();
}
void Stop()
{
   if(speed_flag==0)
   {
       SetDestSpeed(0);
   }
   else
   {
     speedSetLeft = 0;
     speedSetRight = 0;
     doRun();
   }
}

void doRun()
{ 
     MotorL.run(-speedSetLeft);
     MotorR.run(-speedSetRight);
}
//uint8_t prevState = 0;

void modeA()
{
  switch (motor_sta)
  {
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
  Stop();
  pinMode(10, INPUT);
 
 for(int i=0;i<10;i++)
 {
   rgb.setColorAt(0, i, 0, 0);  // led number, red, green, blue,
   rgb.show();  
   delay(20);   
 }
 buzzer.tone(NTD1, 500); 
 for(int i=0;i<15;i++)
 {
   rgb.setColorAt(0, 0, i, 0);  // led number, red, green, blue,
   rgb.show();
   delay(20);   
 }
 buzzer.tone(NTD1, 500); 
 for(int i=0;i<15;i++)
 {
   rgb.setColorAt(0, 0, 0, i);  // led number, red, green, blue,
   rgb.show();
   delay(20);   
 }
  buzzer.tone(NTD1, 500); 
 for(int i=0;i<10;i++)
 {
   rgb.setColorAt(0, i, i, i);  // led number, red, green, blue,
   rgb.show();
   delay(20);   
 }
  buzzer.tone(NTD6, 600); 
  Serial.begin(115200);
  ir.begin(); 
  ultraSensor.setColor1(0, 0, 0);
  ultraSensor.setColor2(0, 0, 0);
  ledPanel.setBrightness(7); 
  ledPanel.clearScreen(); 
  ledPanel.showLine(0,0x41);
  ledPanel.showLine(1,0x42);
  ledPanel.showLine(2,0x04);
  ledPanel.showLine(3,0x08);
  ledPanel.showLine(4,0x10);
  ledPanel.showLine(5,0x20);
  ledPanel.showLine(6,0x40);
  ledPanel.showLine(7,0x00);
  ledPanel.showLine(8,0x00);
  ledPanel.showLine(9,0x00);
  ledPanel.showLine(10,0x00);
  ledPanel.showLine(11,0x00);   
  ledPanel.showLine(12,0x00);
  ledPanel.showLine(13,0x00);
  ledPanel.showLine(14,0x40);
  ledPanel.showLine(15,0x20);
  ledPanel.showLine(16,0x10);
  ledPanel.showLine(17,0x08);
  ledPanel.showLine(18,0x04);
  ledPanel.showLine(19,0x42);  
  ledPanel.showLine(20,0x41); 
}

void loop()
{
    get_ir_command();
    loopSerial();

    switch (mode)
    {
      case MODE_A:
        modeA();
        break;
      case MODE_B:
        modeB();
        break;
      case MODE_C:
        modeC();
        break;
      case MODE_F:
        modeF();
        break;
    }
    mode_RGBult();
    if(button.read()==0)
    {
        pre_button();
    }
}

void modeB()
{
  uint8_t d = ultraSensor.distanceCm();
  static long time = millis();
  randomSeed(analogRead(6));
  uint8_t randNumber = random(2);
  if (d >=50 || d == 0)
  {
      MotorL.run(moveSpeed);
      MotorR.run(moveSpeed);
      delay(100);
  }
  else if ((d > 15) && (d < 50)) 
  {    
    switch (randNumber)
    {
      case 0:
     MotorL.run(moveSpeed);
     MotorR.run(-moveSpeed/5);
        delay(200);
        break;
      case 1:
    MotorL.run(-moveSpeed/5);
    MotorR.run(moveSpeed);
        delay(200);
        break;
    }
  }
  else if(d < 16)
  {
     MotorL.run(-moveSpeed); 
     MotorR.run(-moveSpeed);
     delay(300);
    
    switch (randNumber)
    {
      case 0:
     MotorL.run(moveSpeed); 
     MotorR.run(-moveSpeed);
        delay(300);
        break;
      case 1:
      MotorL.run(-moveSpeed); 
      MotorR.run(moveSpeed);
        delay(300);        
        break;
    }
  }
 // delay(10);
 }

 unsigned char flag=0;
 uint8_t line_speed=100;
void modeC()
{
    uint8_t s1,s2;
//    uint8_t line_speed=100;
    lineFollower.startRead();
    s1=lineFollower.readSensor1();
    s2=lineFollower.readSensor2();

    if((s1>160)&&(s2<160))
    { 
      flag=1;
      MotorL.run(line_speed);
      MotorR.run(line_speed);
      line_speed=line_speed+1;
     }
     else if((s1<=160)&&(s2>=160))
    {
      flag=2;
      MotorL.run(line_speed);
      MotorR.run(line_speed);
      line_speed=line_speed+1;
     }
     else if((s1<=160)&&(s2<=160))
    {
      if(flag==1)
      {
        
         MotorL.run(-line_speed);
         MotorR.run(line_speed);  
           line_speed=line_speed-20;    
        }
       else if(flag==2)
       {
       
         MotorL.run(line_speed);
         MotorR.run(-line_speed);   
         line_speed=line_speed-20;
        }
     }
     else
     {
        MotorL.run(line_speed);
        MotorR.run(line_speed);
         line_speed=line_speed+1;
      }
      if( line_speed<150)
       line_speed=150;
       if(line_speed>160)
       line_speed=160;
 }
 int f_cout=0;
 void modeF()
{
   if(f_cout>20)
   {
     MotorL.run(0);
     MotorR.run(ult_speed);
     delay(100);
     f_cout--;
   }
   else if(f_cout<20)
   {
     MotorL.run(ult_speed);
     MotorR.run(0);
     delay(100);
     f_cout++;
    }
   if(f_cout==21)
   {
       f_cout=0;
    }
    if(f_cout==19)
   {
       f_cout=40;
    }
 }
 
float j, f, k;
void mode_RGBult()
{
  if (RGBUlt_flag==1)
  {
    float red,green,blue;
    j += random(1, 6) / 6.0;
    f += random(1, 6) / 6.0;
    k += random(1, 6) / 6.0;
    red  = 64 * (1 + sin(1 / 2.0 + j / 4.0) );
    green = 64 * (1 + sin(1 / 1.0 + f / 9.0 + 2.1) );
    blue = 64 * (1 + sin(1 / 3.0 + k / 14.0 + 4.2) );
    ultraSensor.setColor1(red, green, blue);
    ultraSensor.setColor2(red, green, blue);
  } 
}
void pre_button()
{
   if( mode==MODE_A)
   {
      mode = MODE_B;
      Stop();
      cli();
      buzzer.tone(NTD2, 300);
      sei();
      rgb.setColor(0,0,10,0);
      rgb.show();
   }
   else if( mode==MODE_B)
   {
      mode = MODE_C;
      Stop();
      cli();
      buzzer.tone(NTD3, 300);
      sei();
      rgb.setColor(0,0,0,10);
      rgb.show();
   }
   else
   {
      mode = MODE_A;
      Stop();
      cli();
      buzzer.tone(NTD1, 300);
      sei();
      rgb.setColor(0,10,0,0);
      rgb.show();
   }
   delay(500);
}

int nextInt(char **cmd)
{
	while(' ' != *(*cmd)++);
	return atoi(*cmd);
}
void replyOK()
{
	Serial.println("OK");
}

void parseCmd(char *cmd)
{
	if(cmd[0] == 'L'){
    Serial.write(cmd, strlen(cmd));
    if(cmd[1] == 'F' && cmd[2] == 'A'){
      ledPanel.clearScreen();
      replyOK();
      return;
    }
		bool on = false;
		if(cmd[1] == 'O'){
			on = true;
		}else if(cmd[1] != 'F'){
			return;
		}
		int x = nextInt(&cmd);
		int y = nextInt(&cmd);
		if(on){
			ledPanel.turnOnDot(x, y);
		}else{
			ledPanel.turnOffDot(x, y);
		}
		replyOK();
	}else if(cmd[0] == 'I' && cmd[1] == 'R'){
    Serial.write(cmd, strlen(cmd));
		uint8_t code = atoi(cmd + 2);
		if(code == 1){
			mode = prev_mode;
			moveSpeed = prev_moveSpeed;
			RGBUlt_flag = prev_RGBUlt_flag;
			cli();
			buzzer.tone(NTD1, 300);
			sei();
		}else if(code == 2){
			prev_RGBUlt_flag = RGBUlt_flag;
			prev_moveSpeed = moveSpeed;
			prev_mode = mode;

			mode = MODE_A;
			RGBUlt_flag = 0;
			MotorL.run(0);
     		MotorR.run(0);
     		cli();
			buzzer.tone(NTD1, 300);
			sei();
		}else{
			handle_ir_command(code);
			ir_timestamp = millis();
		}
		replyOK();
	}else if(cmd[0] == 'V' && cmd[1] == 'E' && cmd[2] == 'R'){
		Serial.write(cmd, strlen(cmd));
		Serial.println("weeebot_A_1");
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
			memset(buffer, 0, buffer_len);
		}else{
			buffer[buffer_index] = nextChar;
			buffer_index = (buffer_index + 1) % buffer_len;
		}
	}
}
