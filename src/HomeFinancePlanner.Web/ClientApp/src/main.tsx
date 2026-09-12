import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import Map from './pages/Map'
import App from './pages/App'
import { BrowserRouter, Route, Routes } from 'react-router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}></Route>
                <Route path='/map' element={<Map />}></Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
