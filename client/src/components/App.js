import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home"
import Player from "./common/Player/NewPlayer";
import history from "../history";
import Test from "./Test";
import Selection from "./pages/Selection/Selection";

export default class App extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/visualizer" component={Player} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/search" component={Selection} />
                </div>
            </Router>
        );
    }
}
