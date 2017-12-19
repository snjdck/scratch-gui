#include "WeOneWire.h"

WeOneWire::WeOneWire(uint8_t pin)
{
  WePIN=pin;
  bitmask = WePIN_TO_BITMASK(pin);
  baseReg = WePIN_TO_BASEREG(pin);
}

WeOneWire::WeOneWire(void)
{

}

void WeOneWire::reset(uint8_t pin)
{
  WePIN=pin;
  bitmask = WePIN_TO_BITMASK(pin);
  baseReg = WePIN_TO_BASEREG(pin);
}

uint8_t WeOneWire::reset(void)
{ 
	WeIO_REG_TYPE mask = bitmask;
	volatile WeIO_REG_TYPE *reg WeIO_REG_ASM = baseReg;

  uint8_t r;

  WeDIRECT_MODE_OUTPUT(reg, mask);
  WeDIRECT_WRITE_LOW(reg, mask);
  delayMicroseconds(480);
  pinMode(WePIN,INPUT);
  delayMicroseconds(50);
  r=WeDIRECT_READ(reg, mask);
  delayMicroseconds(100);

  return(r);
}

uint8_t WeOneWire::respond(void)
{ 
	WeIO_REG_TYPE mask = bitmask;
	 volatile WeIO_REG_TYPE *reg WeIO_REG_ASM = baseReg;

  unsigned long time;
  time = millis();
  WeDIRECT_MODE_INPUT(reg, mask);
  while(WeDIRECT_READ(reg, mask)==1)
  {
  	if((millis()-time)>100)
	return 0;
  }
  while(WeDIRECT_READ(reg, mask)==0);
  WeDIRECT_MODE_OUTPUT(reg, mask);
  WeDIRECT_WRITE_LOW(reg, mask);
  delayMicroseconds(30);
  pinMode(WePIN,INPUT);
  return 1;
}



void WeOneWire::write_byte(uint8_t v)
{
  uint8_t i;
  for(i=0;i<8;i++)
  {
    noInterrupts();
    digitalWrite(WePIN,LOW);
    pinMode(WePIN,OUTPUT);
    delayMicroseconds(5);
	if(v&0x01)
	  digitalWrite(WePIN,HIGH);
	else
	  digitalWrite(WePIN,LOW);
	v>>=1;
	interrupts();
	delayMicroseconds(30);
	digitalWrite(WePIN,HIGH);
	delayMicroseconds(5);
  }
  pinMode(WePIN,INPUT);
}

uint8_t WeOneWire::read_bit(void)
{
  uint8_t r;
  unsigned long time;
  WeIO_REG_TYPE mask = bitmask;
  volatile uint8_t *reg WeIO_REG_ASM = baseReg;
  time = millis();
 
  while(WeDIRECT_READ(reg, mask)==1)
  {
  	if((millis()-time)>3)
	break;
  }
  noInterrupts();
  delayMicroseconds(30);
  r = WeDIRECT_READ(reg, mask);
  interrupts();

  delayMicroseconds(40);
  return(r);
}

uint8_t WeOneWire::read_byte(void)
{
  uint8_t i,j,k=0;
  pinMode(WePIN,INPUT);
  for(i=0;i<8;i++)
  {
    j=WeOneWire::read_bit();
	k=(j<<7)|(k>>1);
  }

  return(k);
}










