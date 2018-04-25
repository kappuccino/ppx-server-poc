# PPX server (poc)

## installer (requires nodejs >= 8.6)
`git clone git@github.com:kappuccino/ppx-server-poc.git ppx-server`
`cd ppx-server`  
`npm i`  


## start
`node index.js`  
start a server on http://localhost:7777

## API

GET `/files`
return an array of url

POST `/upload`  
upload a file to the "storage folder", return an object with the URL of the file

