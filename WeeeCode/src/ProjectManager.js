/**
 * Created by Riven on 2016/12/17.
 */
const fs = require('fs');
const path = require('path');
const crypt = require('crypto');
const admzip = require("adm-zip");

function renameByMd5(folder, filepath, ext){
    var img = fs.readFileSync(filepath);
    var md5 = crypt.createHash('md5');
    md5.update(img, 'utf8');
    var md5str = md5.digest('hex');
    var newFilepath = folder+"/"+md5str+ext;
    fs.rename(filepath,newFilepath, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });
}

function deleteFolderRecursive(path) {
    if(!fs.existsSync(path)){
    	return;
    }
    fs.readdirSync(path).forEach(function(file,index){
        var curPath = path + "/" + file;
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
            deleteFolderRecursive(curPath);
        } else { // delete file
            fs.unlinkSync(curPath);
        }
    });
    fs.rmdirSync(path);
}


class ProjectManager
{
    constructor(vm, workspace){
		this.vm = vm;
		this.workspaceFolder = workspace;
    }

	clearWorkspaceFolder(){
	    deleteFolderRecursive(this.workspaceFolder);
	}

	parseExamples (exampleFolder) {
	    var exampleList = [];
	    for(var p of fs.readdirSync(exampleFolder)){
	        var filepath = path.resolve(exampleFolder,p)
	        if(path.extname(filepath)==".sb2") {
	            var basename = path.basename(filepath, '.sb2');
	            var pngfile = path.resolve(exampleFolder,basename+".png");
	            var example = {"name":basename,"img":pngfile,"sb2":filepath}
	            exampleList.push(example);
	        }
	    }
	    return exampleList;
	}

	renameResourceToHash(folder){
		for(var p of fs.readdirSync(folder)){
	        var filepath = path.resolve(folder, p);
	        var extname = path.extname(filepath);
	        if(extname ==".png" || extname ==".svg") {
	            renameByMd5(folder, filepath, extname);
	        }
	    }
	}

	/**
	 * load sb2 format project file
	 * @param filepath
	 */
	loadsb2(filepath){
	    //window.vm.createEmptyProject();
	    this.clearWorkspaceFolder();
	    var projName = path.basename(filepath, '.sb2');
	    // 1. extract sb2 file to workspace
	    var zip = new admzip(filepath);
	    var zipEntries = zip.getEntries();
	    zip.extractAllTo(this.workspaceFolder,true);
	    // 2. rename resources

	    this.renameResourceToHash(this.workspaceFolder);
	    // 3. load project
	    var projectJson = path.resolve(this.workspaceFolder,"project.json");
	    var s = fs.readFileSync(projectJson, 'utf8');
	    this.vm.loadProject(s);

	    return projName;
	}
/*
	loadwb (filepath) {
	    var fileData = fs.readFileSync(filepath, 'utf8');
	    this.vm.loadProject(fileData);
	    //return path.basename(filepath).split(".")[0];
	}

	savewb (filePath) {
		var fileData = this.vm.saveProjectSb3();
	    fs.writeFileSync(filePath, fileData);
	}*/
}


module.exports = ProjectManager;
