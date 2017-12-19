#include <WeELFMini.h>

WeIRAvoidSensor IRAvoid(PORT_C);
WeBuzzer buzzer(OnBoard_Buzzer);
WeInfraredReceiver ir(OnBoard_IR);
WeSingleLineFollower singleLF(PORT_A);
WeLEDPanelModuleMatrix7_21 ledPanel(PORT_B);

WeDCMotor MotorR(M2);
WeDCMotor MotorL(M1);

int speedSetLeft = 0;
int speedSetRight = 0;
const int speedStep = 100;
const int delayInterval = 120;
long command_timestamp = 0;
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
const int lineFollowerSpeed = 100;

uint8_t motor_sta = STOP;
uint8_t mode = MODE_A;
uint8_t speed_flag=0;
uint8_t RGBUlt_flag=0;
uint8_t prevspeed_L = 0;
uint8_t prevspeed_R = 0;
int ult_speed=150;

void handle_command(uint8_t value)
{
  command_timestamp = millis();
 
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
        break;
      case IR_CONTROLLER_B:
        moveSpeed = 100;
        mode = MODE_B;
        Stop();
        cli();
        buzzer.tone(NTD2, 300);
        sei();
        break;     
      case IR_CONTROLLER_C:
        mode = MODE_C;
        moveSpeed = 100;
        Stop();
        cli();
        buzzer.tone(NTD3, 300);
        sei();
        break;
      case IR_CONTROLLER_D:
        speed_flag=1;
        moveSpeed = 200;
        cli();
        buzzer.tone(NTD4, 300);
        sei();
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
/*
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
*/
void Forward()
{  /* 
    if(speed_flag==0)
    {
       SetDestSpeed(-moveSpeed);
    }
    else
    {*/
       speedSetLeft = moveSpeed;
       speedSetRight = -moveSpeed;
       doRun();
   // }
}
void Backward()
{
   speedSetLeft = -moveSpeed;
   speedSetRight = moveSpeed;
   doRun();
}
void TurnLeft()
{
//   speedSetLeft = 0;
   speedSetRight = -moveSpeed;
   speedSetLeft = -moveSpeed;
   doRun();
}
void TurnRight()
{
   speedSetLeft = moveSpeed;
   speedSetRight = moveSpeed;
//   speedSetRight = 0;
   doRun();
}
void Stop()
{/*
   if(speed_flag==0)
   {
       SetDestSpeed(0);
   }
   else
   {*/
     speedSetLeft = 0;
     speedSetRight = 0;
     doRun();
  // }
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
#define MINI_LIFT_RED       4
#define MINI_RIGHT_RED      3
#define MINI_LIFT_YELLOW   A0
#define MINI_RIGHT_YELLOW  13
void setup()
{
   buzzer.tone(NTD1, 1000); 
   pinMode(MINI_LIFT_RED, OUTPUT);
    pinMode(MINI_RIGHT_RED, OUTPUT);
    pinMode(MINI_LIFT_YELLOW, OUTPUT);
    pinMode(MINI_RIGHT_YELLOW, OUTPUT);  
  digitalWrite(MINI_LIFT_RED, HIGH);
  digitalWrite(MINI_RIGHT_RED, HIGH);
  digitalWrite(MINI_LIFT_YELLOW, HIGH);
  digitalWrite(MINI_RIGHT_YELLOW, HIGH);
   Stop();  
  
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
  
 //  IRAvoid.setColor1(200,200,200);    //(Red,Green,Blue)
 //  IRAvoid.setColor2(200,200,200);    //(Red,Green,Blue)  
   buzzer.tone(NTD6, 300);
   
  Serial.begin(115200);
  ir.begin(); 

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
      memset(buffer, 0, buffer_len);
    }else{
      buffer[buffer_index] = nextChar;
      buffer_index = (buffer_index + 1) % buffer_len;
    }
  }
}

bool bluetoothMode = false;
void loop()
{
 //   get_ir_command();
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
    mode_RGBult();
}

void modeB()
{
  static long time = millis();
  if(IRAvoid.isObstacle()==1)
  {
    randomSeed(analogRead(6));
    uint8_t randNumber = random(2);
    switch (randNumber)
    {
      case 0:
       MotorL.run(moveSpeed);
       MotorR.run(-moveSpeed/5);
        delay(500);
        break;
      case 1:
      MotorL.run(moveSpeed/5);
      MotorR.run(-moveSpeed);
        delay(500);
        break;
    }
  }
  else
  {
      MotorL.run(-moveSpeed);
      MotorR.run(moveSpeed);
   }
 }


void modeC()
{
  const int turnTime = 300;
  const int threshold = 500;
  static bool tryLeftFirst = true;
  if(singleLF.read() >= threshold){//forward
    MotorL.run(-lineFollowerSpeed);
    MotorR.run(lineFollowerSpeed);
    return;
  }
  turn(tryLeftFirst);
  if(check(threshold, turnTime))return;
  tryLeftFirst = !tryLeftFirst;
  turn(tryLeftFirst);
  check(threshold, 5000);
}

bool check(int threshold, int turnTime)
{
  byte value = 0;
  unsigned long timeEnd = millis() + turnTime;
  while(millis() < timeEnd){
    value <<= 1;
    value |= singleLF.read() >= threshold;
    if((value & 3) == 3){
      return true;
    }
  }
  return false;
}

void turn(bool tryLeftFirst)
{
  if(tryLeftFirst){
    MotorL.run(lineFollowerSpeed);
    MotorR.run(lineFollowerSpeed);
  }else{
    MotorL.run(-lineFollowerSpeed);
    MotorR.run(-lineFollowerSpeed);
  }
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
     MotorL.run(-ult_speed);
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
    IRAvoid.setColor1(red, green, blue);
    IRAvoid.setColor2(red, green, blue);
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

int nextInt(char **cmd)
{
  while(' ' != *(*cmd)++);
  return atoi(*cmd);
}
void motor_run(int lspeed, int rspeed)
{
  MotorL.run(lspeed);
  MotorR.run(rspeed);
}

void serial_reply(char *buffer, char *info)
{
  Serial.write(buffer, strlen(buffer));
  Serial.println(info);
}
uint8_t prev_mode = mode;
int prev_moveSpeed = moveSpeed;
bool prev_RGBUlt_flag = RGBUlt_flag;
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
