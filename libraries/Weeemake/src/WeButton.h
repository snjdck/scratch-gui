
#ifndef WeButton_H
#define WeButton_H

#include <stdint.h>
#include <stdbool.h>
#include <Arduino.h>

#include "WeELFPort.h"


class WeButton
{
public:

  WeButton(void);
  WeButton(uint8_t port);

  int16_t read(void);
  
 private:
	uint8_t _Sensorpin;

};

#endif

