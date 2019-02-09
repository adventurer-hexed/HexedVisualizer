import React from "react"
import { connect } from "react-redux"
import SpotifyScript from "../SpotifyScript";
import NeedConnect from "../NeedConnect/NeedConnect";
import { fetchAvailableDevices } from "../../actions"


export default ChildComponent => {
    class ComposedComponent extends React.Component {
        componentDidMount() {
            this.props.fetchAvailableDevices()
        }

        renderPlayer() {
            if(this.props.availableDevices) {
                return <ChildComponent {...this.props} />
            } else {
                return <NeedConnect />
            }
        }

        render() {
    
            return (
                <React.Fragment>
                    <SpotifyScript 
                        token={this.props.auth.accessToken}
                    />

                    { this.renderPlayer() }
                </React.Fragment>
            )
        }
    }

    const mapStateToProps = (state) => {

        return { availableDevices: state.availableDevices["Visualizer"]["is_active"] }
    }
    
    return connect(mapStateToProps, { fetchAvailableDevices })(ComposedComponent)
}