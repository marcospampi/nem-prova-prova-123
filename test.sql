DROP DATABASE IF EXISTS test;
CREATE DATABASE test;
CREATE TABLE test.dictionary (
	`key` VARCHAR(255) PRIMARY KEY,
	`type` ENUM('json','text') NOT NULL,
	`value` TEXT,
	INDEX(`key`,`type`)
);