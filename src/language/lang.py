from collections import OrderedDict
import csv
import re

prefix = "Blockly.Msg."
pattern = re.compile(r"([^=\s]+)\s*=\s*(.+?);?$")
string = re.compile(r"^(['\"]).*?\1$")

def parse(data, name):
	result = OrderedDict()
	lineList = re.split(r"[\r\n]+", data)
	lineList = [line.strip() for line in lineList]
	lineList = [line for line in lineList if len(line) and not line.startswith("//")]
	lineList.pop(0)
	for line in lineList:
		mt = pattern.match(line)
		assert mt is not None
		assert mt[1].startswith(prefix)
		key = mt[1][len(prefix):]
		if mt[2].startswith(prefix):
			val = mt[2][len(prefix):]
			val = result[val]
		else:
			assert string.match(mt[2])
			val = mt[2][1:-1]
		result[key] = val
	return result

def read():
	with open("en.js", encoding="utf8") as f:
		en = parse(f.read(), "en")
	with open("zh-hans.js", encoding="utf8") as f:
		zh = parse(f.read(), "zh")
	with open("tw-hans.js", encoding="utf8") as f:
		tw = parse(f.read(), "tw")
	return
	rows = [(k, en[k], zh.get(k), tw.get(k)) for k in en]
	with open("data.csv", "w", encoding="utf8") as f:
		writer = csv.writer(f)
		writer.writerows(rows)

def genFile(reader, index):
	result = ["Blockly = {Msg:{}};"]
	for row in reader:
		result.append(prefix + row[0] + f' = "{row[index]}";')
	return "\n".join(result)

def write():
	with open("lang.csv", encoding="ansi") as f:
		reader = list(csv.reader(f))
		nameList = ["a.js", "b.js", "c.js"]
		dataList = [genFile(reader, i+1) for i in range(len(nameList))]
		for i in range(len(nameList)):
			with open("test/" + nameList[i], "w", encoding="utf8") as f:
				f.write(dataList[i])
		

write()
input()
