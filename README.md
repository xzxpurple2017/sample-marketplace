# sample-marketplace

## Starting the server
```
npm install
npx prisma generate
npm start
```

### Apollo GraphQL web interface

Navigate to http://localhost:4000 in your browser

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
    --url http://localhost:4000/ \
    --data '{"query":"query ExampleQuery {\n  users {\n    publicId\n    email\n  }\n}"}' | jq 
```

## Query via unique ID
```
curl --request POST \
    --header 'content-type: application/json' \
    --url http://localhost:4000/ \
    --data '{"query":"query ExampleQuery($publicId: ID!) {\n  user(publicId: $publicId) {\n    publicId, email, phone, firstName, lastName\n  }\n}","variables":{"publicId":"aa97f402-4195-4fed-bc03-d2c05a2ac578"}}'
```