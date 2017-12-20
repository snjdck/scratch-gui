#include "WeRelay.h"

WeRelay::WeRelay(uint8_t port)
{
    _WeRelay.reset(port);
	
}

void WeRelay::reset(uint8_t port)
{	
	_WeRelay.reset(port);	
}

void WeRelay::openNC(void)
{
  
     if(_WeRelay.reset()!=0)
    return;
     _WeRelay.write_byte(0x02); 
     _WeRelay.reset();
     _WeRelay.write_byte(1);
  
}

void WeRelay::closeNC(void)
{
  
     if(_WeRelay.reset()!=0)
    return;
     _WeRelay.write_byte(0x02); 
     _WeRelay.reset();
     _WeRelay.write_byte(0);
  
}





