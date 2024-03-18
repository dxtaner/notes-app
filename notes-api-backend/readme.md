
Note Taking App
===============

This simple note-taking application allows users to save and manage their notes. Users can register to the application and then create, edit, and delete their notes. Additionally, users can utilize authentication functionalities for login and signup processes.

Features
--------

*   User registration and login.
*   Creation, editing, and deletion of notes by users.
*   Authentication for secure storage of notes.

Installation
------------

1.  Clone the repository:

`git clone https://github.com/dxtaner/notes-app.git`

2.  Install necessary dependencies:

`npm install`

3.  Configure environment variables. Create a \`.env\` file and define the following variables:

DB\_USER=username
DB\_PASSWORD=password
DB\_NAME=database\_name
PORT=3001
    

4.  Update the MongoDB connection URL:

``const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.guofsiq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;``

5.  Start the application:

`npm start`

6.  Visit \`http://localhost:3001\` in your browser and start using the application.

Usage
-----

*   Use \`/auth/signup\` route to register.
*   Use \`/auth/login\` route to login.
*   Use \`/notes\` route to manage notes. This route is accessible only to authenticated users.

Technologies
------------

*   Node.js
*   Express.js
*   MongoDB
*   Mongoose
*   JWT (JSON Web Token)
*   body-parser
*   cors

Contributing
------------

1.  Fork this repository.
2.  Create a new feature branch (\`git checkout -b new-feature\`).
3.  Make your desired changes and commit them (\`git commit -am 'New feature: description'\`).
4.  Push your branch to the main repository (\`git push origin new-feature\`).
5.  Create a Pull Request.

License
-------

This project is licensed under the MIT License. See the \`LICENSE\` file for more information.
