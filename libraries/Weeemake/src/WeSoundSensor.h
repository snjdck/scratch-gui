
#ifndef WeSoundSensor_H
#define WeSoundSensor_H

#include <stdint.h>
#include <stdbool.h>
#include <Arduino.h>

#include "WeELFPort.h"



class WeSoundSensor
{
public:

  WeSoundSensor(void);
  WeSoundSensor(uint8_t port);

  int16_t read(void);
  
 private:
	uint8_t _Sensorpin;

};

#endif

