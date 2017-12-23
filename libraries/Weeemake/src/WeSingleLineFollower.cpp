#include "WeSingleLineFollower.h"

WeSingleLineFollower::WeSingleLineFollower(uint8_t port)
: WeSensor(port)
{
}

int16_t WeSingleLineFollower::read(void)
{
   return analogRead(_SensorPin);
}
