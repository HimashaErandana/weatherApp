import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TemperatureDisplay from './ui/temp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <TemperatureDisplay/>
    </>
  )
}

export default App
