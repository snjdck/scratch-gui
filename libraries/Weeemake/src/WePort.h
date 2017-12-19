
#ifndef _WEPORT_H_
#define _WEPORT_H_

#include <Arduino.h>
#include <avr/interrupt.h>
#include <avr/io.h>
#include <util/delay.h>
#include <stdint.h>
#include <stdlib.h>
#include "WeOneWire.h"


typedef struct
{
  uint8_t s1;
  uint8_t s2;
} WePort_TwoSig;

extern uint8_t WeonePort[17];  
extern WePort_TwoSig WetwoPort[12];  
extern void setfastPWM();

#define NC (0)  //use UART RX for NULL port

#define PORT_1  (0x01)
#define PORT_2  (0x02)
#define PORT_3  (0x03)
#define PORT_4  (0x04)
#define PORT_5  (0x05)
#define PORT_6  (0x06)
#define PORT_A  (0x07)
#define PORT_B  (0x08)
#define PORT_C  (0x09)
#define PORT_D  (0x0a)

#define OnBoard_RGB           (0x0b)
#define OnBoard_Button        (0x0c)
#define OnBoard_Buzzer        (0x0d)
#define OnBoard_IR            (0x0e)
#define OnBoard_Light         (0x0f)
#define OnBoard_Sound         (0x10)


#define M1      (0x01)
#define M2      (0x02)
#define M3      (0x03)
#define M4      (0x04)
#define M5      (0x05)
#define M6      (0x06)
#define M7      (0x07)
#define M8      (0x08)
#define M9      (0x09)
#define M10     (0x0A)


#ifndef FALSE
#define FALSE   (0)
#endif

#ifndef TRUE
#define TRUE    (1)
#endif


#endif // MEPORT_H_
