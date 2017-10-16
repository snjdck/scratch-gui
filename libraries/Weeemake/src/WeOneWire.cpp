#include "WeOneWire.h"



 

WeOneWire::WeOneWire(uint8_t pin)
{
  WePIN=pin;
  bitmask = MePIN_TO_BITMASK(pin);
  baseReg = MePIN_TO_BASEREG(pin);
}

WeOneWire::WeOneWire(void)
{

}

void WeOneWire::reset(uint8_t pin)
{
  WePIN=pin;
  bitmask = MePIN_TO_BITMASK(pin);
  baseReg = MePIN_TO_BASEREG(pin);
}

uint8_t WeOneWire::reset(void)
{ 
	MeIO_REG_TYPE mask = bitmask;
	 volatile MeIO_REG_TYPE *reg MeIO_REG_ASM = baseReg;

  uint8_t r;
//  noInterrupts();
//  digitalWrite(WePIN,LOW);
//  pinMode(WePIN,OUTPUT);

  MeDIRECT_MODE_OUTPUT(reg, mask);
 MeDIRECT_WRITE_LOW(reg, mask);

 // interrupts();
//  delayMicroseconds(480);
 delayMicroseconds(480);

 // noInterrupts();
//  pinMode(WePIN,INPUT);
  MeDIRECT_MODE_INPUT(reg, mask);
  
//  delayMicroseconds(140);
  delayMicroseconds(50);

//  r=digitalRead(WePIN);
  r=MeDIRECT_READ(reg, mask);
//  interrupts();
//  delayMicroseconds(140);
  delayMicroseconds(100);

  return(r);
}

uint8_t WeOneWire::respond(void)
{ 
	MeIO_REG_TYPE mask = bitmask;
	 volatile MeIO_REG_TYPE *reg MeIO_REG_ASM = baseReg;

  unsigned long time;
  time = millis();
  MeDIRECT_MODE_INPUT(reg, mask);
  while(MeDIRECT_READ(reg, mask)==1)
  {
  	if((millis()-time)>100)
	return 0;
  }
//  pinMode(WePIN,INPUT);


  while(MeDIRECT_READ(reg, mask)==0);
 // delayMicroseconds(450);
//  noInterrupts();
//  digitalWrite(WePIN,LOW);
  MeDIRECT_MODE_OUTPUT(reg, mask);

  MeDIRECT_WRITE_LOW(reg, mask);
 // pinMode(WePIN,OUTPUT);
  //interrupts();
 // delayMicroseconds(460);
// delayMicroseconds(300);
  delayMicroseconds(30);
//  pinMode(WePIN,INPUT);
  MeDIRECT_MODE_INPUT(reg, mask);
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
  MeIO_REG_TYPE mask = bitmask;
  volatile uint8_t *reg MeIO_REG_ASM = baseReg;
  time = millis();
 
  while(MeDIRECT_READ(reg, mask)==1)
  {
  	if((millis()-time)>3)
	break;
  }
 //while(MeDIRECT_READ(reg, mask)==0);
 // delayMicroseconds(45);
  noInterrupts();
  delayMicroseconds(30);
 //noInterrupts();

 // r=digitalRead(WePIN);
  r = MeDIRECT_READ(reg, mask);
  interrupts();

  delayMicroseconds(40);
 // while(MeDIRECT_READ(reg, mask)==0);
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










