
#ifndef WeLightSensor_H
#define WeLightSensor_H

#include <stdint.h>
#include <stdbool.h>
#include <Arduino.h>

#include "WeELFPort.h"



class WeLightSensor
{
public:

  WeLightSensor(void);
  WeLightSensor(uint8_t port);

  int16_t read(void);
  
 private:
	uint8_t _Sensorpin;

};

#endif

