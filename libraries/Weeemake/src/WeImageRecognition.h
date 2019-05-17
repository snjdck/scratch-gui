
#ifndef WeImageRecognition_H
#define WeImageRecognition_H

#include "WePort.h"

class WeImageRecognition
{
public:

   WeImageRecognition(uint8_t port);
   void reset(uint8_t port);
   bool getLab(void);
   void setAutoTrackingMode(void);
   bool getAutoPosition(void);
   bool getColorPosition(uint8_t mun);
   void setLabColor1(int8_t minL,int8_t maxL,int8_t minA,int8_t maxA,int8_t minB,int8_t maxB);
   void setLabColor2(int8_t minL,int8_t maxL,int8_t minA,int8_t maxA,int8_t minB,int8_t maxB);
   void setLabColor3(int8_t minL,int8_t maxL,int8_t minA,int8_t maxA,int8_t minB,int8_t maxB);
   void setLabColor4(int8_t minL,int8_t maxL,int8_t minA,int8_t maxA,int8_t minB,int8_t maxB);
   bool getAppColorPosition(uint8_t mun);
   void setLineFollowerMode(void);
   bool getLineFollowerAngle(void);
   void getAllDatas(uint8_t color);
   void setPixelsThreshold(uint8_t mun);
   bool getColorAllPosition(uint8_t mun);
   bool getAppColorAllPosition(uint8_t mun);
   void resetColorMode(uint8_t time);

   void setMode(uint8_t);
   uint16_t getValue(uint8_t);
   
   void readData1(void);
   int8_t  minL, maxL, minA, maxA, minB, maxB,angle;
   uint16_t centerX,centerY,pixels,frameX,frameY,high,width,rotation;
   
 private:
	WeOneWire _WeImageRecognition;
	uint8_t uartData[15]={0};
};

#endif

