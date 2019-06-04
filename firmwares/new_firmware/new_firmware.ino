#include <WeELF328P.h>

#define MAX_SERVO_COUNT 10

typedef byte (*Handler)(byte*);
Handler handlerList[] = {
	onOneWireGet, onDigitalRead, onAnalogRead, onIR, onTemperature,
	onOneWireSet, onDigitalWrite, onAnalogWrite, onBuzzer, onRGB, onServo, onStopMotor,
	onLedMatrix, onRJ11RGB
};

Servo servo_list[MAX_SERVO_COUNT];
uint8_t servo_pins[MAX_SERVO_COUNT]={0};

WeInfraredReceiver ir;

void setup()
{
	Serial.begin(115200);
	ir.begin();
}

void loop()
{
	ir.loop();
	loopSerial();
}

void loopSerial()
{
	const  byte buffer_len = 64;
	static byte buffer[buffer_len];
	static byte buffer_index = 0;

	int available = Serial.available();
	if(available <= 0)return;
	int recv_count = Serial.readBytes(buffer + buffer_index, available);
	if(recv_count <= 0)return;
	buffer_index += recv_count;
	if(buffer_index < 6)return;
	if(buffer[2] > buffer_index - 1)return;
	buffer_index = 0;
	if(buffer[buffer[2]] != 0xA)return;
	int len = 3;
	while(len < buffer[2]){
		Handler handler = handlerList[buffer[len] & 0xF];
		if(!handler)break;
		len += handler(buffer+len);
	}
	if(buffer[3] & 0x10){
		replyVoid(buffer[1]);
	}
}

void replayWait(uint8_t recv_count)
{
	Serial.print('R');
	Serial.write(0);
	Serial.write(5);
	Serial.write(0xFF);
	Serial.write(recv_count);
	Serial.write('\n');
}

void replyVoid(uint8_t index)
{
	Serial.print('R');
	Serial.write(index);
	Serial.write(4);
	Serial.write(0);
	Serial.write('\n');
}

void replyU8(uint8_t index, uint8_t value)
{
	Serial.print('R');
	Serial.write(index);
	Serial.write(5);
	Serial.write(1);
	Serial.write(value);
	Serial.write('\n');
}

void replyU16(uint8_t index, uint16_t value)
{
	Serial.print('R');
	Serial.write(index);
	Serial.write(6);
	Serial.write(2);
	Serial.write(value >> 8);
	Serial.write(value & 0xFF);
	Serial.write('\n');
}

void replyBytes(uint8_t index, uint16_t len, byte *data)
{
	Serial.print('R');
	Serial.write(index);
	Serial.write(4 + len);
	Serial.write(3);
	Serial.write(data, len);
	Serial.write('\n');
}

byte onOneWireGet(byte *cmd)
{
	uint8_t msg_index = *(cmd - 2);
	WeOneWire oneWire(cmd[1]);
	oneWire.recv(cmd[2], cmd[3], cmd+4);
	replyBytes(msg_index, cmd[3], cmd+4);
	return 4;
}

byte onDigitalRead(byte *cmd)
{
	uint8_t msg_index = *(cmd - 2);
	pinMode(cmd[1], INPUT);
	replyU8(msg_index, digitalRead(cmd[1]));
	return 2;
}

byte onAnalogRead(byte *cmd)
{
	uint8_t msg_index = *(cmd - 2);
	pinMode(cmd[1], INPUT);
	replyU16(msg_index, analogRead(cmd[1]));
	return 2;
}

byte onIR(byte *cmd)
{
	uint8_t msg_index = *(cmd - 2);
	ir.reset(cmd[1]);
	replyU8(msg_index, ir.getValue());
	return 2;
}

byte onTemperature(byte *cmd)
{
	uint8_t msg_index = *(cmd - 2);
	WeTemperature temperature(cmd[1]);
	replyU16(msg_index, temperature.temperature() * 16);
	return 2;
}

byte onOneWireSet(byte *cmd)
{
	WeOneWire oneWire(cmd[1]);
	oneWire.send(cmd[2], cmd[3], cmd+4);
	return 4 + cmd[3];
}

