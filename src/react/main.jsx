import * as React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.min.css'

// @ts-ignore
const root = createRoot(document.getElementById('app'))
root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
)