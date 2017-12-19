#include "WeSingleLineFollower.h"

WeSingleLineFollower::WeSingleLineFollower(uint8_t port)
{
  _Sensorpin=WeonePort[port];
}



int16_t WeSingleLineFollower::read(void)
{
   return(analogRead(_Sensorpin));
}





