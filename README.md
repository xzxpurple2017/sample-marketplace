# sample-marketplace

## Starting the server
```
npm install
npm start
```

### Apollo GraphQL web interface

Navigate to http://localhost:4000 in your browser

## Sample query
```
curl -s --request POST \
    --header 'content-type: application/json' \
    --url http://localhost:4000/ \
    --data '{"query":"query ExampleQuery {\n  users {\n    id\n    lastName\n  }\n}"}' | jq 
```