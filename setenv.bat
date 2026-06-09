@echo off
set NVM_HOME=C:\Users\awilkin3\Program Files\nvm-noinstall
set NVM_SYMLINK=%~dp0\nvm\nodejs
set PATH=%NVM_HOME%;%NVM_SYMLINK%;%PATH%
cmd