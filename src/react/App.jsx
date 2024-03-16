import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Competition from './pages/Competition.jsx'

export default function App() {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/competitions/:competition" element={<Competition />} />
                </Routes>
            </HashRouter>
        </>
    )
}
