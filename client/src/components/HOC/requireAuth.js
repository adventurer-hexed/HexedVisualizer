import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../../history";
import { getUser } from "../../actions";

export default ChildComponent => {
    class ComposedComponent extends Component {
        state = {
            isLoggedIn: null
        };
        
        componentDidMount() {
            this.props.getUser(this.props.match.params.path)
            if (!this.props.auth.isSignedIn && !this.props.auth.id) {
                history.push("/login");
            } else {
                this.setState({ isLoggedIn: true });
            }
        }

        renderComponent() {
            if (this.state.isLoggedIn === null) {
                return <h1>Loading...</h1>;
            } else if (this.state.isLoggedIn) {
                return <ChildComponent {...this.props} />;
            }
        }

        render() {
            return <React.Fragment>{this.renderComponent()}</React.Fragment>;
        }
    }

    const mapStateToProps = state => {
        return {
            auth: state.auth
        };
    };
    return connect(
        mapStateToProps,
        { getUser }
    )(ComposedComponent);
};
