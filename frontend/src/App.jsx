import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import TextEditor from './components/TextEditor'
import './App.css'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <>
      <div>
        <h1 className="px-8 text-3xl font-bold">TextEditMG</h1>
      </div>
      <div className="flex">
        <TextEditor className="w-full"/>
        <Sidebar className="w-1/3"/>
      </div>
    </>
  )
}

export default App
