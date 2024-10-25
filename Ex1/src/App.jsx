import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import store from './reducer/store'
import {Provider} from 'react-redux'

const App = () => {
    return (
        <Provider store={store}>
            <Home/>
        </Provider>
    )
}

export default App