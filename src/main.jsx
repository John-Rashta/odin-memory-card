import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MemoryApp from './components/MemoryApp';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MemoryApp />
  </StrictMode>,
)
