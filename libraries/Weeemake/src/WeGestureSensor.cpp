#include "WeGestureSensor.h"


WeGestureSensor::WeGestureSensor(uint8_t port)
{
  _WeGestureSensor.reset(port);
}
void WeGestureSensor::reset(uint8_t port)
{
	_WeGestureSensor.reset(port);
}


uint8_t WeGestureSensor::read(void)
{
  if(_WeGestureSensor.reset()!=0)
    return 0;
  _WeGestureSensor.write_byte(0x02);
  _WeGestureSensor.respond();
  _Sensor1=_WeGestureSensor.read_byte();

  return _Sensor1;
}



