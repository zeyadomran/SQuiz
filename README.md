# Welcome to SQuiz's repository

SQuiz is an interactive quiz style game, were players compete to get the highest score. SQuiz has a focus on Information Security & Privacy, we followed the best practices for security and User privacy, we also provide players the option to hide their profile from the public leaderboard.
So what are you waiting for, go try and get the highest score!

## No Longer Deployed!
  
## Tech Stack

**Client:** React, Next.js, Chakra-UI, Apollo Client

**Server:** Express, MongoDb, Apollo Server, Typegoose, Type-GraphQL, Docker

  
## Deployment

To deploy the front end, just push to the the main branch, the front end is deployed on Vercel.

To deploy the server, the server is deploying in a DigitalOcean droplet.

```bash
  cd server
  sh deploy.sh
```

## Run Locally

- Server
    - First, create a `.env` file in the server directory and populate it with all the variables required, you can see wwhat is required from the `.env.example` file.
    - Second, `cd server` and `yarn install` then `yarn build` and finally `yarn start` to start the server.

- Client
    - First, create a `.env.local` file in the client directory and add the following to it: `NEXT_PUBLIC_API_URL="http://localhost:4000/graphql"`.
    - Second, `cd client` and `yarn install` then `yarn dev` to start the front end.

## Authors

- [@zeyadomran](https://www.github.com/zeyadomran)
- [@krang-8](https://www.github.com/krang-8)

  
