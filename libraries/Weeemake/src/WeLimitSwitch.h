
#ifndef _WeLimitSwitch_H
#define _WeLimitSwitch_H

#include "WePort.h"

class WeLimitSwitch
{
public:

  WeLimitSwitch(uint8_t port=0);

  uint8_t read(void);
  
 private:
	uint8_t _Sensorpin;

};

#endif

