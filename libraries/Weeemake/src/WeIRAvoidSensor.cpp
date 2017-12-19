#include "WeIRAvoidSensor.h"


WeIRAvoidSensor::WeIRAvoidSensor(uint8_t port)
{
  _WeIRAvoidSensor.reset(WeonePort[port]);
}
void WeIRAvoidSensor::reset(uint8_t port)
{
  _WeIRAvoidSensor.reset(WeonePort[port]);
}

uint8_t WeIRAvoidSensor::isObstacle(void)
{   
   if (_WeIRAvoidSensor.reset()!=0)
   	return 0;
   _WeIRAvoidSensor.write_byte(0x02);
   _WeIRAvoidSensor.respond();
   _Sensor_data=_WeIRAvoidSensor.read_byte();	
   delayMicroseconds(3000);  
   delayMicroseconds(3000); 
   delayMicroseconds(3000);
   if (_Sensor_data==1)
   	return 0;
   else
   	return 1;    
}

void WeIRAvoidSensor::setColor1(uint8_t red, uint8_t green, uint8_t blue)
{
  _RGB1_data[0]=red;
  _RGB1_data[1]=green;
  _RGB1_data[2]=blue;
  RGBShow();
}
void WeIRAvoidSensor::setColor2(uint8_t red, uint8_t green, uint8_t blue)
{
  _RGB2_data[0]=red;
  _RGB2_data[1]=green;
  _RGB2_data[2]=blue;
  RGBShow();
}
void WeIRAvoidSensor::RGBShow(void)
{
   if (_WeIRAvoidSensor.reset()!=0)
   	return;
  _WeIRAvoidSensor.write_byte(0x03);
  if (_WeIRAvoidSensor.reset()!=0)
   	return;
  _WeIRAvoidSensor.write_byte(_RGB1_data[0]);
  _WeIRAvoidSensor.write_byte(_RGB1_data[1]);
  _WeIRAvoidSensor.write_byte(_RGB1_data[2]);
  _WeIRAvoidSensor.write_byte(_RGB2_data[0]);
  _WeIRAvoidSensor.write_byte(_RGB2_data[1]);
  _WeIRAvoidSensor.write_byte(_RGB2_data[2]);
}

 void WeIRAvoidSensor::RightLED_ON(void)
 {
    _Led_data=_Led_data|0x01;
    if (_WeIRAvoidSensor.reset()!=0)
   	  return;
    _WeIRAvoidSensor.write_byte(0x04);
    if (_WeIRAvoidSensor.reset()!=0)
      return;
	_WeIRAvoidSensor.write_byte(_Led_data);
 }
 void WeIRAvoidSensor::RightLED_OFF(void)
 {
    _Led_data=_Led_data&0xfe;
    if (_WeIRAvoidSensor.reset()!=0)
   	  return;
    _WeIRAvoidSensor.write_byte(0x04);
    if (_WeIRAvoidSensor.reset()!=0)
      return;
	_WeIRAvoidSensor.write_byte(_Led_data);
 }
 void WeIRAvoidSensor::LeftLED_ON(void)
 {
    _Led_data=_Led_data|0x02;
    if (_WeIRAvoidSensor.reset()!=0)
   	  return;
    _WeIRAvoidSensor.write_byte(0x04);
    if (_WeIRAvoidSensor.reset()!=0)
      return;
	_WeIRAvoidSensor.write_byte(_Led_data);
 }
 void WeIRAvoidSensor::LeftLED_OFF(void)
 {
    _Led_data=_Led_data&0xfd;
    if (_WeIRAvoidSensor.reset()!=0)
   	  return;
    _WeIRAvoidSensor.write_byte(0x04);
    if (_WeIRAvoidSensor.reset()!=0)
      return;
	_WeIRAvoidSensor.write_byte(_Led_data);
 }



