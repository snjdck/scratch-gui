import ScratchStorage from 'scratch-storage';


const fs = eval("require('fs')")

/**
 * Wrapper for ScratchStorage which adds default web sources.
 * @todo make this more configurable
 */

class FileHelper {
	load(assetType, assetId, dataFormat){
		var path = `media/${assetId}.${dataFormat}`;
		return new Promise((fulfill, reject) => {
			if(!fs.existsSync(path)){
				fulfill(null);
				return;
			}
    		fs.readFile(path, (err, data) => {
    			if(err){
    				reject(err);
    				return;
    			}
				var ab = new Uint8Array(new ArrayBuffer(data.length));
				for(var i=0, n=data.length; i<n; ++i){
					ab[i] = data[i];
				}
				const asset = new ScratchStorage.Asset(assetType, assetId, dataFormat);
				asset.setData(data, dataFormat);
        		fulfill(asset);
    		});
    	});
	}
}

class Storage extends ScratchStorage {
    constructor () {
        super();
        this.webHelper = new FileHelper();
    }
}

export default Storage;
