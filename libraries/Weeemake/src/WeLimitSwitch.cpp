#include "WeLimitSwitch.h"

WeLimitSwitch::WeLimitSwitch(uint8_t port)
{
  _Sensorpin=port;
}



uint8_t WeLimitSwitch::read(void)
{
   return(digitalRead(_Sensorpin));
}





