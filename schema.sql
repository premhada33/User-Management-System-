-- this file is used to create database or table from the project 
CREATE DATABASE IF NOT EXISTS delta_app;
use Delta_app;
CREATE TABLE user
    (id varchar(50) PRIMARY KEY ,
    username varchar(50) UNIQUE,
    email varchar(50) UNIQUE NOT Null,
    password varchar(50) NOT Null
    );

-- then you can run this file in the sql shell cmd-> source schema.sql 
-- then database and table will be create in the database