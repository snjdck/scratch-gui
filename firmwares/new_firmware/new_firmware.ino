#include <WeELF328P.h>
#include <WeInfraredSender.h>

#define VERSION 1
#define MAX_SERVO_COUNT 10

typedef byte (*Handler)(byte*);
Handler handlerList[] = {
	onOneWireGet, onDigitalRead, onAnalogRead, onIR, onTemperature,
	onOneWireSet, onDigitalWrite, onAnalogWrite, onBuzzer, onRGB, onServo, onStopMotor,
	onLedMatrix, onRJ11RGB, onIR_Sender, onQueryVersion
};
bool replyFlag;

Servo servo_list[MAX_SERVO_COUNT];
byte servo_pins[MAX_SERVO_COUNT]={0};

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
	if(buffer[0] == 'X'){
		if(buffer_index < 20)return;
		buffer_index = 0;
		byte data[21] = {0};
		byte info = buffer[19];
		cast(buffer+1, data, 21, 7);
		WeOneWire oneWire((info & 0xF) + (info & 0x10 ? A0 : 0));
		oneWire.send(2, 21, data);
		replyVoid(0);
		return;
	}
	if(buffer[0] != 'W'){
		buffer_index = 0;
		return;
	}
	if(buffer_index < 6 || buffer_index < buffer[2])return;
	buffer_index = 0;
	int offset = buffer[2] - 2;
	if(buffer[offset] != 0xA || buffer[offset+1] != checksum(buffer, offset+1)){
		replyError();
		return;
	}
	replyFlag = false;
	int len = 3;
	while(len < offset){
		Handler handler = handlerList[buffer[len] & 0xF];
		if(!handler)break;
		len += handler(buffer+len);
	}
	if(!replyFlag){
		replyVoid(buffer[1]);
	}
}

byte checksum(byte *data, int len)
{
	int sum = 0;
	for(int i=0; i<len; ++i)
		sum += data[i];
	return sum & 0xFF;
}

void reply(byte *buffer, byte len)
{
	buffer[2] = len;
	buffer[len-1] = checksum(buffer, len);
	Serial.write(buffer, len);
	replyFlag = true;
}

void replyError()
{
	byte buffer[] = {'R', 0, 0, 0xFF, '\n', 0};
	reply(buffer, sizeof(buffer));
}

void replyVoid(uint8_t index)
{
	byte buffer[] = {'R', index, 0, 0, '\n', 0};
	reply(buffer, sizeof(buffer));
}

void replyU8(uint8_t index, uint8_t value)
{
	byte buffer[] = {'R', index, 0, 1, value, '\n', 0};
	reply(buffer, sizeof(buffer));
}

void replyU16(uint8_t index, uint16_t value)
{
	byte buffer[] = {'R', index, 0, 2, value >> 8, value & 0xFF, '\n', 0};
	reply(buffer, sizeof(buffer));
}

void replyBytes(uint8_t index, byte len, byte *data)
{
	byte buffer[30] = {'R', index, 0, 3};
	memcpy(buffer + 4, data, len);
	buffer[len+4] = '\n';
	reply(buffer, len + 6);
}

byte onOneWireGet(byte *cmd)
{
	uint8_t msg_index = *(cmd - 2);
	WeOneWire oneWire(cmd[1]);
	uint8_t len = *(cmd - 1);
	if(len > 9){
		oneWire.write(cmd[2], cmd[3], cmd + len - 5, cmd[4] * 1000, len - 10, cmd + 5);
		replyBytes(msg_index, cmd[3], cmd + len - 5);
		return len - 5;
	}
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

byte onIR_Sender(byte *cmd)
{
	WeInfraredSender sender(cmd[1]);
	sender.send_nec_message(cmd[3], cmd[2]);
	return 4;
}

byte onRGB(byte *cmd)
{
	byte pixels[32*3] = {0};

	uint8_t port = cmd[1];
	uint8_t led_count = cmd[2];
	uint8_t buff_size = led_count * 3;
	uint8_t index = cmd[3];

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
	return 7;
}

byte onServo(byte *cmd)
{
	uint8_t pin = cmd[1];
	uint8_t value = cmd[2];
	if(cmd[0] & 0x10){//mini
		int pulsewidth = (value * 8) + 400;
		pinMode(pin, OUTPUT);
		for(int i=0;i<50;++i){
			digitalWrite(pin, HIGH);
			delayMicroseconds(pulsewidth);
			digitalWrite(pin, LOW);
			delayMicroseconds(20000 - pulsewidth);
		}
		return 3;
	}
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
	bool isSmallMatrix = cmd[0] & 1 << 5;//0-7x21, 1-5x14
	bool isCompressed = cmd[0] & 1 << 6;
	byte data[21] = {0};
	byte length = 2 + (isSmallMatrix ? 9 : 19);
	if(isCompressed){
		byte x = cmd[2] >> 3;
		byte y = cmd[2] & 7;
		byte w = cmd[3] >> 3;
		byte h = cmd[3] & 7;
		cast(cmd+4, data+x, w, h);
		for(int i=0; i<w; ++i)
			data[x+i] <<= y;
		length = 4 + ceil(w * h / 8.0);
	}else if(isSmallMatrix){
		cast(cmd+2, data, 14, 5);
	}else{
		cast(cmd+2, data, 21, 7);
	}
	WeOneWire oneWire(cmd[1]);
	oneWire.send(2, isSmallMatrix ? 14 : 21, data);
	return length;
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

byte onQueryVersion(byte *cmd)
{
	uint8_t msg_index = *(cmd - 2);
	replyU8(msg_index, VERSION);
	return 1;
}

void cast(byte *src, byte *dest, byte destLen, byte bitCountPerByte)
{
	int mask = (1 << bitCountPerByte) - 1;
	int offset = 0;
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
