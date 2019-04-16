#include "WeImageRecognition.h"

WeImageRecognition::WeImageRecognition(uint8_t port)
{
   reset(port);
}

void WeImageRecognition::reset(uint8_t port)
{
	_WeImageRecognition.reset(port);
}

bool WeImageRecognition::getLab(void)
{ 
	if(_WeImageRecognition.reset()!=0) 
		return 0 ;
    _WeImageRecognition.write_byte(0x02);
	_WeImageRecognition.respond();
   	minL=_WeImageRecognition.read_byte();
	if(minL==-1)  return 0;
	maxL=_WeImageRecognition.read_byte();
	minA=_WeImageRecognition.read_byte();
	maxA=_WeImageRecognition.read_byte();
	minB=_WeImageRecognition.read_byte();
	maxB=_WeImageRecognition.read_byte();	
	return 1;
}

void WeImageRecognition::setAutoTrackingMode(void)
{
	if(_WeImageRecognition.reset()!=0) 
		return  ;
    _WeImageRecognition.write_byte(0x03);
	delay(10);
}

bool WeImageRecognition::getAutoPosition(void)
{ 
	if(_WeImageRecognition.reset()!=0) 
		return  0;
    _WeImageRecognition.write_byte(0x04);
	_WeImageRecognition.respond();
   	uartData[0]=_WeImageRecognition.read_byte();
	if (uartData[0]==0xff) return 0;
	for(uint8_t i=1;i<6;i++)
	{
	   uartData[i]=_WeImageRecognition.read_byte();
	}
	centerX=(uartData[0]<<8)|uartData[1];
	centerY=(uartData[2]<<8)|uartData[3];
	pixels=(uartData[4]<<8)|uartData[5];	
	delay(10);
	return 1;
}

bool WeImageRecognition::getColorPosition(uint8_t mun)
{ 
	if(_WeImageRecognition.reset()!=0) 
		return  0;
    _WeImageRecognition.write_byte(0x05);
    if(_WeImageRecognition.reset()!=0) 
		return  0;
	_WeImageRecognition.write_byte(mun);
	_WeImageRecognition.respond();
   	uartData[0]=_WeImageRecognition.read_byte();
	if (uartData[0]==0xff) return 0;
	for(uint8_t i=1;i<6;i++)
	{
	   uartData[i]=_WeImageRecognition.read_byte();
	}
	centerX=(uartData[0]<<8)|uartData[1];
	centerY=(uartData[2]<<8)|uartData[3];
	pixels=(uartData[4]<<8)|uartData[5];
	delay(10);
	return 1;
}


void WeImageRecognition::setLabColor1(int8_t minL,int8_t maxL,int8_t minA,int8_t maxA,int8_t minB,int8_t maxB)
{
	if(_WeImageRecognition.reset()!=0) 
		return  ;
    _WeImageRecognition.write_byte(0x06);
	if(_WeImageRecognition.reset()!=0) 
		return  ;
	_WeImageRecognition.write_byte(0x01);
	_WeImageRecognition.write_byte(minL);
	_WeImageRecognition.write_byte(maxL);
	_WeImageRecognition.write_byte(minA);
	_WeImageRecognition.write_byte(maxA);
	_WeImageRecognition.write_byte(minB);
	_WeImageRecognition.write_byte(maxB);	
	delay(10);
}
void WeImageRecognition::setLabColor2(int8_t minL,int8_t maxL,int8_t minA,int8_t maxA,int8_t minB,int8_t maxB)
{
	if(_WeImageRecognition.reset()!=0) 
		return  ;
    _WeImageRecognition.write_byte(0x06);
	if(_WeImageRecognition.reset()!=0) 
		return  ;
	_WeImageRecognition.write_byte(0x02);
	_WeImageRecognition.write_byte(minL);
	_WeImageRecognition.write_byte(maxL);
	_WeImageRecognition.write_byte(minA);
	_WeImageRecognition.write_byte(maxA);
	_WeImageRecognition.write_byte(minB);
	_WeImageRecognition.write_byte(maxB);	
	delay(10);
}
void WeImageRecognition::setLabColor3(int8_t minL,int8_t maxL,int8_t minA,int8_t maxA,int8_t minB,int8_t maxB)
{
	if(_WeImageRecognition.reset()!=0) 
		return  ;
    _WeImageRecognition.write_byte(0x06);
	if(_WeImageRecognition.reset()!=0) 
		return  ;
	_WeImageRecognition.write_byte(0x03);
	_WeImageRecognition.write_byte(minL);
	_WeImageRecognition.write_byte(maxL);
	_WeImageRecognition.write_byte(minA);
	_WeImageRecognition.write_byte(maxA);
	_WeImageRecognition.write_byte(minB);
	_WeImageRecognition.write_byte(maxB);	
	delay(10);
}
void WeImageRecognition::setLabColor4(int8_t minL,int8_t maxL,int8_t minA,int8_t maxA,int8_t minB,int8_t maxB)
{
	if(_WeImageRecognition.reset()!=0) 
		return  ;
    _WeImageRecognition.write_byte(0x06);
	if(_WeImageRecognition.reset()!=0) 
		return  ;
	_WeImageRecognition.write_byte(0x04);
	_WeImageRecognition.write_byte(minL);
	_WeImageRecognition.write_byte(maxL);
	_WeImageRecognition.write_byte(minA);
	_WeImageRecognition.write_byte(maxA);
	_WeImageRecognition.write_byte(minB);
	_WeImageRecognition.write_byte(maxB);	
	delay(10);
}

