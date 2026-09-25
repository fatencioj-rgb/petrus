@echo off
echo ================================================
echo   Installing Viniv local server certificate
echo   as trusted in Windows...
echo ================================================
echo.
echo This removes the "Not secure" warning for localhost:5050
echo.

certutil -addstore -f "ROOT" "%~dp0server.crt"

echo.
echo Done! Restart your browser for the change to take effect.
echo.
pause
