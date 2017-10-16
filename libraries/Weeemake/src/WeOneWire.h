#ifndef WeOneWire_H
#define WeOneWire_H

#include <stdint.h>
#include <stdbool.h>
#include <Arduino.h>
#include <WeConfig.h>


class WeOneWire
{
private:
	uint8_t WePIN;
	  uint8_t   bitmask;
  volatile MeIO_REG_TYPE *baseReg;
//  MeIO_REG_TYPE mask = bitmask;
//  volatile MeIO_REG_TYPE *reg MeIO_REG_ASM = baseReg;
public:
   WeOneWire(uint8_t pin);
    WeOneWire();
   void reset(uint8_t pin);
   
   uint8_t reset(void);
   uint8_t respond(void);
   void write_byte(uint8_t v);
   uint8_t read_bit(void);
   uint8_t read_byte(void);  
};

#endif



