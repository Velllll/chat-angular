# chat-angular

## Discription
Chat. Registration is made with an access token. All passwords are hashed.

## How to start app
You need: 
1) Setup mysql database
    a) Create new database in mysql. All scripts you can find in file "db_chat" path = ..server/db/db_chat.sql
    b) Create .env.local in server folder and specify:
        PORT = 5000
        DB_USER = "username"
        DB_PASSWORD = "password"
        DB_NAME = "db name"
1) Open client folder and run script: 
npm start
2) Open server folder and run script:
npm run dev
3) Open browser and go to "http://localhost:4200/"

## Tech Stack
Frontend: Angular
Backend: express, express-ws, jsonwebtoken, bcryptjs
Database: MySql