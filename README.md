This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

```bash
1. Create .env.local
2. Add env variables needed (check firebase.ts in the root directory for firebase config)
3. Create TMDB account, add api key to .env.local
```

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To test the project:
```
yarn test
```

## Project Description

A somewhat clone of "Netflix", project idea found in [frontendmentor.io](https://www.frontendmentor.io/challenges/entertainment-web-app-J-UhgAW1X)

It allows user to register and login to view their favorite movies and tv shows based on TMDB's list.
Bookmark all movies and tv shows, search for movies and show in all pages.
Has a simple dashboard that show bookmarked movies and tv shows.

Layout is optimized to be viewed on all screen sizes.

#### Created using:
1. NextJS
2. TailwindCSS
3. React Redux Toolkit with redux-persist
4. Firebase (Authentication, Firestore)
5. Jest, React Testing Library and Cypress for testing

