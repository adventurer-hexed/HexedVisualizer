import React, { Component } from "react"
import axios from 'axios'
import SearchBar from './SearchBar'
import ResultsMenu from './ResultsMenu'
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

    render(){
        return(
            <div className="searchMenu">
                <SearchBar updateSearchResults={this.updateSearch} />
                <ResultsMenu results={this.state.results}/>
            </div>
        )
    }
}

export default Search