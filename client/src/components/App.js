import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home"
import Player from "./Player/Player";
import history from "../history";

export default class App extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/visualizer" component={Player} />
                    <Route exact path="/login" component={Login} />
                </div>
            </Router>
        );
    }
}
