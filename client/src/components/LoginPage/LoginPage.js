import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../actions/";
import Particles from "react-particles-js";
import particles from "./particles.json";
import Form from "./Form";
import "./login.css";

class Login extends Component {
    signIn = () => {
        this.props.signIn();
    };

    render() {
        return (
            <div className="login_container">
                <Particles width="100%" height="100vh" params={particles} />
                <div className="center_form">
                    <Form signIn={this.signIn} />
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { signIn }
)(Login);
