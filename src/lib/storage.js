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
        this.fileHelper = new FileHelper();
    }

    load (assetType, assetId, dataFormat) {
        /** @type {Helper[]} */
        const helpers = [this.builtinHelper, this.localHelper, this.fileHelper];
        const errors = [];
        let helperIndex = 0;
        dataFormat = dataFormat || assetType.runtimeFormat;

        return new Promise((fulfill, reject) => {
            const tryNextHelper = () => {
                if (helperIndex < helpers.length) {
                    const helper = helpers[helperIndex++];
                    helper.load(assetType, assetId, dataFormat)
                        .then(
                            asset => {
                                if (asset === null) {
                                    tryNextHelper();
                                } else {
                                    // TODO? this.localHelper.cache(assetType, assetId, asset);
                                    if (helper !== this.builtinHelper && assetType.immutable) {
                                        asset.assetId = this.builtinHelper.cache(
                                            assetType,
                                            asset.dataFormat,
                                            asset.data,
                                            assetId
                                        );
                                    }
                                    // Note that other attempts may have caused errors, effectively suppressed here.
                                    fulfill(asset);
                                }
                            },
                            error => {
                                errors.push(error);
                                // TODO: maybe some types of error should prevent trying the next helper?
                                tryNextHelper();
                            }
                        );
                } else if (errors.length === 0) {
                    // Nothing went wrong but we couldn't find the asset.
                    fulfill(null);
                } else {
                    // At least one thing went wrong and also we couldn't find the asset.
                    reject(errors);
                }
            };

            tryNextHelper();
        });
    }
}

export default Storage;
