[Languages]
Name: "en"; MessagesFile: "compiler:Default.isl"
Name: "zh_cn"; MessagesFile: "compiler:Languages\ChineseSimplified.isl"

[InstallDelete]
Type: filesandordirs; Name: "{app}\Arduino\libraries\Weeemake"
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
Source: "build\static\*";         DestDir: "{app}\static";     Flags: recursesubdirs createallsubdirs
Source: "build\firmwares\*";      DestDir: "{app}\firmwares";  Flags: recursesubdirs createallsubdirs
Source: "build\css\*";            DestDir: "{app}\css";        Flags: recursesubdirs createallsubdirs
Source: "build\sound-files\*";    DestDir: "{app}\sound-files";Flags: recursesubdirs createallsubdirs
Source: "build\media\*";          DestDir: "{app}\media"
Source: "build\drivers\*";        DestDir: "{app}\drivers"
Source: "build\main.html";        DestDir: "{app}"
Source: "build\package.json";     DestDir: "{app}"
Source: "build\weeecode.png";     DestDir: "{app}"
Source: "build\untitled.wc";      DestDir: "{app}"
Source: "build\*.js";             DestDir: "{app}"