@echo off
setlocal ENABLEDELAYEDEXPANSION
title Wedding Project - Local Runner
cd /d %~dp0
where node >nul 2>nul
if %errorlevel% neq 0 (
  echo [ERROR] Node.js no esta instalado o no esta en PATH.
  echo Descarga Node LTS desde: https://nodejs.org/
  pause
  exit /b 1
)
echo ===============================
echo  Wedding - Arranque en local
echo  Backend: http://localhost:3000/api/health
echo  Frontend: http://localhost:4200
echo ===============================
start "BACKEND - NestJS" cmd /k "cd wedding-backend && npm install && npm run start:dev"
start "FRONTEND - Angular" cmd /k "cd wedding-frontend && npm install && npm start"
exit /b 0
