# ⚽ Bet Better Web App

The frontend UI of the `BetBetter` server. A live demo can be previewed [here](https://main--bet-better-react.netlify.app/).

## ✨ Features

- Simplistic UI for easy browsing of matches info:
  - start date and time
  - home and away teams
  - current odds
- Match filtering by date picker
- Toggle to expand for detailed odds trend

## 💻 Local Development

The following environment variables need to be set up in the `.env.local` file in the root directory in order to start the local development.

- `NEXT_PUBLIC_BET_BETTER_API`

Install the necessary dependencies by running the following command:

```
yarn install
```

Start the local development server by running the following command:

```
yarn dev
```

The web app in dev mode will then be available on [http://localhost:3000](http://localhost:3000) by default.
