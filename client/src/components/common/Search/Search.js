import React, { Component } from "react"
import SearchBar from './SearchBar'
import ResultsDropdown from '../Results/ResultsDropdown'
import { connect } from 'react-redux'
import { playPlayback, fetchSearchResults } from "../../../actions"
import "./Search.css"

class Search extends Component {
    updateSearch = async (searchTerms)=>{
        this.props.fetchSearchResults(searchTerms)
    }

    playSong = async (trackURI)=>{
        this.props.playPlayback(trackURI)
    }

    render(){
        let displayResults = this.props.displayResults || true
        return(
            <div className="searchMenu">
                <SearchBar updateSearchResults={this.updateSearch} />
                {displayResults? <ResultsDropdown results={this.props.searchResults} playSong={(this.props.songClickHandler)? this.props.songClickHandler : this.playSong} /> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    deviceId:state.device.id,
    searchResults:state.searchResults
})


export default connect(mapStateToProps, {playPlayback, fetchSearchResults})(Search)
