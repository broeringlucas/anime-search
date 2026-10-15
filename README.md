# Anime Search Application

Anime Search is a React application developed as a learning project to enhance React skills. The application fetches anime data from an external API and displays relevant information, such as the anime's name, director, poster image, and more. Data comes from the [AniList GraphQL API](https://docs.anilist.co/).

## Project Structure 

```
anime-search/
├── public/                # Static files             
├── src/
│   ├── components/        # Reusable components
│   ├── hooks/             # Custom hooks
│   ├── styles/            # CSS Styles
│   ├── types/             # TypeScript types for API data
│   ├── utils/             # API client (api.ts) and formatting helpers
│   ├── App.tsx            # Main application file
│   ├── main.tsx           # Entry point
├── index.html             # Vite HTML entry
├── vite.config.ts         # Vite config
├── tsconfig.json          # TypeScript config
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Dependency lockfile
├── README.md              # Project documentation
```

## Features

- Fetch and display anime details
- Interactive UI built with React
- API integration using [AniList GraphQL API](https://docs.anilist.co/)

## Technologies Used

- React
- TypeScript
- Vite
- Fetch API + GraphQL for API requests
- CSS and Bootstrap for styling

## How to run 

1. Clone the repository: git clone [https://github.com/broeringlucas/anime-search.git](https://github.com/broeringlucas/anime-search.git)
2. Navigate to the project directory: cd anime-search
3. Install dependencies: npm install
4. Start the application: npm start (http://localhost:3000)
5. Build for production: npm run build (output in `build/`)

Or with Docker: `docker compose up`

## Deployment

The application is deployed and accessible at: [https://anime-search.lucasbroering.dev](https://anime-search.lucasbroering.dev)

## Screenshots 
<details>
<summary>Screenshot 1</summary>

![screenshot1](https://github.com/user-attachments/assets/7697f09a-6a87-4459-aa0c-6059f49d78c2)

</details>

<details>
<summary>Screenshot 2</summary>
  
![screenshot2](https://github.com/user-attachments/assets/6993a431-25c4-4ffb-8776-35016b523d5c)

</details>



