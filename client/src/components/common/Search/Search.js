import React, { Component } from "react"
import SearchBar from './SearchBar'
import ResultsDropdown from '../Results/ResultsDropdown'
import { connect } from 'react-redux'
import { playPlayback, fetchSearchResults } from "../../../actions"
import "./Search.css"

class Search extends Component {
    updateSearch = (searchTerms) => {
        this.props.fetchSearchResults(searchTerms)
    }

    playSong = (trackURI, songId) => {
        this.props.playPlayback(trackURI, songId)
    }

    render() {
        let displayResults = this.props.displayResults || false
        return (
            <div className="searchMenu">
                <SearchBar pushToSearch={this.props.pushToSearch || false} updateSearchResults={this.updateSearch} />
                {
                    (displayResults) ? <ResultsDropdown
                        results={this.props.searchResults}
                        playSong={this.playSong}
                        songClickHandler={this.props.songClickHandler}
                    /> : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    deviceId: state.device.id,
    searchResults: state.searchResults
})


export default connect(mapStateToProps, { playPlayback, fetchSearchResults })(Search)
