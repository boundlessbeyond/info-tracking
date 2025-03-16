import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import MainGame from './GameForm';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainGame />
  </StrictMode>
)
