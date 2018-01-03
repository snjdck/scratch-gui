#include "WeCompassSensor.h"


WeCompassSensor::WeCompassSensor(uint8_t port)
{
  _WeCompassSensor.reset(port);
}
void WeCompassSensor::reset(uint8_t port)
{
  _WeCompassSensor.reset(port);
}


void  WeCompassSensor::update(void)
{
  if(_WeCompassSensor.reset()!=0)
		  return ;
	  _WeCompassSensor.write_byte(0x02);
	  _WeCompassSensor.respond();
	  for(int i=0;i<6;i++)
	  {
		i2cData[i]=_WeCompassSensor.read_byte();
	  }
  
  head_X = ( (i2cData[0] << 8) | i2cData[1] );
  head_Y = ( (i2cData[2] << 8) | i2cData[3] );
  head_Z = ( (i2cData[4] << 8) | i2cData[5] );  
  
}

double  WeCompassSensor::getHeadX(void)
{
  return head_X;
}
double  WeCompassSensor::getHeadY(void)
{
  return head_Y;
}
double  WeCompassSensor::getHeadZ(void)
{
  return head_Z;
}



