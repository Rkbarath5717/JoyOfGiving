import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DonationForm from './Form/DonationForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DonationForm />
    </>
  )
}

export default App
