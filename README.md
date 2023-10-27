# ⚽ BetBetter

The frontend UI of the `BetBetter` server. This web application aims to help you become a better bettor with data visualization and by making a better bet. A live demo can be previewed [here](https://bet-better-react.netlify.app/).

## 💡 Features

- Simplistic UI for easy browsing of matches info:
  - start date and time
  - home and away teams
  - current odds
- Match filtering by date picker
- Toggle to expand for detailed odds trend

## ⚙️ Tech Stack

This web application is built with the following tech stack:

- [<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="react" height="20">&nbsp;React](https://react.dev/)
- [<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="nextjs" height="20">&nbsp;Next.js](https://nextjs.org/)
- [<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="typescript" height="20">&nbsp;TypeScript](https://www.typescriptlang.org/)
- [<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" alt="html" height="20">&nbsp;HTML](https://html.spec.whatwg.org/)
- [<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" alt="css" height="20">&nbsp;CSS](https://www.w3.org/Style/CSS/Overview.en.html)
- [<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="tailwindcss" height="20">&nbsp;Tailwind CSS](https://tailwindcss.com/)
- [<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg" alt="d3js" height="20">&nbsp;D3.js](https://d3js.org/)

`Next.js` is used to create the `React` app structure with server-side rendering (SSR). `TypeScript` is the language used in the project to ensure type safety. `HTML` and `CSS` have been used to create the structure and the styling of the user interface (UI) with `Tailwind CSS` so that utility class is used to avoid the cascading mess due to specificity conflicts. And `D3.js` has been used to create data-driven documents to achieve data visualization with maximum flexibility. 


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

## 🌱 Contributors

This project is created by the [@betterbettor](https://github.com/betterbettor) team which includes the following members:

- [@charrrleee](https://github.com/charrrleee)
- [@krissolui](https://github.com/krissolui)
- [@louvrecly](https://github.com/louvrecly)
- [@wkip1220withweb](https://github.com/wkip1220withweb)

This web application has been voted as the best web application developed in the CanTek Web Design and Development class in Oct 2023. 
