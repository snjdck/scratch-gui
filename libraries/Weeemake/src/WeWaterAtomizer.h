
#ifndef _WeWaterAtomizer_H
#define _WeWaterAtomizer_H


#include "WePort.h"


class WeWaterAtomizer
{
public:

  WeWaterAtomizer(uint8_t port=0);
  void reset(uint8_t port=0);

  void start(void);
  void stop(void);

  
private:
	WeOneWire _WeWaterAtomizer;

};

#endif

