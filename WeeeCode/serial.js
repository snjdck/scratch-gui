
function castValue(data){
    switch(data){
    case "true": return true;
    case "false":return false;
    }
    return Number(data);
}

export default class Serial {
    constructor (vm) {
        this.weeecode = vm.weeecode;
        this.query = null;
        this._resolves = {};
    }

    postData(data){
        var slot = data.slot;
        var report = data.report;
        if(slot in this._resolves){
            if(report != null){
                this._resolves[slot](castValue(report));
            }else{
                this._resolves[slot]();
            }
            delete this._resolves[slot];
        }
    }

    sendMsg(data){
        this.weeecode.sendCmd(data);
    }

    regResolve(data){
        var slot = data["slot"];
        var cb = data["resolve"];
        this._resolves[slot] = cb;
    }
}

