[![CodeFactor](https://www.codefactor.io/repository/github/brendenrdowd/mealplanner-api/badge)](https://www.codefactor.io/repository/github/brendenrdowd/mealplanner-api)

# Nutrionist 
Nutrionist allows users to find and save recipes to their calendar. Recipes can be searched using a keyword, and by cuisine, ingredients to avoid, meal type, and diets and allergies. 

_________

A live version can be found at [mealplan.now.sh](https://mealplan.now.sh/) 

## Nutrionist Server
Save users and recipes in SQL DB for [Nutrionist]

## Technologies
The Nutrionist API was built using Node (using express, JWT, mocha, supertest, and knex ) and PostgreSQL.

### Upcoming fixes
 - preventing duplicate recipes from being saved on the same day by the same user. 

 ### Upcoming features
  - aggregated ingredients list for the next 7 days into a single groceries list
  - adding a favorite table to the DB, allowing users to favorite recipes and get recomendations
  - update paths for users to change their diet/interolances and passwords. 

## API

### Prerequisites
Nutrionist requires Node.js v6.0+ to run.

### Installing
Install the dependencies and devDependencies and start the server

``` npm install ```

### Testing 
to run front-end or back-end tests, run ``` npm test ```
### Schema
#### Users
``` {
  name:{
    type:String,
    required:true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  diet: String,,
  interolances: String
} 
```
#### Recipes
``` 
{
  date:{
    type:String,
    required:true
  },
  recipe:{
    type:String,
    required:true
  },
  users: [{ 
    type: userId, 
    ref: User 
  }]
} 
```

## Api Overview

``` 
/api
.
├── /auth
│   └── POST
│       └── /login
├── /users
│   └── GET /:id
│   └── POST
│       └── /
├── /recipes
│   └── GET
│       └── /:date
│   └── DELETE /:id
│   └── POST
│       └── / ```