bool WeImageRecognition::getAppColorPosition(uint8_t mun)
{ 
	if(_WeImageRecognition.reset()!=0) 
		return  0;
    _WeImageRecognition.write_byte(0x07);
    if(_WeImageRecognition.reset()!=0) 
		return  0;
	_WeImageRecognition.write_byte(mun);
	_WeImageRecognition.respond();
   	uartData[0]=_WeImageRecognition.read_byte();
	if (uartData[0]==0xff) return 0;
	for(uint8_t i=1;i<6;i++)
	{
	   uartData[i]=_WeImageRecognition.read_byte();
	}
	centerX=(uartData[0]<<8)|uartData[1];
	centerY=(uartData[2]<<8)|uartData[3];
	pixels=(uartData[4]<<8)|uartData[5];
	delay(10);
	return 1;
}

void WeImageRecognition::setLineFlowingMode(void)
{
	if(_WeImageRecognition.reset()!=0) 
		return  ;
    _WeImageRecognition.write_byte(0x08);
	delay(10);
}
bool WeImageRecognition::getLineFlowingAngle(void)
{
	if(_WeImageRecognition.reset()!=0) 
		return  0;
    _WeImageRecognition.write_byte(0x09);
	_WeImageRecognition.respond();
   	angle=_WeImageRecognition.read_byte();
	if (angle==125) return 0;
	delay(10);
	return 1;
}

void WeImageRecognition::setPixelsThreshold(uint8_t mun)
{
	if(_WeImageRecognition.reset()!=0) 
		return  ;
    _WeImageRecognition.write_byte(0x0a);
	if(_WeImageRecognition.reset()!=0) 
		return  ;
	_WeImageRecognition.write_byte(mun);
	delay(10);
}

bool WeImageRecognition::getColorAllPosition(uint8_t mun)
{ 
	if(_WeImageRecognition.reset()!=0) 
		return  0;
    _WeImageRecognition.write_byte(0x0b);
    if(_WeImageRecognition.reset()!=0) 
		return  0;
	_WeImageRecognition.write_byte(mun);
	_WeImageRecognition.respond();
   	uartData[0]=_WeImageRecognition.read_byte();
	if (uartData[0]==0xff) return 0;
	for(uint8_t i=1;i<15;i++)
	{
	   uartData[i]=_WeImageRecognition.read_byte();
	}
	centerX=(uartData[0]<<8)|uartData[1];
	centerY=(uartData[2]<<8)|uartData[3];
	pixels=(uartData[4]<<8)|uartData[5];
	frameX=(uartData[6]<<8)|uartData[7];
	frameY=(uartData[8]<<8)|uartData[9];
	width=(uartData[10]<<8)|uartData[11];
	high=(uartData[12]<<8)|uartData[13];
	rotation=uartData[14];

	delay(10);
	return 1;
}

bool WeImageRecognition::getAppColorAllPosition(uint8_t mun)
{ 
	if(_WeImageRecognition.reset()!=0) 
		return  0;
    _WeImageRecognition.write_byte(0x0c);
    if(_WeImageRecognition.reset()!=0) 
		return  0;
	_WeImageRecognition.write_byte(mun);
	_WeImageRecognition.respond();
   	uartData[0]=_WeImageRecognition.read_byte();
	if (uartData[0]==0xff) return 0;
	for(uint8_t i=1;i<15;i++)
	{
	   uartData[i]=_WeImageRecognition.read_byte();
	}
	centerX=(uartData[0]<<8)|uartData[1];
	centerY=(uartData[2]<<8)|uartData[3];
	pixels=(uartData[4]<<8)|uartData[5];
	frameX=(uartData[6]<<8)|uartData[7];
	frameY=(uartData[8]<<8)|uartData[9];
	width=(uartData[10]<<8)|uartData[11];
	high=(uartData[12]<<8)|uartData[13];
	rotation=uartData[14];
	delay(10);
	return 1;
}

void WeImageRecognition::resetColorMode(uint8_t time)
{
	if(_WeImageRecognition.reset()!=0) 
		return  ;
    _WeImageRecognition.write_byte(0x0d);
	if(_WeImageRecognition.reset()!=0) 
		return  ;
	_WeImageRecognition.write_byte(time);
	delay(6000);
}





void WeImageRecognition::readData1(void)
{
  char check[40]={0};
  uint8_t a=0;
	if(_WeImageRecognition.reset()!=0) 
		return  ;
    _WeImageRecognition.write_byte(0x04);
   _WeImageRecognition.respond();
   for(int i=0;i<6;i++)
   	{
       check[i]=_WeImageRecognition.read_byte();

   	}
   for(int i=0;i<6;i++)
   	{
       Serial.print(check[i],HEX);
       Serial.print('-');

   	}
  Serial.println(' ');

}






