#include "WeWaterAtomizer.h"

WeWaterAtomizer::WeWaterAtomizer(uint8_t port)
{
  _WeWaterAtomizer.reset(port);
}
void WeWaterAtomizer::reset(uint8_t port)
{
  _WeWaterAtomizer.reset(port);
}

void WeWaterAtomizer::start(void)
{
   if (_WeWaterAtomizer.reset()!=0)
   	return;
   _WeWaterAtomizer.write_byte(0x02);
}
void WeWaterAtomizer::stop(void)
{
   if (_WeWaterAtomizer.reset()!=0)
   	return;
   _WeWaterAtomizer.write_byte(0x03);
}





