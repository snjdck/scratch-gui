#ifndef _WeELFMini_H
#define _WeELFMini_H

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
#include "WeRelay.h"
#include "WeTouchSensor.h"
#include "WeRGBLED_RJ.h"
#include "WeTiltSwitch.h"
#include "WePIRSensor.h"


#define PORT_A  (0x07)
#define PORT_B  (0x08)
#define PORT_C  (0x09)
#define PORT_D  (0x0a)

#define OnBoard_Buzzer        (0x0d)
#define OnBoard_IR            (0x0e)
#define OnBoard_Light         (0x0f)
#define OnBoard_Sound         (0x10)


#define M1      (0x01)
#define M2      (0x02)


uint8_t WeonePort[17]=
{
     NC, NC, NC, NC, NC, NC, NC, A2, A3, A4, A5, NC, NC, 7, 2, A1, NC
  // NC, NC, NC, NC, NC, NC, NC, A5, A4, A2, A1, NC, NC, 7, 2, A7, A3
};

WePort_TwoSig WetwoPort[12] =
{
    { NC, NC }, { 5, 6 }, {  10,  9}, { NC, NC }, {  NC,  NC },
	{ NC, NC }, { NC, NC }, { NC, NC }, { NC, NC }, {  NC,  NC },
	{  NC, NC }, { NC, NC },
};

void setfastPWM()
{
	TCCR1A = _BV(WGM10);
	TCCR1B = _BV(CS11) | _BV(CS10) | _BV(WGM12);
	
//	TCCR2A = _BV(WGM21) | _BV(WGM20);
//	TCCR2B = _BV(CS22);

}


#endif 
