#include "We130DCMotor.h"

We130DCMotor::We130DCMotor(uint8_t port)
{
    reset(port);
	
}

void We130DCMotor::reset(uint8_t port)
{	
	_130DCMotor.reset(port);	
	last_speed=300;
}

void We130DCMotor::run(int16_t speed)
{
  const float factor = 2.55;
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
     _130DCMotor.write_byte((uint8_t)(speed/factor));
     delayMicroseconds(500);
  }
  else
  {
	  _130DCMotor.reset();
	  _130DCMotor.write_byte(0x02);
	  _130DCMotor.reset();
      _130DCMotor.write_byte((uint8_t)(100-speed/factor));
      delayMicroseconds(500);
  }
}

void We130DCMotor:: stop(void)
{
	run(0);
}





