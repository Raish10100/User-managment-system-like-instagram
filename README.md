# Created User Management System like Instagram 

 In this README file there is this below information points :

   1. Project Description
   2. Installation Instructions
        - by documentation
        - by video
   3. Contact Information

---
[Preview video of project](https://youtu.be/fJGlzRG5mlc?si=mboe1IVP-K8yKVCo)

---
 _Let's start_



## 1. Project Description

**Objective:**  
    The objective of this `User Management System` project is to create full-stack user info and login system that resembles the functionality of Instagram.The system is builted in HTML,CSS and Javascripts for the front-end,while the back-end is builded on Express.js and MongoDB.

---

**Stack Used:**
 1. Front-End Development:
    - Design a visually appealing user interface using HTML and CSS.
    - Created an intuitive user registration form that captures essential details like username, email, and passw
    & bio & Name
    - Developed a login form that authenticates users and verifies their credentials.

 2. Back-End Development:
    - Used Express.js to handle HTTP requests and responses.
    - Set uped a MongoDB database to store user information securely.
    - Implemented user registration functionality by validating and saving user data to the database.
    -  Developed a login mechanism that verifies user credentials against the stored data.
    - Generated JWT token and Store it into cache
    - Used many other `npm packages`.
    
3. Security:
    - Hash and salt user passwords before storing them in the database to enhance security.
    - Protected sensitive routes and ensure that only authenticated users can access them.

---
you can see [UI design images](https://github.com/Raish10100/User-managment-system-like-instagram/tree/eb4a4b71b69f2f65c37bdfbb3960c4522ca4134d/UI_design_Images) also 

---
---
## 2. Installation Instructions

>here in project installation you will get step by step full guide so you have to don't worry about it.Installation guide is in two different ways.
1. Documentation
2. by video
  
---
> Required Technologyes : any IDE,Gitbash,nodejs,mongodb  . it must be installed in your machine

1. **Documentation** :
   - first of all just clone this project in your local machine
   - open the terminal go in backend dir and write this command `npm init -y`
   -  after typing upper command the `package.json` will genrate
   - open the `package.json` file and add this scripts
    ```javascripts
     "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon -r dotenv/config --experimental-json-modules ./index.js",
    "start": "nodemon ./index.js" },
    ```
    - write in this file `"type: "module"`   after scripts 
    - now type this command in your terminal (it will take some time to install)
      ```
      npm install express cookie-parser bcrypt mongoose jsonwebtoken cors email-validator dotenv nodemon --save  
      ```
    - after exicuting this command the `package-lock.json` file will create and your `package.json` file look like this [click](https://github.com/Raish10100/User-managment-system-like-instagram/blob/7c0621bd63c0a127cbbf722595a9afe07591f498/Installation%20guide%20images/packageJson%20file.png)
    - now create `.env` file in backend folder and past this 
    ```
    MONGODB_URL= here past your database link
    PORT=50001
    CLIENT_URL= http://localhost:5500 
    SECRET=your secret key
    ```
    - go in terminal and type `npm run dev`, after typeing this your server will start.
    - Now your backend server is started . After that you start your html file in live server . `Mind it that your html file must be start in localhost:5500` port if it is not starting at that port you can simple go in live server extension setting and change it . It is mendatory because in fort-end javascript i had mention this port . 
    - If you have to not do the change in your live server extension then go on each html file remove this base path `http://localhost:5500` and add your live server path.
    - That's it now you can signUp in this `User Management System` app and use many other features  

    > If any error is comming then simply copy the error message and paste on [chatgpt chat section](https://chat.openai.com/)
    
    >if you have not understand documentation then don't worry watch the below video. You will get better idea from there.
---

2. **Installation guide through Video format** :

- link of video : [click here](https://youtu.be/cgjnFlXbHO8)

---

3. **Contact Us**

    - Contact links : [click here](https://linktr.ee/Raish101001)