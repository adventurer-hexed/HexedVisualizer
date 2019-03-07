import React, { Component } from "react";
import SideNav from "../../common/SideNav/SideNav"
import requireAuth from "../../common/HOC/requireAuth"
import { connect } from "react-redux"
import { compose } from "redux"
import { playPlayback, stopPlayback, updateProgress, fetchCurrPlayback, getRecentlyPlayed } from "../../../actions"
import Search from '../../common/Search/Search'
import ResultsGrid from '../../common/Results/ResultsGrid'
import Player from '../../common/Player/NewPlayer'
import SpotifyScript from '../../common/SpotifyScript'
import Track from "../../common/Track/Track"
import history from "../../../history"
import './Home.css'

class Home extends Component {
    componentDidMount(){
        this.props.getRecentlyPlayed();
    }
    render() {
        document.title = "Home"
        return (
            <div className="home">
                <SpotifyScript
                    token={this.props.auth.accessToken}
                />
                <div className="push_content contentContainer push_content_bottom">
                    <Search displayResults={false}
                        songClickHandler={(songURI) => {
                            this.props.playPlayback(songURI)
                        }
                        } />

                    <h2 className="tracks_header">Recently Played</h2>

                    <Track
                    results={this.props.recentlyPlayed}
                    playSong={(songURI, songID) => {
                        this.props.playPlayback(songURI, songID)
                        // history.push('/visualizer')
                    }}
                     />
                    
                </div>



                <SideNav />
                <Player />
            </div>
        )
    }
}
// } (props) => (

// )

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
    recentlyPlayed
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