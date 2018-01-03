#ifndef _WeCompassSensor_H
#define _WeCompassSensor_H

#include "WePort.h"

class WeCompassSensor
{
public:

  WeCompassSensor(uint8_t port=0);
  void reset(uint8_t port=0);
  void update(void);
  double getHeadX(void);
  double getHeadY(void);
  double getHeadZ(void);
  
 
  
private:
	WeOneWire _WeCompassSensor;
    uint16_t  head_X=0, head_Y=0, head_Z=0;
    uint8_t i2cData[6];
};

#endif

