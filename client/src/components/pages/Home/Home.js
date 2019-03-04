import React from 'react'
import SideNav from "../../common/SideNav/SideNav"
import requireAuth from "../../common/HOC/requireAuth"
import { connect } from "react-redux"
import { compose } from "redux"
import { playPlayback, stopPlayback, updateProgress, fetchCurrPlayback } from "../../../actions"
import Search from '../../common/Search/Search'
import ResultsGrid from '../../common/Results/ResultsGrid'
import Player from '../../common/Player/NewPlayer'
import SpotifyScript from '../../common/SpotifyScript'
import history from "../../../history"
import './Home.css'

const Home = (props) => (
    <div className="home">
        <SpotifyScript
            token={props.auth.accessToken}
        />
        <div className="push_content contentContainer">
            <Search displayResults={true}
                songClickHandler={(songURI) => {
                    props.playPlayback(songURI)
                }
                } />
        </div>

        <SideNav />

        <ResultsGrid
            results={props.searchResults}
            playSong={(songURI) => {
                props.playPlayback(songURI)
                history.push('/visualizer')
            }}
        />
        <Player />
    </div>
)

const mapStateToProps = (state) => ({
    auth: state.auth,
    isPlayback: state.playState.isPlayState,
    currSongPlayback: state.currSongPlayback,
    currSongAnalysis: state.songAnalysis,
    searchResults: state.searchResults
})

const enhance = compose(requireAuth)

const EnhancedComponent = connect(mapStateToProps,
    {
        playPlayback,
        stopPlayback,
        updateProgress,
        fetchCurrPlayback
    })(Home)

export default enhance(EnhancedComponent)