@echo off
REM ============================================================
REM  Configura el arranque automatico del servidor VINIV
REM  usando la carpeta de Inicio de Windows (no requiere admin).
REM ============================================================
echo Instalando arranque automatico del servidor VINIV...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$vbs = Join-Path '%~dp0'.TrimEnd('\') 'start-viniv-server.vbs';" ^
  "$startup = [Environment]::GetFolderPath('Startup');" ^
  "$lnk = Join-Path $startup 'Viniv Report Server.lnk';" ^
  "$ws = New-Object -ComObject WScript.Shell;" ^
  "$sc = $ws.CreateShortcut($lnk);" ^
  "$sc.TargetPath = 'wscript.exe';" ^
  "$sc.Arguments = ('\"' + $vbs + '\"');" ^
  "$sc.WorkingDirectory = '%~dp0'.TrimEnd('\');" ^
  "$sc.Save();" ^
  "Write-Host ('[OK] Acceso directo creado: ' + $lnk)"

echo.
echo Arrancando el servidor ahora para no tener que reiniciar...
wscript.exe "%~dp0start-viniv-server.vbs"
echo [OK] Servidor arrancado. Espera unos segundos y recarga la pagina.
echo.
echo El servidor ahora se iniciara solo cada vez que inicies sesion.
echo.
pause
