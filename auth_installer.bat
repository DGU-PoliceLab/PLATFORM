@echo off

set /p answer="Do you want to install mkcert? (Y/n): "

if /i "%answer%"=="Y" (
    echo Installing mkcert...
    choco install mkcert -y
    echo Program installed successfully.
) else if /i "%answer%"=="n" (
    echo Pass mkcert install process.
) else (
    echo Invalid input. Please enter 'Y' or 'n'.
    exit /b 1
)

echo Creating new local CA...
mkcert -install

if %errorlevel% equ 0 (
    echo Local CA creating successful.
) else (
    echo Local CA creating failed.
    exit /b 1
)

echo Creating new certificate valid...
mkcert -key-file key.pem -cert-file cert.pem localhost 127.0.0.1 ::1

if %errorlevel% equ 0 (
    echo Certificate valid creating successful.
) else (
    echo Certificate valid creating failed.
    exit /b 1
)

echo Done.
exit /b 0