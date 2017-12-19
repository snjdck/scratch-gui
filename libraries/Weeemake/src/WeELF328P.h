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
