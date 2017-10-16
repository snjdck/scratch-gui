
#ifndef WeBuzzer_H
#define WeBuzzer_H

#include <stdint.h>
#include <stdbool.h>
#include <Arduino.h>
#include "WeELFPort.h"



class WeBuzzer
{
public:

  WeBuzzer(void);
  WeBuzzer(uint8_t port);

  void tone(uint16_t frequency, uint32_t duration);
  void tone2(uint16_t frequency, uint32_t duration);
  void noTone();
  void buzzerOn(uint16_t delaytime);
private:
  uint8_t buzzer_pin;

};

#endif

