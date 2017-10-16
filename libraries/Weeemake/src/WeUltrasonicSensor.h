
#ifndef WeUltrasonicSensor_H
#define WeUltrasonicSensor_H

#include <stdint.h>
#include <stdbool.h>
#include <Arduino.h>

#include "WeELFPort.h"



class WeUltrasonicSensor
{
public:

  WeUltrasonicSensor(void);
  WeUltrasonicSensor(uint8_t port);

  double distanceCm(void);
  void setColor1(uint8_t red, uint8_t green, uint8_t blue);
  void setColor2(uint8_t red, uint8_t green, uint8_t blue);
  void RGBShow(void);

  void reset(uint8_t);



  
private:
	WeOneWire _WeUltrasonicSensor;
    volatile uint8_t  _Sensor_data1;
    volatile uint8_t  _Sensor_data2;
	volatile uint8_t  _RGB1_data[3]={0};
	volatile uint8_t  _RGB2_data[3]={0};
};

#endif

