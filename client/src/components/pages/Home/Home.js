import React, { Component } from "react";
import { connect } from "react-redux"
import { compose } from "redux"
import { 
    playPlayback, 
    stopPlayback, 
    updateProgress, 
    fetchCurrPlayback, 
    getRecentlyPlayed 
} from "../../../actions"
import {
    SideNav,
    requireAuth,
    Search,
    Player,
    Track,
    Loader,
    SpotifyScript
} from "../../common"


import './Home.css'

class Home extends Component {

    componentDidMount(){
        this.props.getRecentlyPlayed();
    }

    playSong = (songURI, songID) => {
        this.props.playPlayback(songURI, songID)
    }

    songClickHandler = (songURI) => {
        this.props.playPlayback(songURI)
    }

    handleSongClick

    render() {
        document.title = "Home"
        return (
            <div className="home">
                <SpotifyScript />
                {
                    this.props.isLoading
                    ? <Loader />
                    : ""
                    
                }
                <div className="push_content contentContainer push_content_bottom">
                    <Search 
                        displayResults={false}
                        songClickHandler={this.songClickHandler} 
                    />

                    <h2 className="tracks_header">Recently Played</h2>

                    <Track
                        results={this.props.recentlyPlayed}
                        playSong={this.playSong}
                    />
                </div>

                <SideNav />
                <Player />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let recentlyPlayed = []
    if(Object.values(state.recentlyPlayed).length > 0){
        recentlyPlayed = state.recentlyPlayed
    }
    return {
        auth: state.auth,
        isPlayback: state.playState.isPlayState,
        currSongPlayback: state.currSongPlayback,
        currSongAnalysis: state.songAnalysis,
        searchResults: state.searchResults,
        recentlyPlayed,
        isLoading: state.isLoading
    }
}

const enhance = compose(requireAuth)

const EnhancedComponent = connect(mapStateToProps,
    {
        playPlayback,
        stopPlayback,
        updateProgress,
        fetchCurrPlayback,
        getRecentlyPlayed
    })(Home)

export default enhance(EnhancedComponent)