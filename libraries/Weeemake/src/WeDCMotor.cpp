#include "WeDCMotor.h"

uint8_t	motorPort[12][2] =
{
	{ NC, NC }, { 6, 7 }, {  5,  8 }, { A5, 1 }, {  A5,  2 },
	{ A4, 1 }, { A4, 2 }, { A3, 1 }, { A3, 2 }, {  A2,  1 },
	{  A2,  2 }, { NC, NC },
};

WeDCMotor::WeDCMotor(void)
{
}

WeDCMotor::WeDCMotor(uint8_t port)
{
  if(port>2)
  {
    _DCMotor.reset(motorPort[port][0]);
	motor_flag=motorPort[port][1];
	onBoard_flag=0;
  }
  else
  {
    pinMode(motorPort[port][1],OUTPUT);
    dc_pwm_pin=motorPort[port][0];
    dc_dir_pin=motorPort[port][1];
	onBoard_flag=1;
  }
 
}

void WeDCMotor::reset(uint8_t port)
{
	if(port>2)
	{
		_DCMotor.reset(motorPort[port][0]);
		onBoard_flag=0;
    }
    else
	{
        pinMode(motorPort[port][1], OUTPUT);
		dc_pwm_pin=motorPort[port][0];
		dc_dir_pin=motorPort[port][1];
		onBoard_flag=1;
	}
	last_speed=300;
}

void WeDCMotor::run(int16_t speed)
{
  
  speed	= speed > 255 ? 255 : speed;
  speed	= speed < -255 ? -255 : speed;

  if(last_speed != speed)
  {
    last_speed = speed;
  }
  else
  {
    return;
  }
  if(speed >= 0)
  {
   if(onBoard_flag==1)
   {
      digitalWrite(dc_dir_pin,LOW);
      analogWrite(dc_pwm_pin, speed);
   }
   else
   {
     _DCMotor.reset();
     _DCMotor.write_byte(motor_flag);
     _DCMotor.write_byte((uint8_t)(speed/2.5));
     delayMicroseconds(500);
   }
  }
  else
  {
    if(onBoard_flag==1)
    {
      digitalWrite(dc_dir_pin,HIGH);
      analogWrite(dc_pwm_pin, -speed);
    }
	else
	{
	  _DCMotor.reset();
      _DCMotor.write_byte(motor_flag);
      _DCMotor.write_byte((uint8_t)(100-speed/2.5));
      delayMicroseconds(500);
	}
  }
}

void WeDCMotor:: stop(void)
{
	run(0);
}





