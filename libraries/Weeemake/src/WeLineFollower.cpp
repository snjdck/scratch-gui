#include "WeLineFollower.h"


WeLineFollower::WeLineFollower(uint8_t port)
{
  _WeLineFollower.reset(port);
}
void WeLineFollower::reset(uint8_t port)
{
	_WeLineFollower.reset(port);
}

uint8_t WeLineFollower::startRead(uint8_t index)
{
  startRead();
  return index == 2 ? _Sensor2 : _Sensor1;
}

void WeLineFollower::startRead(void)
{
  if(_WeLineFollower.reset()!=0)
  	return;
  _WeLineFollower.write_byte(0x02);
  _WeLineFollower.respond();
  _Sensor1=_WeLineFollower.read_byte();
  _Sensor2=_WeLineFollower.read_byte();	

}

uint8_t WeLineFollower::readSensor1(void)
{
  return _Sensor1;
}
uint8_t WeLineFollower::readSensor2(void)
{
  return _Sensor2;
}




