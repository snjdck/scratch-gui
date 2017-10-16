#include "WeELFPort.h"
WeRGBLed led(OnBoard_RGB);

int16_t bri = 0, st = 0;

void setup() 
{
  
}
void loop()
{
  color_loop();
}

void color_loop()
{
   if(bri >= 60)
  {
    st = 1;
  }
  if(bri <= 0)
  {
    st = 0;
  }

  if(st)
  {
    bri--;
  }
  else
  {
    bri++;
  }
  
   led.setColorAt(0, bri, bri, bri);  // led number, red, green, blue,
   led.show();
   delay(50);   
}
