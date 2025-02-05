# Libraries

Backend used libraries:

| groupId                  | artifactId                    | version |
| ------------------------ | ----------------------------- | ------- |
| org.springframework.boot | spring-boot-starter-parent    | 2.7.3   |
| org.springframework.boot | spring-boot-starter-web       | 2.7.3   |
| org.projectlombok        | lombok                        | 1.18.24 |
| org.springframework.boot | spring-boot-starter-test      | 2.7.3   |
| mysql                    | mysql-connector-java          | 8.0.22  |
| org.springframework.boot | spring-boot-starter-data-jpa  | 2.7.3   |
| com.google.cloud         | google-cloud-translate        | 2.3.5   |
| com.google.cloud         | spring-cloud-gcp-dependencies | 3.0.0   |
| org.jacoco               | jacoco-maven-plugin           | 0.8.4   |

Frontend used libraries:

| name                        | version  |
| --------------------------- | -------- |
| @emotion/react              | ^11.10.4 |
| @emotion/styled             | ^11.10.4 |
| @googlemaps/react-wrapper   | ^1.1.35  |
| @mui/icons-material         | ^5.10.3  |
| @mui/material               | ^5.10.5  |
| @react-google-maps/api      | ^2.13.1  |
| @reduxjs/toolkit            | ^1.8.5   |
| @testing-library/jest-dom   | ^5.16.5  |
| @testing-library/react      | ^13.3.0  |
| @testing-library/user-event | ^13.5.0  |
| framer-motion               | ^7.3.2   |
| jwt-decode                  | ^3.1.2   |
| react                       | ^18.2.0  |
| react-dom                   | ^18.2.0  |
| react-redux                 | ^8.0.4   |
| react-router-dom            | ^6.3.0   |
| react-scripts               | ^5.0.1   |
| redux-persist               | ^6.0.0   |
| web-vitals                  | ^2.1.4   |
|@react-google-maps/api       | ^2.13.1  |
|js-md5                       | ^0.7.3   |

# Working functionalities

## User authentication

-   The user needs to be able to log in
-   The user needs to be able to sign out
-   The user can reset their password
-   The user details needs to be authenticated

##  User interaction with the forums

-   User is able to delete their post
-   User is able to edit their post
-   User is able to create a post
-   User is able to interact with a post
    -   Users is able to comment
    -   User is able to view other user comments
    -   User is able to accept a post
    -   User is able to report a post
- User can translate a sentence 
- User can specify a location for their post

## Administrator Management

-   Admins can view user reports
-   Admins can modify/delete user Posts
-   Admins can modify/delete comments
-   Admins can ban/suspend users
-   Admins can view all data stored
-   Admins can view all users
-   Admins can view post reports


# Guide to run the application

Please follow the guide step by step

## 1. Database

Execute the SQL script 'tables.sql' under "sql" folder in MySQL.

## 2. Backend

1.   Copy the "application-db.yml" file in the "sql" folder into folder "backend/src/main/resources" (same level as file "application.yml")
2.   Replace the username and password with your own username and password of the MySQL
3.   open the backend in IDEA. Download the plugin 'lombok' on IDEA.
4.   If tanslation doesn't work, installing the Google Cloud SDK: https://cloud.google.com/sdk/  
5.   Run the application. The application is running on http://localhost:8080

## 3. Frontend

1.   Make sure Node.js is installed
2.   Install the package if missing:    `npm i js-md5`       `npm i google-maps`
4.   Open the "frontend" folder and run the command `npm start`
5.   Visit http://localhost:3000

## Notes

-   All default user have password 123

