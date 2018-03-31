#include "WeTiltSwitch.h"


WeTiltSwitch::WeTiltSwitch(uint8_t port)
{
   _WeTiltSwitch.reset(port);
}
void WeTiltSwitch::reset(uint8_t port)
{
   _WeTiltSwitch.reset(port);
}

bool WeTiltSwitch::readSensor(void)
{
   if(_WeTiltSwitch.reset()!=0)
	return 0;
   _WeTiltSwitch.write_byte(0x02);
   _WeTiltSwitch.respond();
   _Sensor=_WeTiltSwitch.read_byte();
   return _Sensor != 0;
}




