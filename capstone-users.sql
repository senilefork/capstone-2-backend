\echo 'Delete and recreate capstone-users-db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE capstone-users;
CREATE DATABASE capstone-users;
\connect capstone-users

\i capstone-users-schema.sql
\i capstone-users-seed.sql

\echo 'Delete and recreate capstone_users_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE capstone_users_test;
CREATE DATABASE capstone_users_test;
\connect capstone_users_test

\i capstone-users-schema.sql