byte onDigitalWrite(byte *cmd)
{
	pinMode(cmd[1], OUTPUT);
	digitalWrite(cmd[1], cmd[0] >> 7);
	return 2;
}

byte onAnalogWrite(byte *cmd)
{
	analogWrite(cmd[1], cmd[2]);
	return 3;
}

byte onBuzzer(byte *cmd)
{
	uint16_t *frequency = (uint16_t *)(cmd + 2);
	uint16_t *duration  = (uint16_t *)(cmd + 4);
	WeBuzzer buzzer(cmd[1]);
	buzzer.tone2(*frequency, *duration);
	return 6;
}

byte onRGB(byte *cmd)
{
	uint8_t port = cmd[1];
	uint8_t led_count = cmd[2];
	uint8_t buff_size = led_count * 3;
	uint8_t index = cmd[3];
	uint8_t *pixels	= (uint8_t*)memset(malloc(buff_size), 0, buff_size);
	if(index == 0){
		for(int i=0; i<led_count; ++i){//grb
			memcpy(pixels + i * 3, cmd + 4, 3);
		}
	}else{
		memcpy(pixels + (index - 1) * 3, cmd + 4, 3);
	}
	uint8_t pin_mask = digitalPinToBitMask(port);
	uint8_t *ws2812_port = (uint8_t*)portOutputRegister(digitalPinToPort(port));
	pinMode(port, OUTPUT);
	rgbled_sendarray_mask(pixels, buff_size, pin_mask, ws2812_port);
	free(pixels);
	return 7;
}

byte onServo(byte *cmd)
{
	uint8_t pin = cmd[1];
	uint8_t value = cmd[2];
	for(int i=0;i<MAX_SERVO_COUNT;++i){
		if(servo_pins[i] == pin){
			servo_list[i].write(value);
			break;
		}
		if(servo_pins[i])continue;
		servo_pins[i] = pin;
		servo_list[i].attach(pin);
		servo_list[i].write(value);
		break;
	}
	return 3;
}

byte onStopMotor(byte *cmd)
{
	//stop m1 m2
	analogWrite(cmd[1], 0);
	analogWrite(cmd[2], 0);

	uint8_t sensorType = 0;
	uint8_t buffer[2] = {0};
	WeOneWire oneWire;
	for(int i=0; i<cmd[3]; ++i){
		oneWire.reset(cmd[4+i]);
		if(!oneWire.recv(1, 1, &sensorType))continue;
		if(sensorType == 6){//编码
			buffer[0] = 1;
			oneWire.send(2, 2, buffer);
			delay(3);
			buffer[0] = 2;
			oneWire.send(2, 2, buffer);
		}else if(sensorType == 7){//步进
			oneWire.send(7, 0, 0);
		}
	}
	return cmd[3] + 4;
}

byte onLedMatrix(byte *cmd)
{
	byte type = cmd[2] >> 6;//0-7x21, 1-5x14
	byte data[21] = {0};
	if(type == 0){
		cast(cmd+2, data, 21, 7, 2);
	}else{
		cast(cmd+2, data, 14, 5, 2);
	}
	WeOneWire oneWire(cmd[1]);
	oneWire.send(2, type ? 14 : 21, data);
	return 2 + (type ? 9 : 19);
}

byte onRJ11RGB(byte *cmd)
{
	byte index = cmd[0] >> 5;
	byte data[15] = {0};
	if(index > 0){
		memcpy(data+(index-1)*3, cmd+2, 3);
	}else{
		for(int i=0; i<15; i+=3){
			memcpy(data+i, cmd+2, 3);
		}
	}
	WeOneWire oneWire(cmd[1]);
	oneWire.send(2, 15, data);
	return 5;
}

