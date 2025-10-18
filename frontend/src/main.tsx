import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LazyMotion, domAnimation } from 'framer-motion';
import App from './App.tsx';
import './index.css';

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <LazyMotion features={domAnimation}>
      <App />
    </LazyMotion>
  </QueryClientProvider>
);
