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

## Sample query
```
curl -s --request POST \
    --header 'content-type: application/json' \
    --url http://localhost:4000/ \
    --data '{"query":"query ExampleQuery {\n  users {\n    id\n    lastName\n  }\n}"}' | jq 
```