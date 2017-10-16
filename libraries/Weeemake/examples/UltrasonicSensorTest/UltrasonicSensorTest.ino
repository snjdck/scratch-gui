#include "WeELFPort.h"

WeUltrasonicSensor ultraSensor(PORT_C);

void setup()
{  
  Serial.begin(9600);
}
void loop() 
{
  ultraSensor.setColor1(0,0,250);
  ultraSensor.setColor2(0,0,0);
  ultraSensor.RGBShow();
 
  Serial.print("Distance : ");
  Serial.print(ultraSensor.distanceCm() );
  Serial.println(" cm");
  delay(100);
}
