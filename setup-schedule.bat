@echo off
echo Setting up Viniv Auto Report scheduled task...
echo This will run every Saturday at 11:30 PM (London time)
echo.

schtasks /create /tn "Viniv Auto Report" /tr "python \"%~dp0viniv-auto.py\"" /sc weekly /d SAT /st 23:30 /f

echo.
echo Done! Task "Viniv Auto Report" has been created.
echo It will run every Saturday at 11:30 PM.
echo.
echo To check: Task Scheduler > Task Scheduler Library > "Viniv Auto Report"
echo To remove: schtasks /delete /tn "Viniv Auto Report" /f
echo.
pause
