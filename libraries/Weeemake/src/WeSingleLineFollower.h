
#ifndef WeSingleLineFollower_H
#define WeSingleLineFollower_H

#include "WePort.h"

class WeSingleLineFollower : public WeSensor
{
public:
  int16_t read(void);
};

#endif

