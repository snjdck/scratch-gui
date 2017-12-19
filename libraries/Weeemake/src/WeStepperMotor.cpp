#include "WeStepperMotor.h"

WeStepperMotor::WeStepperMotor(uint8_t port)
{
    _WeStepperMotor.reset(WetwoPort[port].s1);	
}
void WeStepperMotor::reset(uint8_t port)
{
	_WeStepperMotor.reset(WetwoPort[port].s1);	
	last_speed=300;
}

void WeStepperMotor::setMicroStep(uint8_t value)
{
     _WeStepperMotor.reset();
	 _WeStepperMotor.write_byte(0x02);
     _WeStepperMotor.reset();
     _WeStepperMotor.write_byte(value);
}
void WeStepperMotor::setSpeed(uint16_t speed)
{
	_WeStepperMotor.reset();
	_WeStepperMotor.write_byte(0x04);
	_WeStepperMotor.reset();
	//_WeStepperMotor.write_byte(speed>>8);
	_WeStepperMotor.write_byte(speed);

}
void WeStepperMotor::moveTo(int16_t value)
{

}

void WeStepperMotor::move(int16_t value)
{ 
	_WeStepperMotor.reset();
	_WeStepperMotor.write_byte(0x06);
	_WeStepperMotor.reset();
	_WeStepperMotor.write_byte((uint8_t)value);
	_WeStepperMotor.write_byte((uint8_t)(value>>8));

}





