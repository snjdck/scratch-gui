#ifndef _WeELF328P_H
#define _WeELF328P_H

#include <Arduino.h>
#include "WeConfig.h"


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
#include "WeSlidingPotentiomter.h"
#include "WePotentiomter.h"
#include "WeGasSensor.h"
#include "We4LEDButton.h"
#include "We7SegmentDisplay.h"
#include "WeHumiture.h"
#include "We130DCMotor.h"
#include "WeSingleLineFollower.h"
#include "WeIRAvoidSensor.h"
#include "WeStepperMotor.h"
#include "WeRelay.h"
#include "WeTouchSensor.h"
#include "WeRGBLED_RJ.h"
#include "WeTiltSwitch.h"
#include "WePIRSensor.h"

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


uint8_t WeonePort[17]=
{
     NC, A0, A1, A5, A4, A3, A2, 9, 10, 12, 4, 3, 2, 11, NC, NC, NC,
};

WePort_TwoSig WetwoPort[12] =
{
    { NC, NC }, { 6, 7 }, {  5,  8 }, { A5, 1 }, {  A5,  2 },
	{ A4, 1 }, { A4, 2 }, { A3, 1 }, { A3, 2 }, {  A2,  1 },
	{  A2,  2 }, { NC, NC },
};
void setfastPWM()
{
	
}


#endif 
