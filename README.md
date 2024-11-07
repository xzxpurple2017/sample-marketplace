# sample-marketplace

## Starting the server
```
npm install
npx prisma generate
npm run server
```

### Apollo GraphQL web interface

Navigate to http://localhost:4000/graphql in your browser

## Database migrations

1. Make changes to prisma/schema.prisma

2. Run the migration on dev database
```
npx prisma migrate dev --name name-of-migration
```

## Adding user
```
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation Mutation($email: String!, $cognitoId: String!) { addUser(email: $email, cognitoId: $cognitoId) { id publicId email cognitoId firstName lastName phone createdAt updatedAt } }",
    "variables": {
      "email": "test@example.com",
      "cognitoId": "78660e21-397c-44f5-a753-f2e8d52275e2"
    }
  }'
```

## Get user info
```
curl -s --request POST \
    --header 'content-type: application/json' \
    --url http://localhost:4000/graphql \
    --data '{"query":"query ExampleQuery {\n  users {\n    publicId\n    email\n  }\n}"}' | jq 
```

### Query via JWT token
```
curl --request POST \
    --header 'content-type: application/json' \
    --header 'Authorization: Bearer eyJraWQiOiJpdzdDUDBcL0dTbmtVdGxiZHVVWjRTUVRwWFJTZlBKYzZGUnRwajYyVFVhYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI2NDE4YTQwOC02MGMxLTcwMWMtM2YxNC0yZTNlY2I0YzZkNjciLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9vaGl2cklzZDIiLCJjbGllbnRfaWQiOiIzZzMxNmc2dGFoNDZzazQ0dTg4NGdlb2Y5MCIsIm9yaWdpbl9qdGkiOiI1ZGIwMGRkNC01ZWRkLTQ4OGItOWFiYy03ZDNiYzY4MzE0ZmMiLCJldmVudF9pZCI6IjAyODZiNWUyLTIzYmUtNDAzZC1hY2VjLTJkM2NhYzIxNzgwYSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MzA5NDI4OTQsImV4cCI6MTczMTAyOTI5NCwiaWF0IjoxNzMwOTQyODk0LCJqdGkiOiJhNDI2ZTYwMS0wOWNiLTQ1MzYtOGUwNy1kODIyZDkyNjA2MDEiLCJ1c2VybmFtZSI6IjY0MThhNDA4LTYwYzEtNzAxYy0zZjE0LTJlM2VjYjRjNmQ2NyJ9.CcmTwkjf2KhHnx7hdT6rVvYr9F2qFT7BzdOpRp9B3uNJhoUBjTSjzWfAT-lrvVyaQSgeTMeX_gHEHtJF4l8AvF8oX15cyS2Gio65vf5S7vnYQ0swNpcWwOCWc7krQqg-D5BN8pbvyhK9gCD66mfqFRlAILXZPoTQ_PAK1-KCsYADavfH5IXtRGgNVzG8ze6Kd8Z1jO-E0Tl6Yh-Bo8Bx8mM8fDlUxC2IHsdlMQ6c5QF3cdmCt2vwJ6ExUd2lnmRArWDaFhye5Cdlin4F3LbspZNg3Ma-ibxVrx6BTNRZMPIL8BrAPxUImLbdAVUvD8d5jr444_63u-Xjkrpo7llgLA' \
    --url http://localhost:4000/graphql \
    --data '{"query":"query Users {\n  userByToken {\n    cognitoId\n    email\n    publicId\n    firstName\n  }\n}"}'
```

### Query via public ID
```
curl --request POST \
    --header 'content-type: application/json' \
    --url http://localhost:4000/graphql \
    --data '{"query":"query ExampleQuery($publicId: ID!) {\n  user(publicId: $publicId) {\n    publicId, email, phone, firstName, lastName\n  }\n}","variables":{"publicId":"aa97f402-4195-4fed-bc03-d2c05a2ac578"}}'
```