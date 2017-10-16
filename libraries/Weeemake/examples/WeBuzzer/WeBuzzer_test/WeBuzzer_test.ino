#include "WeELFPort.h"
WeBuzzer buzzer(OnBoard_Buzzer);

void setup() 
{
  
}
void loop()
{
  buzzer.buzzerOn(1000);  //1000millseconds
  delay(1000);
 
}
