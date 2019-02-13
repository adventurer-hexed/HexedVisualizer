import React, { Component } from "react"
import {FaSistrix} from 'react-icons/fa'

class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state={
            searchDelayed: false
        }
    }
    render(){
        return(
            <label className="searchBar">
                <input type="text" placeholder="Search..." onChange={(event)=>{
                    let ele = event.target;
                    if(ele.value && this.state.searchDelayed === false){
                        this.setState({
                            searchDelayed: true
                        })
                        setTimeout(()=>{
                            this.props.updateSearchResults(ele.value)
                            this.setState({
                                searchDelayed: false
                            })
                        }, 500)
                    }
                }} />
                <FaSistrix style={
                    {color: "#fff", width: "25px", height: "25px", right: "15px", top: "calc(50% - 12.5px)", position: "absolute"}
                }/>
            </label>
        )
    }
}

export default SearchBar