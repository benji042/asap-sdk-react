import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AsapButton } from './index'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='app'>
        <AsapButton amount={0.001} currency='ETH' chain='ethereum'/>
    </div>
  </StrictMode>,
)
