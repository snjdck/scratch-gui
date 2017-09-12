/*************************************************************************
* File Name          : mbot_factory_firmware.ino
* Author             : Ander, Mark Yan
* Updated            : Ander, Mark Yan
* Version            : V06.01.007
* Date               : 07/06/2016
* Description        : Firmware for Makeblock Electronic modules with Scratch.  
* License            : CC-BY-SA 3.0
* Copyright (C) 2013 - 2016 Maker Works Technology Co., Ltd. All right reserved.
* http://www.makeblock.cc/
**************************************************************************/
#include <Wire.h>
#include <WeELFPort.h>

WeRGBLed rgb(PORT_1);


WeBuzzer buzzer(OnBoard_Buzzer);
WeInfraredReceiver ir(PORT_2);


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
  MODE_C
};


boolean isAvailable = false;
boolean isStart = false;
boolean buttonPressed = false;
boolean currentPressed = false;
boolean pre_buttonPressed = false;

float angleServo = 90.0;
double lastTime = 0.0;
double currentTime = 0.0;

int len = 52;
int LineFollowFlag=0;
int moveSpeed = 200;
int minSpeed = 48;
int factor = 23;

int px = 0;

uint8_t command_index = 0;
uint8_t motor_sta = STOP;
uint8_t mode = MODE_A;




void buzzerOn(){
  buzzer.tone(500,1000); 
}
void buzzerOff(){
  buzzer.noTone(); 
}

void get_ir_command()
{
  static long time = millis();
  if (ir.decode())
  {
    uint32_t value = ir.value;
    time = millis();
    switch (value >> 16 & 0xff)
    {
      case IR_CONTROLLER_A:
        moveSpeed = 255;
        mode = MODE_A;
        Stop();
        cli();
        buzzer.tone(NTD1, 300);
        sei();
        rgb.setColor(0,0,0);
        rgb.setColor(10, 10, 10);
        rgb.show();
        break;
      case IR_CONTROLLER_B:
        moveSpeed = 200;
        mode = MODE_B;
        Stop();
        cli();
        buzzer.tone(NTD2, 300);
        sei();
        buzzer.noTone();  
        rgb.setColor(0,0,0);
        rgb.setColor(0, 10, 0);
        rgb.show();
        break;
      case IR_CONTROLLER_C:
        mode = MODE_C;
        moveSpeed = 120;
        Stop();
        cli();
        buzzer.tone(NTD3, 300);
        sei();
        rgb.setColor(0,0,0);
        rgb.setColor(0, 0, 10);
        rgb.show();
        break;
      case IR_CONTROLLER_UP:
        motor_sta = RUN_F;
        //buzzer.tone(NTD4, 300); 
       // rgb.setColor(0,0,0);
        rgb.setColor(0, 10, 0);
        rgb.show();
        //               Forward();
        break;
      case IR_CONTROLLER_DOWN:
        motor_sta = RUN_B;
        rgb.setColor(0,0,0);
        rgb.setColor(10, 0, 0);
        rgb.show();
        //buzzer.tone(NTD4, 300); 
        //               Backward();
        break;
      case IR_CONTROLLER_RIGHT:
        motor_sta = RUN_R;
        //buzzer.tone(NTD4, 300); 
        rgb.setColor(0,0,0);
        rgb.setColor(1,10, 10, 0);
        rgb.show();
        //               TurnRight();
        break;
      case IR_CONTROLLER_LEFT:
        motor_sta = RUN_L;
        //buzzer.tone(NTD4, 300); 
        rgb.setColor(0,0,0);
        rgb.setColor(2,10, 10, 0);
        rgb.show();
        //               TurnLeft();
        break;
      case IR_CONTROLLER_9:
        cli();
        buzzer.tone(NTDH2, 300);
        sei();
        ChangeSpeed(factor * 9 + minSpeed);
        break;
      case IR_CONTROLLER_8:
        cli();
        buzzer.tone(NTDH1, 300);
        sei();
        ChangeSpeed(factor * 8 + minSpeed);
        break;
      case IR_CONTROLLER_7:
        cli();
        buzzer.tone(NTD7, 300);
        sei();
        ChangeSpeed(factor * 7 + minSpeed);
        break;
      case IR_CONTROLLER_6:
        cli();
        buzzer.tone(NTD6, 300);
        sei();
        ChangeSpeed(factor * 6 + minSpeed);
        break;
      case IR_CONTROLLER_5:
        cli();
        buzzer.tone(NTD5, 300);
        sei();
        ChangeSpeed(factor * 5 + minSpeed);
        break;
      case IR_CONTROLLER_4:
        cli();
        buzzer.tone(NTD4, 300);
        sei();
        ChangeSpeed(factor * 4 + minSpeed);
        break;
      case IR_CONTROLLER_3:
        cli();
        buzzer.tone(NTD3, 300);
        sei();
        ChangeSpeed(factor * 3 + minSpeed);
        break;
      case IR_CONTROLLER_2:
        cli();
        buzzer.tone(NTD2, 300);
        sei();
        ChangeSpeed(factor * 2 + minSpeed);
        break;
      case IR_CONTROLLER_1:
        cli();
        buzzer.tone(NTD1, 300);
        sei();
        ChangeSpeed(factor * 1 + minSpeed);
        break;
    }
  }
  else if (millis() - time > 120)
  {
    motor_sta = STOP;
    time = millis();
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
    SetDestSpeed(-moveSpeed);

}
void Backward()
{
   speedSetLeft = moveSpeed;
   speedSetRight = moveSpeed;
 doRun();
}
void TurnLeft()
{
  speedSetLeft = -moveSpeed * 0.2;
   speedSetRight = -moveSpeed;
  doRun();
}
void TurnRight()
{
  speedSetLeft = -moveSpeed;
   speedSetRight = -moveSpeed * 0.2;
   doRun();
}

void Stop()
{
  rgb.setColor(0,0,0);
  rgb.show();
   SetDestSpeed(0);
}

void doRun()
{
   MotorL.run(speedSetLeft);
 MotorR.run(speedSetRight);
}
uint8_t prevState = 0;
void ChangeSpeed(int spd)
{
  moveSpeed = spd;
}

void modeA()
{
  switch (motor_sta)
  {
    case RUN_F:
      Forward();
      prevState = motor_sta;
      break;
    case RUN_B:
      Backward();
      prevState = motor_sta;
      break;
    case RUN_L:
      TurnLeft();
      prevState = motor_sta;
      break;
    case RUN_R:
      TurnRight();
      prevState = motor_sta;
      break;
    case STOP:
      if(prevState!=motor_sta){
        prevState = motor_sta;
        Stop();
      }
      break;
  }

}







void setup()
{
  Stop();
  pinMode(10, INPUT);
  //rgb.setpin(9);
  rgb.setColor(0,0,0);
  rgb.show();
  rgb.setColor(10, 0, 0);
  rgb.show();
  buzzer.tone(NTD1, 300); 
  delay(300);
  rgb.setColor(0, 10, 0);
  rgb.show();
  buzzer.tone(NTD2, 300);
  delay(300);
  rgb.setColor(0, 0, 10);
  rgb.show();
  buzzer.tone(NTD3, 300);
  delay(300);
  rgb.setColor(10,10,10);
  rgb.show();
  Serial.begin(115200);
  buzzer.noTone();
  ir.begin(); 

}


void loop()
{
    get_ir_command();
    modeA();
}
