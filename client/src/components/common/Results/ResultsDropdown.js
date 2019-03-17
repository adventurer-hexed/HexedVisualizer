import React, { Component } from 'react';
import './ResultsDropdown.css';

class ResultsDropdown extends Component {
  generateCards = () => {
    const { results, playSong } = this.props;

    return results.tracks.items.map((song, i) => (
      <li
        className="resultItem"
        key={i}
        onClick={() => {
          playSong(song.uri, song.id);
        }}
      >
        <div className="songImage">
          <img src={song.album.images[2].url} alt="Album Cover" />
        </div>
        <div className="songInfo">
          <div className="songName">Title: {song.name}</div>
          <div className="songArtist">
            Artist:{' '}
            {song.artists.reduce((out, artist) => {
              let next = out;
              if (next === '') {
                return artist.name;
              }
              return (next += `, ${artist.name}`);
            }, '')}
          </div>
        </div>
      </li>
    ));
  };

  render() {
    const { results } = this.props;
    return results.tracks ? (
      <ul className="searchResults">{this.generateCards()}</ul>
    ) : (
      ''
    );
  }
}

export default ResultsDropdown;
