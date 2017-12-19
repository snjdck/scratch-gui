
#ifndef WeLEDPanelModuleMatrix7_21_H
#define WeLEDPanelModuleMatrix7_21_H

#include "WePort.h"


class WeLEDPanelModuleMatrix7_21
{
public:

  WeLEDPanelModuleMatrix7_21(uint8_t port=0);
  void reset(uint8_t port=0);
  void setBrightness(uint8_t Bright);
  void clearScreen(void);
  void writePanelData(void);
  void showPanel(void);
  void showLine(uint8_t x,uint8_t buffer);
  void turnOnDot(uint8_t x,uint8_t y);
  void turnOffDot(uint8_t x,uint8_t y);
  void showChar(int8_t X_position,int8_t Y_position,const char *str);
  void showClock(uint8_t hour, uint8_t minute, bool point_flag);
  void showNum(float value);
  void writeChar(int8_t X_position,int8_t Y_position,uint8_t buffer);
  void showBitmap(int8_t x, int8_t y, uint8_t *data);
private:
	WeOneWire _WeLEDPanel;
    volatile uint8_t  Display_Buffer[21]={0};
};

#endif

