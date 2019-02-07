import React, { Component } from "react";
import axios from "axios"
import SpotifyScript from "../SpotifyScript"
import requireAuth from "../HOC/requireAuth";
import { connect } from "react-redux"
import { playPlayback, stopPlayback } from "../../actions"
import { FaPlay, FaPause } from 'react-icons/fa';

class HomePage extends Component {

    async componentDidMount() {
        let res = await axios.get("/api/get-song-analysis")
        console.log(res.data)
    }

    playPlayback = () => {
        this.props.playPlayback()
    }

    stopPlayback = () => {
        this.props.stopPlayback()
    }

    renderPlayer() {
        console.log(this.props.isPlayback)
        return (
            this.props.isPlayback
            ? ( <button className="btn_reset" onClick={this.stopPlayback}>
                    <FaPause size="3em" color="red" />
                </button>
            )
            : ( <button className="btn_reset" onClick={this.playPlayback}>
                    <FaPlay size="3em" color="#4285f4" />
                </button>
            )

        )
    }
    
    
    render() {
        return (
            <div>
                <SpotifyScript 
                    token={this.props.auth.accessToken}
                />
                <h1>Home Page</h1>
                { this.renderPlayer() }

            </div>
        );
    }
}

const mapStateToProps = (state) => ({isPlayback:state.playState.isPlayState})

export default connect(mapStateToProps, { playPlayback, stopPlayback })(requireAuth(HomePage));
