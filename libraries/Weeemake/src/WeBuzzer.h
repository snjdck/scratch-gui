
#ifndef WeBuzzer_H
#define WeBuzzer_H

#include "WePort.h"


class WeBuzzer
{
public:


  WeBuzzer(uint8_t port=0);

  void tone(uint16_t frequency, uint32_t duration);
  void tone2(uint16_t frequency, uint32_t duration);
  void noTone();
  void buzzerOn(uint16_t delaytime);
  

};

#endif

