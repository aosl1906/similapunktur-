@echo off
title Similapunktur - Start-Manager

:: Set working directory to the directory where this script is located
cd /d "%~dp0"

:MENU
cls
echo =======================================================================
echo                     SIMILAPUNKTUR START-MANAGER
echo =======================================================================
echo.
echo Bitte waehlen Sie den Modus, in dem Sie das Projekt starten moechten:
echo.
echo [1] Entwicklungsmodus (Vite Dev Server + Python Backend)
echo     - Ideal fuer Code-Aenderungen und Live-Reload.
echo     - Frontend laeuft auf: http://localhost:3000
echo     - Backend laeuft auf:  http://localhost:8000 (wird von Vite geproxt)
echo.
echo [2] Produktionsmodus (Frontend bauen + Python Backend)
echo     - Baut das Frontend und startet den Python-Server.
echo     - Die gesamte App wird direkt ueber das Backend serviert.
echo     - Laeuft komplett auf: http://localhost:8000
echo.
echo [3] Nur Python-Backend starten (Port 8000)
echo     - Startet nur den API- / Web-Server.
echo.
echo [4] Nur Vite-Frontend starten (Port 3000)
echo     - Startet nur den Entwicklungs-Server des Frontends.
echo.
echo [5] Beenden
echo.
echo =======================================================================
set /p choice="Auswahl eingeben (1-5): "

if "%choice%"=="1" goto DEV_MODE
if "%choice%"=="2" goto PROD_MODE
if "%choice%"=="3" goto BACKEND_ONLY
if "%choice%"=="4" goto FRONTEND_ONLY
if "%choice%"=="5" exit
goto MENU

:DEV_MODE
echo.
echo --- Ueberpruefe Voraussetzungen fuer Entwicklungsmodus ---
call :CHECK_PYTHON || goto MENU
call :CHECK_NPM || goto MENU

echo.
echo --- Starte Python Backend ---
start "Similapunktur Backend (Python)" cmd /c "python server.py"

echo.
echo --- Bereite Frontend vor ---
cd frontend
if not exist node_modules (
    echo Installiere NPM-Abhaengigkeiten - dies kann einen Moment dauern...
    call npm install
)
echo Starte Vite Frontend...
start "Similapunktur Frontend (Vite)" cmd /c "npm run dev"
cd ..

echo.
echo =======================================================================
echo ERFOLG: Beide Server wurden in separaten Fenstern gestartet!
echo - Frontend (mit Auto-Reload): http://localhost:3000
echo - Backend (API):             http://localhost:8000
echo =======================================================================
echo.
pause
goto MENU

:PROD_MODE
echo.
echo --- Ueberpruefe Voraussetzungen fuer Produktionsmodus ---
call :CHECK_PYTHON || goto MENU
call :CHECK_NPM || goto MENU

echo.
echo --- Baue das Frontend ---
cd frontend
if not exist node_modules (
    echo Installiere NPM-Abhaengigkeiten - dies kann einen Moment dauern...
    call npm install
)
echo Starte Build-Prozess...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo [FEHLER] Frontend-Build ist fehlgeschlagen!
    cd ..
    pause
    goto MENU
)
cd ..

echo.
echo --- Starte Python Backend ---
echo Das Backend serviert nun das gebaute Frontend und die APIs auf Port 8000.
echo Druecken Sie STRG+C im Server-Fenster, um es zu beenden.
echo.
python server.py
pause
goto MENU

:BACKEND_ONLY
echo.
echo --- Ueberpruefe Voraussetzungen ---
call :CHECK_PYTHON || goto MENU

echo.
echo --- Starte Python Backend ---
echo Druecken Sie STRG+C im Server-Fenster, um es zu beenden.
echo.
python server.py
pause
goto MENU

:FRONTEND_ONLY
echo.
echo --- Ueberpruefe Voraussetzungen ---
call :CHECK_NPM || goto MENU

echo.
echo --- Bereite Frontend vor ---
cd frontend
if not exist node_modules (
    echo Installiere NPM-Abhaengigkeiten - dies kann einen Moment dauern...
    call npm install
)
echo Starte Vite Frontend...
call npm run dev
cd ..
pause
goto MENU


:: --- HILFSFUNKTIONEN ---

:CHECK_PYTHON
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [FEHLER] Python wurde nicht im PATH gefunden!
    echo Bitte stellen Sie sicher, dass Python installiert und im System-PATH eingetragen ist.
    exit /b 1
)
exit /b 0

:CHECK_NPM
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [FEHLER] Node.js / npm wurde nicht im PATH gefunden!
    echo Bitte stellen Sie sicher, dass Node.js installiert und im System-PATH eingetragen ist.
    exit /b 1
)
exit /b 0
