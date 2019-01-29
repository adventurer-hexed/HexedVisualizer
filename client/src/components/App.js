import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import Login from "./LoginPage/LoginPage";
import HomePage from "./HomePage/HomePage";
import history from "../history";

export default class App extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/login" component={Login} />
                </div>
            </Router>
        );
    }
}
