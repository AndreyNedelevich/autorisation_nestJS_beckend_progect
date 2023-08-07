
DATA FOR  USER WITH ADMIN ROLE

login admin - admin@gmail.com
password admin - admin2023


!!!!!!!!
If you want to download my project to your computer.
After running Docker (docker compose up --build). You need to create with a Postman one Role of USER.
This endpoint  for create new Role by USER.

POST
http://localhost/api/roles

{
"value":"USER",
"description":"USER"
}

After this action, each new user will be registered with the default USER role.