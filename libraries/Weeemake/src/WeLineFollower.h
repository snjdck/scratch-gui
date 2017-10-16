
#ifndef WeLineFollower_H
#define WeLineFollower_H

#include <stdint.h>
#include <stdbool.h>
#include <Arduino.h>

#include "WeELFPort.h"



class WeLineFollower
{
public:

  WeLineFollower(void);
  WeLineFollower(uint8_t port);

  void reset(uint8_t);

  void startRead(void);
  uint8_t startRead(uint8_t);
  uint8_t readSensor1(void);
  uint8_t readSensor2(void);


  
private:
	WeOneWire _WeLineFollower;
    volatile uint8_t  _Sensor1;
    volatile uint8_t  _Sensor2;
};

#endif

