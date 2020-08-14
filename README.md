# server
node server.js

# NOTES
http://localhost:3000/notes.html

# DB
psql -d postgres -U me 
\c reports 

# STEP1 Populate DB ( only 1 time needed ) 
node populate_db.js

# tables 
CREATE TABLE test_table (
ID serial NOT NULL PRIMARY KEY,
info json NOT NULL
);

CREATE TABLE test_table_100 (
ID serial NOT NULL PRIMARY KEY,
info json NOT NULL
);


CREATE TABLE test_table_10 (
ID serial NOT NULL PRIMARY KEY,
pdoc json NOT NULL,
inserttime bigint NULL
);

