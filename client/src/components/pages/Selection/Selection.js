import React from "react"
import { connect } from "react-redux"
import requireAuth from "../../common/HOC/requireAuth"
import Song from "../../common/Song/Song"
import SideNav from "../../common/SideNav/SideNav";
import "./Song_Page.css"
import SongHeader from "../../common/Song/SongHeader";
import Search from "../../common/Search/Search"
import NoResults from "./NoResults";
import Player from "../../common/Player/NewPlayer"

class Selection extends React.Component {
    componentDidMount() {
        document.getElementById("searchInput").focus();
        document.getElementById("searchInput").select();
    }
    renderSearchResults() {
        if (this.props.searchResults.length === 0) {
            return (
                <div className="song_page_wrapper">
                    <div className="song_featured_pic_wrapper">
                        <div className="song_image" style={{
                            backgroundImage: `url("https://placehold.it/350")`
                        }}
                        />
                        <div className="song_featured">
                            <h1>Featured</h1>
                            <h1>Song</h1>
                            <h2>Artist</h2>
                        </div>
                    </div>


                    <div className="song_wrapper">
                        <SongHeader />
                        <Song
                            song={"Gods Plan"}
                            artist={"Drake"}
                            album={"Album"}
                            timestamp={"4.29"}
                        />

                        <Song
                            song={"Gods Plan"}
                            artist={"Drake"}
                            album={"Album"}
                            timestamp={"4.29"}
                        />
                    </div>
                </div>
            )
        } else {
            return (
                <NoResults userInput={"UserInput"} />
            )
        }
    }
    render() {
        document.title = "Search"
        return (
            <div className="push_content song_page">
                <SideNav />
                <Search />
                {this.renderSearchResults()}
                <Player />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchResults: Object.values(state.searchResults)
    }
}



export default requireAuth(connect(mapStateToProps, {})(Selection));
