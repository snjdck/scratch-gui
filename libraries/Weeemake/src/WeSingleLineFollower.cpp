#include "WeSingleLineFollower.h"

int16_t WeSingleLineFollower::read(void)
{
   return analogRead(_SensorPin);
}
