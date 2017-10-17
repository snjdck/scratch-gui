
#ifndef WeLEDPanelModuleMatrix7_21_H
#define WeLEDPanelModuleMatrix7_21_H

#include <stdint.h>
#include <stdbool.h>
#include <Arduino.h>

#include "WeELFPort.h"


class WeLEDPanelModuleMatrix7_21
{
public:

  WeLEDPanelModuleMatrix7_21(void);
  WeLEDPanelModuleMatrix7_21(uint8_t port);
  void reset(uint8_t);
  void setBrightness(uint8_t Bright);
  void clearScreen(void);
  void writePanelData(void);
  void showLine(uint8_t x,uint8_t buffer);
  void turnOnDot(uint8_t x,uint8_t y);
  void turnOffDot(uint8_t x,uint8_t y);
  void showChar(char X_position,char Y_position,const char *str);
  void showClock(uint8_t hour, uint8_t minute, bool point_flag);
  void showNum(float value);
  void writeChar(char X_position,char Y_position,uint8_t buffer);
  void showBitmap(int, int, uint8_t*);
  
private:
	WeOneWire _WeLEDPanel;
    volatile uint8_t  Display_Buffer[21]={0};
};

#endif

