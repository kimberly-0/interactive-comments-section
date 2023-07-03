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
- Migrate database (create tables): in server folder `npx prisma migrate dev`
- Seed database (add data): in server folder `npx prisma db seed`

### 3. Update environment variables

- Complete information in '*.env-sample*' files in the **client** and **server** folders
- Rename files to '*.env*'

### 4. Start client and server

- Navigate to project root directory
- Run server with `npm run dev`

**Application will be running on <http://localhost:3000/>**
