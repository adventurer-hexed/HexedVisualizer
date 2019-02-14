import React, { Component } from "react"
import SearchBar from './SearchBar'
import ResultsMenu from './ResultsMenu'
import { connect } from 'react-redux'
import { playPlayback, fetchSearchResults } from "../../actions"
import "./Search.css"

class Search extends Component {
    updateSearch = async (searchTerms)=>{
        this.props.fetchSearchResults(searchTerms)
    }

    playSong = async (trackURI)=>{
        this.props.playPlayback(trackURI)
    }

    render(){
        return(
            <div className="searchMenu">
                <SearchBar updateSearchResults={this.updateSearch} />
                <ResultsMenu results={this.props.searchResults} playSong={this.playSong} />
                <button onClick={()=>{this.playSong("spotify:track:0Ult84lvFuqNvbyXwyRQ58")}}>Test</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    deviceId:state.device.id,
    searchResults:state.searchResults
})


export default connect(mapStateToProps, {playPlayback, fetchSearchResults})(Search)
