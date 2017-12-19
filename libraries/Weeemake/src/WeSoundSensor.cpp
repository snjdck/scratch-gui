#include "WeSoundSensor.h"



WeSoundSensor::WeSoundSensor(uint8_t port)
{
  _Sensorpin=WeonePort[port];
}



int16_t WeSoundSensor::read(void)
{
   return(analogRead(_Sensorpin));
}





