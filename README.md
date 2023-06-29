# Interactive comments section preview

![app preview](<https://github.com/kidijkmans/interactive-comments-section/blob/master/Preview.png>)

# Getting started

### 1. Create database 

- Create a new database with PostgreSQL

### 2. Install npm packages

- In **client** folder: `npm i`
- In **server** folder: `npm i`

### 3. Start database

- Open the Postgres app and click **start**

*If not already done (or if changes were made to prisma schema):*
- Migrate database (create tables): in server folder `npx prisma migrate dev`
- Seed database (add data): in server folder `npx prisma db seed`

### 3. Create *.env* files in client and server folder and add the following with the correct information filled in

**Client** *.env*:
```
REACT_APP_SERVER_URL=
```

**Server** *.env*:
```
DATABASE_URL=
PORT=
CLIENT_URL=

# Change name to log in as a different person: maxblagun, ramsesmiron, or amyrobson
LOGGED_IN_USER="juliusomo" 
```

### 4. Start client and server

- Navigate to project root directory
- Run server with `npm run dev`

**Application will be running on <http://localhost:3000/>**
