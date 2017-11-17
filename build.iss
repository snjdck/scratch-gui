[Languages]
Name: "en"; MessagesFile: "compiler:Default.isl"
Name: "zh_cn"; MessagesFile: "compiler:Languages\ChineseSimplified.isl"

[InstallDelete]
Type: filesandordirs; Name: "{app}\Arduino\libraries\Weeemake"
Type: files; Name: "{app}\package.json"
Type: files; Name: "{app}\*.dll"

[Setup]
AppName=WeeeCode
AppVersion=0.1
DefaultDirName={pf}\WeeeCode
SetupIconFile=weee_code_icon.ico
OutputDir=.
OutputBaseFilename=WeeeCodeSetup
AlwaysShowDirOnReadyPage=yes
DisableDirPage=no

[Run]
Filename: "{app}\drivers\CH34x_Install_Windows_v3_4.EXE"; Description: "WeeeMake Board Driver"; Flags: postinstall nowait

[Icons]
Name: "{commondesktop}\WeeeCode"; Filename: "{app}\WeeeCode.exe"
Name: "{commondesktop}\Arduino";  Filename: "{app}\Arduino\Arduino.exe"

[Tasks]
Name: desktopicon; Description: {cm:CreateDesktopIcon}

;[Dirs]
;Name: "{app}\workspace\project"

[Files]
Source: "nwjs-v0.25.4-win-ia32\*";DestDir: "{app}";            Flags: recursesubdirs createallsubdirs
Source: "build\Arduino\*";        DestDir: "{app}\Arduino";    Flags: recursesubdirs createallsubdirs
Source: "build\drivers\*";        DestDir: "{app}\drivers"
Source: "build\static\*";         DestDir: "{app}\package.nw\static";     Flags: recursesubdirs createallsubdirs
Source: "build\firmwares\*";      DestDir: "{app}\package.nw\firmwares";  Flags: recursesubdirs createallsubdirs
Source: "build\css\*";            DestDir: "{app}\package.nw\css";        Flags: recursesubdirs createallsubdirs
Source: "build\sound-files\*";    DestDir: "{app}\package.nw\sound-files";Flags: recursesubdirs createallsubdirs
Source: "build\media\*";          DestDir: "{app}\package.nw\media"
Source: "build\main.html";        DestDir: "{app}\package.nw"
Source: "build\package.json";     DestDir: "{app}\package.nw"
Source: "build\weeecode.png";     DestDir: "{app}\package.nw"
Source: "build\untitled.wc";      DestDir: "{app}\package.nw"
Source: "build\*.js";             DestDir: "{app}\package.nw"