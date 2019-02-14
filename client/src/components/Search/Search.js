import React, { Component } from "react"
import axios from 'axios'
import SearchBar from './SearchBar'
import ResultsMenu from './ResultsMenu'
import { connect } from 'react-redux'
import { playPlayback } from "../../actions"
import "./Search.css"

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchResults: []
        }
    }

    updateSearch = async (searchTerms)=>{
        const res = await axios.get(`/api/search/${encodeURIComponent(searchTerms)}`)
        console.log(res.data)
        this.setState({
            searchResults: res.data
        })
    }

    playSong = async (trackURI)=>{
        this.props.playPlayback(trackURI)
    }

    render(){
        return(
            <div className="searchMenu">
                <SearchBar updateSearchResults={this.updateSearch} />
                <ResultsMenu results={this.state.results}/>
                <button onClick={()=>{this.playSong("spotify:track:0Ult84lvFuqNvbyXwyRQ58")}}>Test</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    deviceId:state.device.id
})


export default connect(mapStateToProps, {playPlayback})(Search)
