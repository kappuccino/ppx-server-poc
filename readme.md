# PPX server (poc)

## installer
git clone
npm i (node v9 ou +)

## start
`node index.js`  
start a server on http://localhost:7777

## API

GET `/listing`  
return an array of url

POST `/upload`  
upload a file to the "storage folder", return an object with the URL of the file

