# Om

## Description
A full stack Node.js and React shopping cart app

## Live:
om.benimberman.com

## Technologies used:
![HTML5](https://cdn.jsdelivr.net/gh/devicons/devicon@master/devicon.min.css) 
![CSS3](https://cdn.jsdelivr.net/gh/devicons/devicon@master/devicon.min.css) 
<i class="devicon-javascript-plain"></i>
![JS](https://cdn.jsdelivr.net/gh/devicons/devicon@master/devicon.min.css) 
![React](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/200px-React-icon.svg.png) 
![PostgreSQL](https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/200px-Postgresql_elephant.svg.png) 
![NPM](https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/200px-Npm-logo.svg.png) 
![Node.js](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/200px-Node.js_logo.svg.png) 
![Express.js](https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png) 
![Bootstrap](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/200px-Bootstrap_logo.svg.png)

## Main Features:
* A scrollable gallery of items
* A close up view of items
* Adding items to a cart
* Viewing the cart items and summary
* Checkout view

## Demo:
https://raw.githubusercontent.com/bimberman/om/master/live-demo.gif

## System requirements
* 

## Instructions:
1. Navigate to the desired parent folder using a CLI
```
cd YOUR-DESIRED-PARENT-FOLDER-PATH
```
2. Download repo
```
git clone https://github.com/bimberman/om.git
```
3. Navigate to the folder
```
cd om
```
4. Make a copy of the .env.example file, name the new file .env, and edit the file
    1. Edit the .env file as appropriate for your setup (for exmaple if port 3000 is used by another program, then use a different port) 
    2. Change the user to dev and password to lfz
```
PORT=3001
DEV_SERVER_PORT=3000
DATABASE_URL=postgres://user:pass@localhost/om
SESSION_SECRET=secret
SESSION_EXPIRY=28800000
```
6. Install all dependencies using NPM
```
npm install
```
7. Rebuild the project 
```
npm run build
```
8. Verify the postgresql service is running
    1. Please note that if the postgresql service is not running, then change **status** with **start** in the following command
```
sudo service postgresql status
```
9. Start the server
```
npm run dev
```
10. Open a web browser at localhost port 3000
```
http://localhost:3000/
```
