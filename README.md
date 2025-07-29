# React Vite Starter

React + Vite template

## Getting Started

```bash
npx degit hayyi2/react-vite my-project
cd my-project
npm install
npm run dev
```

## Features

- React + Vite
- TypeScript
- Tailwind CSS V4
- [shadcn-ui](https://github.com/shadcn-ui/ui/)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- Playwright for E2E tests
- Vitest + RTL for unit / integration tests
- Prettier + eslint

## Project Structure

```md
root/
├── public/ # Public assets
├── src/ # Application source code
│ ├── components/ # React components
│ ├── context/ # contexts components
│ ├── config/ # Config data
│ ├── hook/ # Custom hooks
│ ├── lib/ # Utility functions
│ ├── pages/ # pages/features components
│ ├── App.tsx # Application entry point
│ ├── index.css # Main css and tailwind configuration
│ ├── main.tsx # Main rendering file
│ └── Router.tsx # Routes component
├── index.html # HTML entry point
├── playwright.config.ts # Playwright configuration
├── tsconfig.json # TypeScript configuration
├── vitest.config.ts # Vitest configuration
└── vite.config.ts # Vite configuration
```

## License

This project is licensed under the MIT License.

## Credits

Base source: https://github.com/hayyi2/react-shadcn-starter
