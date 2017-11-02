
#ifndef WeELFPort_H
#define WeELFPort_H

#include <Arduino.h>
#include <avr/interrupt.h>
#include <avr/io.h>
#include <util/delay.h>
#include <stdint.h>
#include <stdlib.h>
#include "WeConfig.h"


#include "WeOneWire.h"
#include "WeDCMotor.h"
#include "WeLineFollower.h"
#include "WeUltrasonicSensor.h"
#include "WeLEDPanelModuleMatrix7_21.h"
#include "WeBuzzer.h"
#include "WeLightSensor.h"
#include "WeSoundSensor.h"
#include "WeButton.h"
#include "WeRGBLed.h"
#include "WeInfraredReceiver.h"
#include "WeTemperature.h"

#include "LinkedList.h"


#define PORT_A  (9)
#define PORT_B  (10)
#define PORT_C  (12)
#define PORT_D  (4)
#define PORT_1  (A0)
#define PORT_2  (A1)
#define PORT_3  (A5)
#define PORT_4  (A4)
#define PORT_5  (A3)
#define PORT_6  (A2)


#define OnBoard_RGB           (3)
#define OnBoard_Button        (2)
#define OnBoard_Buzzer        (11)


#define NC (0)

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



#endif 
