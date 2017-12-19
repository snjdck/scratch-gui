
#ifndef WeSingleLineFollower_H
#define WeSingleLineFollower_H

#include "WePort.h"

class WeSingleLineFollower
{
public:

  WeSingleLineFollower(uint8_t port=0);

  int16_t read(void);
  
 private:
	uint8_t _Sensorpin;

};

#endif

