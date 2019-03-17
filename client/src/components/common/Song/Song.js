import React from 'react';
import './Song.css';
import { connect } from 'react-redux';
import { playPlayback } from '../../../actions';

export default connect(
  null,
  { playPlayback }
)(props => (
  <div
    className="song_container"
    onClick={() => props.playPlayback(true, props.uri, props.songId)}
  >
    <div className="song_text ellipse">
      <p>{props.song}</p>
    </div>

    <div className="song_artist_text ellipse">
      <p>{props.artist}</p>
    </div>

    <div className="song_album_text ellipse">
      <p>{props.album}</p>
    </div>

    <div className="song_time_text ellipse">
      <p>{props.timestamp}</p>
    </div>
  </div>
));
