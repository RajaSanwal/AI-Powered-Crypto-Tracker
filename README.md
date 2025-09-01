# CryptoTracker Pro

A professional cryptocurrency tracking application with real-time prices, charts, and market data.

## Prerequisites

- Node.js (version 16 or higher)
- npm (usually comes with Node.js)
- Docker (optional, for containerized deployment)

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The application will be available at http://localhost:5173

### 3. Other Available Scripts

- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Docker Setup

### Quick Start with Docker

The simplest way to run the application with Docker:

```bash
docker run -p 5173:5173 -v $(pwd):/app crypto-tracker-dev
```

### Building and Running with Docker

1. Build the Docker image:
   ```bash
   docker build -t crypto-tracker-dev .
   ```

2. Run the container:
   ```bash
   docker run -p 5173:5173 -v $(pwd):/app crypto-tracker-dev
   ```

The application will be available at http://localhost:5173

### Production Docker Deployment

For production deployment, you would typically:

1. Build the application:
   ```bash
   npm run build
   ```

2. Serve the built files using a web server like Nginx or serve:
   ```bash
   npm install -g serve
   serve -s dist
   ```

## Project Structure

```
src/
├── components/     # React components
├── hooks/          # Custom React hooks
├── services/       # API services
├── types/          # TypeScript types
└── utils/          # Utility functions
```

## Features

- Real-time cryptocurrency prices
- Interactive charts for price visualization
- Search functionality to find specific cryptocurrencies
- Dark/light theme toggle
- Responsive design for all device sizes

## Technologies Used

- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Recharts for data visualization
- Axios for API requests
- Lucide React for icons

## API Integration

The application uses the CoinGecko API to fetch real-time cryptocurrency data. The API integration is handled through the `cryptoService` in the `src/services/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.