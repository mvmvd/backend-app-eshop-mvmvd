# Getting Started with our simple eshop backend

This project was bootstrapped with [Prisma](https://www.prisma.io/docs/getting-started).

## Project clone and Data base configuration
1. Clone the backend
2. Access to the backend folder and run install script
    ```
    cd backend
    npm install
    ```
3. Create the data base on the MySQL server under a name you want
4. Edit in .env the data base url
    ```
    DATABASE_URL = "mysql://<user>:<password>@<host>:<port>/<database-name>"
    ```
5. Execute the migration with the following command
    ```
    npx prisma generate
    npx prisma migrate dev
    ``` 

## Run the backend
In the project directory, you can execute the command:
```
npm start
```
to run the backend in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in your browser.

## Use examples on product
According to the file  [request.rest](request.rest), one can test the API routes for the model product like:
- Creating a product
    ```
    POST http://localhost:8000/produits

    Content-Type: application/json
    {
        "id": 1,
        "nom": "Appareil photo", 
        "categorie": "Electro", 
        "prix": 3500, 
        "photo": "product.jpg",
        "description": "L'appareil photo Canon..."
    }
    ```
- Getting all products
    ```
    GET http://localhost:8000/produits
    ```
- Finding a product
    ```
    GET http://localhost:8000/produits
    ```
- Updating a product
    ```
    PUT http://localhost:8000/produits/1
    Content-Type: application/json

    {
        "nom": "Appareil photo Canon", 
        "categorie": "Electronique", 
        "prix": 35000, 
        "photo": "product-1.jpg"
    }
    ```
- Deleting a product
    ```
    DELETE  http://localhost:8000/produits/1
    ```