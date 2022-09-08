# Petrichor Coffee Professionals

## Summary

Petrichor coffee is a fictional eCommerce website providing a fully featured e-store experience. Bringing everything from an encrypted database using JSON Web Tokens for authentication, to a central products database offering persistant carts, and user profiles with fully editable data.

**[View the live deployment on Render](https://petrichor-coffee.onrender.com/)**

**[Check out the API Documentation](https://petrichor-coffee.onrender.com/api-docs/)**

## Quick Start Guide

1. To get started first make sure you have Node V1.17^ and PostgreSQL V14^ installed.
2. Clone repository to your local disk
3. Create a postgres database and run all of the 'CREATE TABLE' commands in /database/database.sql **_in order_**
4. In the root directory, add a .ENV file with the same formatting as .ENV_EXAMPLE. input information for your local database
5. Open the root directory in a command line console and run the commands 'npm install' then 'npm run local'
6. Open the /client directory in another console, run the commands 'npm install' then 'npm start'
7. If the app doesn't open in your browser automatically, go to [localhost](https://localhost:5000/) at port 5000 (unless otherwise specified in .ENV)

## Front-End Stack

    - TypeScript
    - React
    - React Router
    - Browser Session Storage

## Back-End Stack

    - Javascript
    - PostgreSQL
    - Express
    - Node
    - Bcrypt
    - JSON Web Tokens
    - Swagger Open API
