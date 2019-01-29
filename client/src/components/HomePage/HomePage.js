import React, { Component } from "react";
import requireAuth from "../HOC/requireAuth";

class HomePage extends Component {
    render() {
        return (
            <div>
                <h1>Home Page</h1>
            </div>
        );
    }
}

export default requireAuth(HomePage);
