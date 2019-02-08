import React from "react"
import { connect } from "react-redux"
import SpotifyScript from "../SpotifyScript";

const mapStateToProps = (state) => {
    if(Object.values(state.deviceState).length > 0) {
        return { deviceState: state.deviceState}
    } else {
        return {}
    }
}

export default ChildComponent => {
    class ComposedComponent extends React.Component {

        renderPlayer() {
            if(this.props.deviceState) {
                return <ChildComponent {...this.props} />
            } else {
                return <h1>You need to connect with you device</h1>
            }
        }
        render() {
            return (
                <React.Fragment>
                    <SpotifyScript 
                        token={this.props.auth.accessToken}
                    />

                    {
                        this.renderPlayer()
                    }
                </React.Fragment>
            )
        }
    }
    return connect(mapStateToProps, {})(ComposedComponent)
}