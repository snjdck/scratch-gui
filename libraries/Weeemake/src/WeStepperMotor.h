#ifndef _WeStepperMotor_H
#define _WeStepperMotor_H

#include "WePort.h"

class WeStepperMotor
{
public:

  WeStepperMotor(uint8_t port=0); 
  void reset(uint8_t port=0);
  void setMicroStep(uint8_t value);
  void setSpeed(uint16_t speed);
  void moveTo(int16_t value);
  void move(int16_t value);
  
private:
	WeOneWire _WeStepperMotor;
	volatile uint8_t dc_dir_pin;
    volatile uint8_t dc_pwm_pin;
    int16_t  last_speed=0;
    uint8_t  onBoard_flag=0;
	uint8_t  motor_flag=0;
	uint8_t  setPWM_flag=0;
};

#endif

