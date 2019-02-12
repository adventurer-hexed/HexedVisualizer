import React from "react"
import { connect } from "react-redux"
import SpotifyScript from "../SpotifyScript";
import NeedConnect from "../NeedConnect/NeedConnect";
import { fetchAvailableDevices } from "../../actions"


export default ChildComponent => {
    class ComposedComponent extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                playerReference: null
            }
        }
        componentDidMount() {
            this.props.fetchAvailableDevices()
        }

        renderPlayer() {
            if(this.props.availableDevices) {
                return <ChildComponent playerReference={this.state.playerReference} {...this.props} />
            } else {
                return <NeedConnect />
            }
        }
        updatePlayerReference = (ref)=> {
            this.setState({playerReference: ref});
        }
        render() {
    
            return (
                <React.Fragment>
                    <SpotifyScript 
                        setPlayerReference={this.updatePlayerReference}
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