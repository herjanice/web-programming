# Web Programming 6 - (React + Axios + Express + Mongoose) Score Card DB

Goal: Building a full-stack web application called "Score Card DB" using React, Axios, Express, and Mongoose frameworks.

Basic Functions:

1. "Clear" button sends a DELETE request to clear the database and displays "Database cleared" on the message console.
2. "Add" button adds data to the database. If the {Name, Subject} paired value already exists in the DB, it replaces the existing data and displays "Updating (Name, Subject, Score)" on the message console. Otherwise, it adds a new record and displays "Adding (Name, Subject, Score)".
3. "Query" button searches the database for data based on the input query string and displays the search results on the message console. If the query string is empty, nothing happens. If no data is found, it displays "QueryType (QueryString) not found!" on the message console.
4. message console displays all messages and data. When the "Clear" button is pressed, it clears all messages and displays "Database cleared" on the console. Any error messages during the query should also be displayed here.
