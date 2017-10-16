
#ifndef WeRGBLed_H
#define WeRGBLed_H

#include <stdint.h>
#include <stdbool.h>
#include <Arduino.h>

#include "WeELFPort.h"

#define DEFAULT_MAX_LED_NUMBER  (32)

struct cRGB
{
  uint8_t g;
  uint8_t r;
  uint8_t b;
};


class WeRGBLed
{
public:

  WeRGBLed(void);
  WeRGBLed(uint8_t port);
  ~WeRGBLed(void);

  void setNumber(uint8_t num_led);
  bool setColorAt(uint8_t index, uint8_t red, uint8_t green, uint8_t blue);
  bool setColor(uint8_t index, uint8_t red, uint8_t green, uint8_t blue);
  bool setColor(uint8_t red, uint8_t green, uint8_t blue);
  
  bool setColor(uint8_t index, long value);
  void show(void);
  void reset(uint8_t);



 
  
 private:
	
	uint16_t count_led;
	uint8_t *pixels;
	void rgbled_sendarray_mask(uint8_t *array, uint16_t length, uint8_t pinmask, uint8_t *port);

    const volatile uint8_t *ws2812_port;
    volatile uint8_t *ws2812_port_reg;
    uint8_t pinMask;

};

#endif

