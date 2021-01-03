# Resumable file uploads using REST API and resumable.js
The project focuses on the development of an API mechanism through which large files could be uploaded on a node.js server with the user having the option to pause the upload at any point in time. The user then chooses to terminate the upload or resume in different cases.
# Major-Features
The project uses resumable.js, a javascript framework that could help in the upload of large files on the server. resumable break file into small chunks of predefined size. Now, these chunks are independently uploaded on the server and on the complete transmission of file they are combined to form the original file on basis of unique ID generated for each chunk.

This could also help in cases when network problems occur in the middle of a transmission, the already assigned chunks would sustain on the server so the user need not upload the whole file again, only the remaining chunks are uploaded now. this would save a whole lot of time and resources where transmission of huge files is taking place.

# Usage
1. software requirements: 
````
node.js
````
2. install node.js in your machine from their website https://nodejs.org/en/

3. next you need to install the dependencies of the project. Single command to install dependencies
````
npm install
````
4. Now run the server of the node application

````
node app.js
````
this should start the server on port 3000 of your machine
5. go to web browser and go to address
````
localhost:3000
````
# Docker

The app can easily be packed into a docker container. The docker file supplied contains all commands for sucessful docker image creation
<br/>
1. Install docker on your machine using instructions on the website : https://docs.docker.com/install/
2. to build a docker file, inside the working directory run command 
````
docker build -t <any name for docker image> .
````
this shall build a docker image using the Dockerfile supplied.<br>
3. To verify image successful creation run command

````
docker images
````
this should display the name of image you created during build

4. Now to build a container and run application from docker run
````
docker run -it -p 3000:3000 <name of docker image>
````
this should build a container and run the docker image inside it. now try to open localhost:3000. The application should be server here as uswal.

# Thank-You
