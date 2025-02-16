# chat_application

### Name
Sudhir Bhapkar

### Time Required to complete the assignment
It took almost 2 and 30 mins to complete

### Steps taken for project completion

1. Created a Api framework using express js and Typescript and tried to initialize with basic Hello world endpoint
2. Setup the MySql DB ad MySQL workbench and created `chat_application` database. Aadded `users` and `messages` tables.
3. Once it's done then started on the implementation of endpoints and installed require packages as I go, 
    mysql2: for connecting to mysql database
    sequelize: This library for performing CRUD operations on DB
    bcryptjs: This one used for encrypting password before storing into DB and decrypting to validating during login
    jsonwebtoken: This is used to to create JWT token for secure communinication between client and api.
4. Implemented `register` endpoint and created my user account
5. Created `login` endpoint to allow user to login by verifying their email and password and generating token and sending back in  reposne.
6. Created `list_all_users` endpoint by added a middle layer that will be used in every other api request to authenticate request base on token it sent which is generated whilee login
7. Created `send_message` and `view_messages` endpoints


### Steps to run the application
1. CD to chat_application/chat_api folder
2. Install add required packages using `yarn` command
3. Create new User in MySql databse and grant privileges to be able to connect and perform operation on DB
    ```
    CREATE USER ‘giftogram'@‘localhost' IDENTIFIED BY 'StrongPassword!';
    GRANT ALL PRIVILEGES ON chat_application.* TO 'giftogram'@'localhost';
    ```
4. databaase name: chat_application, user: giftogram, host: localhost
4. Once all set up. We can run the application using command `yarn local:run` created to always start with fresh code.
5. This will start the application on `http://localhost:3000`
6. We can call below endpoints

### Endpoints

#### Register
    `http://localhost:3000/auth/register` POST method with body like 
    ```
        {
            "first_name": "Sudhir",
            "last_name": "Bhapkar",
            "email": "sudhir.bhapkar@giftogram.com",
            "password": "Test123$"
        }
    ```

#### Login
    `http://localhost:3000/auth/login` POST method with body like 
    ```
        {
            "email": "sudhir.bhapkar@giftogram.com",
            "password": "Test123$"
        }
    ```

#### List all Users except requested user
    `http://localhost:3000/users/list_all_users` GET method with `Authorization` Header paraameter
    `Authorization = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczOTY2MjAxMywiZXhwIjoxNzM5Nj`

#### Send Message
    `http://localhost:3000/messages/send_message` POST method with `Authorization` Header paraameter
    `Authorization = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczOTY2MjAxMywiZXhwIjoxNzM5Nj`

    with body like
    ```
    {
        "sender_user_id": 1,
        "receiver_user_id": 2,
        "message": "Hello Preston"
    }
    ```

#### View Messages
`http://localhost:3000/messages/view_messages` POST method with `Authorization` Header paraameter
`Authorization = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczOTY2MjAxMywiZXhwIjoxNzM5Nj`

    with body like
    ```
    {
        "user_id_a": 1,
        "user_id_b": 2
    }
    ```

### Database table schema

#### users table
```
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

```

#### messages table

```
CREATE TABLE `messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `sender_user_id` int NOT NULL,
  `receiver_user_id` int NOT NULL,
  `message` text NOT NULL,
  `epoch` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

```





