@echo off
REM Quita el arranque automatico del servidor VINIV (borra el acceso directo de Inicio).
echo Quitando el arranque automatico del servidor VINIV...

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$lnk = Join-Path ([Environment]::GetFolderPath('Startup')) 'Viniv Report Server.lnk';" ^
  "if (Test-Path $lnk) { Remove-Item $lnk -Force; Write-Host '[OK] Arranque automatico eliminado.' } else { Write-Host '[i] No habia arranque automatico configurado.' }"

echo.
echo Nota: esto NO detiene el servidor si ya esta corriendo.
echo Para detenerlo, reinicia el PC o usa el Administrador de tareas (proceso python).
echo.
pause
