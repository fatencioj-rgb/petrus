@echo off
echo Arrancando el servidor VINIV en segundo plano (sin ventana)...
wscript.exe "%~dp0start-viniv-server.vbs"
echo.
echo Listo. Espera unos 10 segundos y recarga la pagina somm-viniv.
echo El servidor corre en https://localhost:5050
timeout /t 3 >nul
