## Models 
1. User: name , email , password
2. Collection: cname , description ,isFavorite ,  createdby( userId ) , createdAt 
3. Item: title , description , type(file/url)  , file/url , collctionId , createdAt 

- uploaded item can be either a url or a file 


## Routes
Every route is started from api and then get distributed into three parts  : user , collection and item.

- each route except the signup and login authorize user first 

1. `/api/user` -
   a. `/signup` : this validates user input , check if the email already exist and handle signup logic 
   b. `/login` : login user 
   c. `/me` : authorize user and give their information
   d. `/logout `:  authorize and logout

2. `/api/collection/` -  
   a. `/ ` : get request return all the collections
   b. `/ ` : post request let you create collection
   c. `/:collectionId` : get a specific collection
   d. `/:collectionId` : update a specific collection
   e. `/:collectionId` : delete a specific collection
   f. `/favorite/:id`: toggle favorite 

3. `api/item` - 
   a. `/ ` : get all the items
   b. `/` : post the item
   c. `/:itemId/` : update the item
   d. `/:itemId` : get one item by its id
   e. `/:itemId` : delete item



## Middlewares 
1. signupValidator : validates user credentials and also checks if the user already exist
2. isAuth : authorize user and set userId and their email in the req 


-- Input Validation is done using zod library
-- Authorization is done using jwt 
-- password hashing through bcrypt

/*
#git add .
git commit -m "Your message describing the changes"
git push
*/

/** item model
authorization logic 
index.js
bcrypt 
authccontroller 
mongodddb aggreegation pipeelinee
*/
