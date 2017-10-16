#include "WeELFPort.h"
WeButton button(OnBoard_Button);
int value = 0; 
void setup() 
{
    Serial.begin(9600);
}
void loop()
{
  value = button.read();
  if (value == 0)
  {
     Serial.println("Button pressed");
   }
  if (value == 1)
  {
     Serial.println("Button NULL");
   } 
   delay(100);
}
