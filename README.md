# WIW Back-End

The SVC Application gives administrative users the tools they need to analyze, visualize, and manage volunteers, cases, and reports. Along with providing SVC advocates an organized data input process for creating and updating cases.

## Built With

- SQL
- Node.js
- Express.js

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- [Node.js](https://nodejs.org/en/)

### Installing

Steps to get the development environment running.

Below are the needed tables for the application that need to be added to SQL, this application is originally written for plpgSQL

Your database should be called WIW
```
CREATE TABLE "users" ("employee_id" serial primary key,
 			   		  "name" varchar(80),
 					  "role" varchar(80) NOT NULL,
 					  "email" varchar(200) NOT NULL,
 					  "phone" varchar(20),
 					  "created_at" date default Current_timestamp,
 					  "updated_at" date);
 					  
 					  
 					
CREATE TABLE "shift" ( "id" serial primary key,
					   "manager_id" int,
					   "employee_id" int,
					   "break" double precision,
					   "start_time" timestamp NOT NULL,
					   "end_time" timestamp NOT NULL,
					   "created_at" timestamp default current_timestamp,
					   "updated_at" timestamp);


					   INSERT INTO "users" VALUES (1 , 'John' , 'Employee' , 'sarah@gmail.com' , 6127839856 , '2017-12-08') , (2, 'Jake' , 'Employee' , 'sarah@gmail.com', 7631254958 , '2017-12-08'), (3, 'stan', 'Manager' , 'stan@gmail.com', 6517349874, '2017-12-08'), (4 , 'Kara' , 'Manager' , 'kara@gmail.com', 7630762396 , '2017-12-08');


```

## Authors

* Alex Bliss

