import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'

import './App.css'
import YouthCalendar from "./components/YouthCalendar"

const App = () => (
    <HashRouter>
        <Switch >
            <Route exact path='/' render={(props) => (<div></div>)} />
            <Route exact path='/youthCale' render={(props) => (<YouthCalendar />)} />
        </Switch>
    </HashRouter>
)

export default App
