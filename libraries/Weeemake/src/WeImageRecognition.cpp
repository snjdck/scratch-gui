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
	//delay(10);
	return 1;
}

bool WeImageRecognition::getColorPosition(uint8_t num)
{ 
	if(_WeImageRecognition.reset()!=0) 
		return  0;
    _WeImageRecognition.write_byte(0x05|num<<5);
  //  if(_WeImageRecognition.reset()!=0) 
//		return  0;
//	_WeImageRecognition.write_byte(mun);
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
	if(centerX>320) return 0;
	if(centerY>240) return 0;
	//delay(10);
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

bool WeImageRecognition::getAppColorPosition(uint8_t num)
{ 
	if(_WeImageRecognition.reset()!=0) 
		return  0;
    _WeImageRecognition.write_byte(0x07|num<<5);
//    if(_WeImageRecognition.reset()!=0) 
//		return  0;
//	_WeImageRecognition.write_byte(mun);
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
	//delay(10);
	return 1;
}

void WeImageRecognition::setLineFollowerMode(void)
{
	if(_WeImageRecognition.reset()!=0) 
		return  ;
    _WeImageRecognition.write_byte(0x08);
	delay(3000);
}
void WeImageRecognition::setLineFollowerThreshold(uint8_t min,uint8_t max)
{
	if(_WeImageRecognition.reset()!=0) 
		return  ;
    _WeImageRecognition.write_byte(0x0e);
	if(_WeImageRecognition.reset()!=0) 
		return  ;
	_WeImageRecognition.write_byte(min);
	_WeImageRecognition.write_byte(max);
	delay(10);
}

bool WeImageRecognition::getLineFollowerAngle(void)
{
	if(_WeImageRecognition.reset()!=0) 
			return	0;
	_WeImageRecognition.write_byte(0x0f);
	_WeImageRecognition.respond();
	angle=_WeImageRecognition.read_byte();
	if (angle==125) return 0;
	//delay(10);
	return 1;

}
bool WeImageRecognition::getLineFollowerAxis(void)
{
	if(_WeImageRecognition.reset()!=0) 
		return  0;
    _WeImageRecognition.write_byte(0x09);
	_WeImageRecognition.respond();
   	linex1=_WeImageRecognition.read_byte();
	if (linex1==0xff) return 0;
	linex2=_WeImageRecognition.read_byte();
	linex3=_WeImageRecognition.read_byte();
	linex4=_WeImageRecognition.read_byte();
	linex5=_WeImageRecognition.read_byte();	
	return 1;
}

void WeImageRecognition::setPixelsThreshold(uint8_t num)
{
	if(_WeImageRecognition.reset()!=0) 
		return  ;
    _WeImageRecognition.write_byte(0x0a);
	if(_WeImageRecognition.reset()!=0) 
		return  ;
	_WeImageRecognition.write_byte(num);
	delay(10);
}

bool WeImageRecognition::getColorAllPosition(uint8_t num)
{ 
	if(_WeImageRecognition.reset()!=0) 
		return  0;
    _WeImageRecognition.write_byte(0x0b|num<<5);
 //  if(_WeImageRecognition.reset()!=0) 
//		return  0;
//	_WeImageRecognition.write_byte(mun);
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
	density=(float)pixels/(float)(width*high);

	//delay(10);
	return 1;
}

bool WeImageRecognition::getAppColorAllPosition(uint8_t num)
{ 
	if(_WeImageRecognition.reset()!=0) 
		return  0;
    _WeImageRecognition.write_byte(0x0c|num<<5);
 //   if(_WeImageRecognition.reset()!=0) 
//		return  0;
//	_WeImageRecognition.write_byte(mun);
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
	density=(float)pixels/(float)(width*high);
	//delay(10);
	return 1;
}

void WeImageRecognition::resetColorMode(uint8_t time)  //1-20
{
	if(_WeImageRecognition.reset()!=0) 
		return  ;
    _WeImageRecognition.write_byte(0x0d);
	if(_WeImageRecognition.reset()!=0) 
		return  ;
	_WeImageRecognition.write_byte(time);
	delay(6000);
}

bool WeImageRecognition::getFacePositon(void)
{
	if(_WeImageRecognition.reset()!=0) 
		return  0;
    _WeImageRecognition.write_byte(0x10);
	_WeImageRecognition.respond();
   	uartData[0]=_WeImageRecognition.read_byte();
	if (uartData[0]==0xff) return 0;
	for(uint8_t i=1;i<4;i++)
	{
	   uartData[i]=_WeImageRecognition.read_byte();
	}
	centerX=(uartData[0]<<8)|uartData[1];
	centerY=(uartData[2]<<8)|uartData[3];
	return 1;
}

void WeImageRecognition::fastMode(bool mode)
{
	if(_WeImageRecognition.reset()!=0) 
		return  ;
    _WeImageRecognition.write_byte(0x11);
	if(_WeImageRecognition.reset()!=0) 
		return  ;
	_WeImageRecognition.write_byte(mode);
}


void WeImageRecognition::setMode(uint8_t mode)
{
	if(mode == 0){
		setAutoTrackingMode();
	}else{
		setLineFollowerMode();
	}
}

bool WeImageRecognition::updateMode(uint8_t mode)
{
	if(mode == 0){
		return getAutoPosition();
	}else{
		return getLineFollowerAngle();
	}
}

uint16_t WeImageRecognition::getValue(uint8_t type)
{
	if(type == 0){
		return centerX;
	}
	if(type == 1){
		return centerY;
	}
	if(type == 2){
		return pixels;
	}
	if(type == 3){
		return angle;
	}
	return 0;
}