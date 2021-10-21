import React, { Component } from 'react'
import About from './About';
import About2 from './About2';
import Categoria from './Categoria';
import Countries from './Countries';
import Bascet from './Bascet'
import Search from './Search'

import {
    Switch,
    Route,
  } from "react-router-dom";
import Aisezim from './Aisezim';

export default class App extends Component {
    render() {
        return (
            <div>
                <Aisezim/>
                    <Switch>
                        <Route path="/search/:id3" component={Search}/>
                        <Route path="/bascet" component={Bascet}/>
                        <Route path="/countries/:id2" component={Countries}/>
                        <Route path='/about2/:id' component={About2}  />
                        <Route path='/about/:title' component={About}  />
                        <Route path="/">
                            <Categoria/>
                        </Route>
                    </Switch>

            </div>
        )
    }
}
