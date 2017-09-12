
export function newXML(tagName, attrbutes, children){
    var result = "<" + tagName;
    if(attrbutes != null){
        for(var key in attrbutes){
            result += ` ${key}="${attrbutes[key]}"`;
        }
    }
    result += ">";
    if(children != null){
        for(var i=0; i<children.length; ++i){
            result += children[i];
        }
    }
    result += `</${tagName}>`;
    return result;
}

export function newNumberValue(name, defaultValue){
    return newXML("value", {"name":name}, [
        newXML("shadow", {"type":"math_number"}, [
            newXML("field", {"name":"NUM"}, [defaultValue])
        ])
    ]);
}

export function newTextValue(name, defaultValue){
    return newXML("value", {"name":name}, [
        newXML("shadow", {"type":"text"}, [
            newXML("field", {"name":"TEXT"}, [defaultValue])
        ])
    ]);
}

export function newDropdownValue(name, defaultValue){
    return newXML("value", {"name":name}, [
        newXML("shadow", {"type":name.toLowerCase()}, [
            newXML("field", {"name":name}, [defaultValue])
        ])
    ]);
}

export function newBlock(type, children){
    return newXML("block", {"type":type}, children);
}
