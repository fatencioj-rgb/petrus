@echo off
echo ============================================================
echo   Petrus FOH - Servidor de notificaciones (gratis)
echo ============================================================
echo Manten esta ventana abierta para que lleguen las notificaciones.
echo Cierra la ventana para detenerlo.
echo.
cd /d "%~dp0"
python push-server.py
pause