void cast(byte *src, byte *dest, byte destLen, byte bitCountPerByte, byte bitOffset)
{
	int mask = (1 << bitCountPerByte) - 1;
	int offset = bitOffset;
	for(int i=0; i<destLen; ++i){
		int size = 8 - offset % 8;
		int index = offset / 8;
		int diff = size - bitCountPerByte;
		byte value;
		if(diff >= 0){
			value = src[index] >> diff;
		}else{
			value = src[index] << -diff | src[index+1] >> diff+8;
		}
		dest[i] = value & mask;
		offset += bitCountPerByte;
	}
}
/*
byte parseCmdBin(byte *cmd)
{
	uint8_t msg_index = *(cmd - 2);
	switch(cmd[0]){
		case 1://one wire set
			oneWire.reset(cmd[1]);
			oneWire.send(cmd[2], cmd[3], cmd+4);
			return 4 + cmd[3];
		case 2://one wire get
			oneWire.reset(cmd[1]);
			oneWire.recv(cmd[2], cmd[3], cmd+4);
			replyBytes(msg_index, cmd[3], cmd+4);
			return 4;
		case 4://digitalRead
			pinMode(cmd[1], INPUT);
			replyU8(msg_index, digitalRead(cmd[1]));
			return 2;
		case 5://analogRead
			pinMode(cmd[1], INPUT);
			replyU16(msg_index, analogRead(cmd[1]));
			return 2;
		case 6://digitalWrite
			pinMode(cmd[1], OUTPUT);
			digitalWrite(cmd[1], cmd[2]);
			return 3;
		case 7://analogWrite
			pinMode(cmd[1], OUTPUT);
			analogWrite(cmd[1], cmd[2]);
			return 3;
		case 10://buzzer
		{
			uint16_t *frequency = (uint16_t *)(cmd + 2);
			uint32_t *duration  = (uint32_t *)(cmd + 4);
			buzzer.reset(cmd[1]);
			buzzer.tone2(*frequency, *duration);
			return 8;
		}
		case 11://ir
			ir.reset(cmd[1]);
			replyU8(msg_index, ir.getValue());
			return 2;
		case 12://temperature
			temperature.reset(cmd[1]);
			replyU16(msg_index, temperature.temperature() * 16);
			return 2;
		case 13://rgb led
		{
			uint8_t port = cmd[1];
			uint8_t led_count = cmd[2];
			uint8_t buff_size = led_count * 3;
			uint8_t index = cmd[3];
			uint8_t *pixels	= (uint8_t*)memset(malloc(buff_size), 0, buff_size);
			if(index == 0){
				for(int i=0; i<led_count; ++i){//grb
					memcpy(pixels + i * 3, cmd + 4, 3);
				}
			}else{
				memcpy(pixels + (index - 1) * 3, cmd + 4, 3);
			}
			uint8_t pin_mask = digitalPinToBitMask(port);
			uint8_t *ws2812_port = (uint8_t*)portOutputRegister(digitalPinToPort(port));
			pinMode(port, OUTPUT);
			rgbled_sendarray_mask(pixels, buff_size, pin_mask, ws2812_port);
			free(pixels);
			return 7;
		}
		case 14://servo
		{
			uint8_t pin = cmd[1];
			uint8_t value = cmd[2];
			for(int i=0;i<MAX_SERVO_COUNT;++i){
				if(servo_pins[i] == pin){
					servo_list[i].write(value);
					break;
				}
				if(servo_pins[i])continue;
				servo_pins[i] = pin;
				servo_list[i].attach(pin);
				servo_list[i].write(value);
				break;
			}
			return 3;
		}
		case 3://stop motors
		{
			//stop m1 m2
			pinMode(cmd[1], OUTPUT);
			pinMode(cmd[3], OUTPUT);
			digitalWrite(cmd[1], 0);
			digitalWrite(cmd[3], 0);
			analogWrite(cmd[2], 0);
			analogWrite(cmd[4], 0);

			uint8_t sensorType = 0;
			uint8_t buffer[2] = {0};
			for(int i=0; i<cmd[5]; ++i){
				oneWire.reset(cmd[6+i]);
				if(!oneWire.recv(1, 1, &sensorType))continue;
				if(sensorType == 6){//编码
					buffer[0] = 1;
					oneWire.send(2, 2, buffer);
					delay(3);
					buffer[0] = 2;
					oneWire.send(2, 2, buffer);
				}else if(sensorType == 7){//步进
					oneWire.send(7, 0, 0);
				}
			}
			return cmd[5] + 6;
		}
	}
	return 0xFF;
}
*/
