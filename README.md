# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command
4. You can also use `yarn`


## Make sure to setup MySQL for the GraphQL server

1. Install MySQL on your computer (`XAMPP`)
2. Create database called `recipes-puzzle`
3. [Add a user] with the username `root` and no password. (You can change these values, are in the [ormconfig.json])
4. Apollo-server must be at `http://localhost:3000/graphql`

## Don't forget! [HTTP HEADERS]

1. {
  "authorization": "bearer accessToken"
}
2. AccessToken must be like: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksInVzZXJFbWFpbCI6IklzYTFAZ21haWwuY29tIiwidXNlck5hbWUiOiJJc2EgMSIsImlhdCI6MTYwMTY1ODIyNSwiZXhwIjoxNjAyMjYzMDI1fQ.BI6MnHVm4XSu9eMibDKoQONYoIixMtBK0kCR7qES--4

## API published in heroku
1. URL: `https://fcprecipe.herokuapp.com/`

