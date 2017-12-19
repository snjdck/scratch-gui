#include "We130DCMotor.h"

We130DCMotor::We130DCMotor(uint8_t port)
{
    _130DCMotor.reset(WeonePort[port]);
	
}

void We130DCMotor::reset(uint8_t port)
{	
	_130DCMotor.reset(WeonePort[port]);	
	last_speed=300;
}

void We130DCMotor::run(int16_t speed)
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
     _130DCMotor.reset();
	 _130DCMotor.write_byte(0x02);
     _130DCMotor.reset();
     _130DCMotor.write_byte((uint8_t)(speed/2.5));
     delayMicroseconds(500);
  }
  else
  {
	  _130DCMotor.reset();
	  _130DCMotor.write_byte(0x02);
	  _130DCMotor.reset();
      _130DCMotor.write_byte((uint8_t)(100-speed/2.5));
      delayMicroseconds(500);
  }
}

void We130DCMotor:: stop(void)
{
	run(0);
}





