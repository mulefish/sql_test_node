# server
node server.js

# NOTES
http://localhost:3000/notes.html

# DB
psql -d postgres -U me 
\c reports 

# STEP1 Populate DB ( only 1 time needed ) 
node populate_db.js

# table
CREATE TABLE orders (
ID serial NOT NULL PRIMARY KEY,
info json NOT NULL
);
