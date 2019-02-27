import React, { Component } from "react";
import { connect } from "react-redux";
import Particles from "react-particles-js";
import particles from "./particles.json";
import LoginForm from "./LoginForm";
import { getUser, signIn } from "../../../actions"
import "./login.css";

class Login extends Component {
    componentDidMount() {
        this.props.getUser("/")
    }
    signIn = () => {
        this.props.signIn();
    };

    render() {
        return (
            <div className="login_container">
                <Particles width="100%" height="100vh" params={particles} />
                <div className="center_form">
                    <LoginForm signIn={this.signIn} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(
    mapStateToProps,
    { signIn, getUser }
)(Login);
