#include "WeELFPort.h"

WeLEDPanelModuleMatrix7_21 ledPanel(PORT_A);

void setup()
{  
  ledPanel.setBrightness(7);     //  0-7
  ledPanel.clearScreen();
}
void loop() 
{
  ledPanel.turnOnDot(1,1);    //(x,y)
  ledPanel.turnOnDot(2,2);
  ledPanel.turnOnDot(3,3);

  delay(1000);
  ledPanel.turnOffDot(1,1);
  delay(1000);
  ledPanel.turnOffDot(2,2);
  delay(1000);
  ledPanel.turnOffDot(3,3);
  delay(1000);

}

