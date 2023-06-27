# Getting started

### 1. Create *.env* files in **client** and server **folder** and fill in the following

Client *.env*:
```
REACT_APP_SERVER_URL=
```

Server *.env*:
```
DATABASE_URL=
PORT=
CLIENT_URL=
```

### 2. Start database

Open the Postgres app and click **start**

### 3. Start server

- Navigate to project directory
- Within project directory, navigate to **server** folder with `cd server`
- Start server with `npm run devStart`

### 4. Start client

- Navigate to project directory
- Within project directory, navigate to **client** folder with `cd client`
- Start client with `npm start`

**Application will be running on <http://localhost:3000/>**

### 5. Change logged-in user

- You can change the currently logged-in user by changing the username in server/api/user.js
