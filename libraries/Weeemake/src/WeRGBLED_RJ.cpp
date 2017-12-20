#include "WeRGBLED_RJ.h"

WeRGBLED_RJ::WeRGBLED_RJ(uint8_t port)
{
  _WeRGBLED_RJ.reset(port);
}
void WeRGBLED_RJ::reset(uint8_t port)
{
  _WeRGBLED_RJ.reset(port);
}


void WeRGBLED_RJ::setColor(uint8_t index,uint8_t red, uint8_t green, uint8_t blue)
{
  if(index<6)
  {
    uint8_t tmp = (index-1) * 3;
	_5RGB_data[tmp] = green;
    _5RGB_data[tmp + 1] = red;
    _5RGB_data[tmp + 2] = blue;
  }
}

void WeRGBLED_RJ::RGBShow(void)
{
   if (_WeRGBLED_RJ.reset()!=0)
   	return;
  _WeRGBLED_RJ.write_byte(0x02);
  if (_WeRGBLED_RJ.reset()!=0)
   	return;
  for(int i=0;i<15;i++)
  {
     _WeRGBLED_RJ.write_byte(_5RGB_data[i]); 
  }
}





