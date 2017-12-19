#include "WeHumiture.h"


WeHumiture::WeHumiture(uint8_t port)
{
  _WeHumiture.reset(WeonePort[port]);
}
void WeHumiture::reset(uint8_t port)
{
	_WeHumiture.reset(WeonePort[port]);
}

void WeHumiture::startRead(void)
{
  if(_WeHumiture.reset()!=0)
  	return;
  _WeHumiture.write_byte(0x02);
  _WeHumiture.respond();
  _humidity=_WeHumiture.read_byte();
  _temperature=_WeHumiture.read_byte();
}

uint16_t WeHumiture::getHumidity(void)
{
  
  return (_humidity);
}
uint16_t WeHumiture::getTemperature(void)
{
  return (_temperature);
}




