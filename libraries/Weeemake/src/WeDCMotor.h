
#ifndef WeDCMotor_H
#define WeDCMotor_H

#include "WeELFPort.h"


class WeDCMotor
{
public:


  WeDCMotor(void);
  WeDCMotor(uint8_t port); 
  void reset(uint8_t port);

  void run(int16_t speed);
  void stop(void);

  
private:
	WeOneWire _DCMotor;
	volatile uint8_t dc_dir_pin;
    volatile uint8_t dc_pwm_pin;
    int16_t  last_speed=0;
    uint8_t  onBoard_flag=0;
	uint8_t  motor_flag=0;
};

#endif

