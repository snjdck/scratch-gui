
#ifndef _WeGestureSensor_H
#define _WeGestureSensor_H

#include "WePort.h"

class WeGestureSensor
{
public:

  WeGestureSensor(uint8_t port=0);
  void reset(uint8_t port=0);
  uint8_t read(void);

  
private:
	WeOneWire _WeGestureSensor;
    volatile uint8_t  _Sensor1;
};

#endif

