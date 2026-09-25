' start-viniv-server.vbs
' Arranca el servidor VINIV (Flask) en segundo plano, SIN ventana de consola visible.
' Se usa desde la tarea programada que corre al iniciar sesion en Windows.

Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' Carpeta donde vive este script (petrus-site)
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)

' Comando: python viniv-server.py  (0 = ventana oculta, False = no esperar)
shell.CurrentDirectory = scriptDir
shell.Run "python """ & scriptDir & "\viniv-server.py""", 0, False
