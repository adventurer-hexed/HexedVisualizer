import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FaBackward,
  FaForward,
  FaPlay,
  FaPause,
  FaVolume,
} from 'react-icons/fa';
import {
  playPlayback,
  stopPlayback,
  updateProgress,
  fetchCurrPlayback,
  seekProgressPlayback,
  updateVolume,
} from '../../../actions';
import './Player.css';

class Player extends Component {
  constructor() {
    super();
    this.state = {
      inc: 0,
      volume: 100,
    };
  }

  componentDidMount() {
    clearInterval(this._progressInterval);
    if (this.props.isPlayback) {
      this.props.fetchCurrPlayback();
      this.playSongProgression();
    }
  }

  componentWillUnmount() {
    clearInterval(this._progressInterval);
  }

  handleProgressMouseDown = () => {
    clearInterval(this._progressInterval);
  };

  handleProgressDrag = event => {
    const newProgress = event.target.value;
    this.setState({ inc: newProgress });
  };

  handleProgressMouseUp = event => {
    const newProgress = event.target.value;
    this.setState({ inc: newProgress });
    this.playSongProgression();
    this.props.seekProgressPlayback(newProgress);
  };

  handleVolumeChange = event => {
    const newVolume = event.target.value;
    this.setState({ volume: newVolume });
  };

  handleVolumeRelease = event => {
    const newVolume = event.target.value;
    this.setState({ volume: newVolume });
    this.props.updateVolume(newVolume);
  };

  handlePlayButtonClick = () => {
    if (this.props.isPlayback) {
      clearInterval(this._progressInterval);
      this.props.fetchCurrPlayback();
      this.props.stopPlayback();
    } else {
      this.props.fetchCurrPlayback();
      this.props.playPlayback(false);
      this.playSongProgression();
    }
  };

  playSongProgression = () => {
    const start = new Date().getTime();
    this._progressInterval = setInterval(() => {
      const now = new Date().getTime();
      const curr = this.props.currentTime;
      this.setState({
        inc: curr + (now - start),
      });
    }, 1);
  };

  render() {
    const {
      albumCover,
      songName,
      artistName,
      isPlayback,
      totalTime,
    } = this.props;
    return (
      <div className="player_container">
        <div className="player">
          <div className="playbackInfo">
            <div className="songImage">
              {albumCover ? (
                <img
                  src={albumCover}
                  className="albumCover"
                  alt="Album Cover"
                />
              ) : null}
            </div>
            <div className="songInfo">
              <div className="songName">{songName}</div>
              <div className="songArtist">{artistName}</div>
            </div>
          </div>
          <div className="playbackControls">
            <div className="lastButton disabled">
              <FaBackward />
            </div>
            <button
              type="button"
              className="playButton"
              onClick={this.handlePlayButtonClick}
            >
              {isPlayback ? <FaPause /> : <FaPlay />}
            </button>
            <div className="nextButton disabled">
              <FaForward />
            </div>
            <div className="progress">
              <input
                className="slider"
                type="range"
                min="0"
                max={totalTime}
                onMouseDown={this.handleProgressMouseDown}
                onMouseUp={this.handleProgressMouseUp}
                onChange={this.handleProgressDrag}
                value={this.state.inc}
              />
            </div>
          </div>
          <div className="volume">
            <FaVolume />
            <input
              className="slider"
              type="range"
              min="0"
              max="100"
              value={this.state.volume}
              onChange={this.handleVolumeChange}
              onMouseUp={this.handleVolumeRelease}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.currSongPlayback.item) {
    if (Object.keys(state.currSongPlayback.item).length > 0) {
      return {
        albumCover: state.currSongPlayback.item.album.images[2].url,
        songName: state.currSongPlayback.item.name,
        artistName: state.currSongPlayback.item.artists.reduce(
          (out, artist) => {
            let next = out;
            if (next === '') {
              next = artist.name;
            } else {
              next += `, ${artist.name}`;
            }
            return next;
          },
          ''
        ),
        isPlayback: state.playState.isPlayState,
        currentTime: state.currSongPlayback.progress_ms,
        totalTime: state.currSongPlayback.item.duration_ms,
        currSongPlayback: state.currSongPlayback,
      };
    }
  }
  return {
    albumCover: null,
    songName: 'Unknown',
    artistName: 'Unknown',
    isPlayback: state.playState.isPlayState,
    currentTime: 0,
    totalTime: 100,
    currSongPlayback: state.currSongPlayback,
  };
};

export default connect(
  mapStateToProps,
  {
    playPlayback,
    stopPlayback,
    updateProgress,
    fetchCurrPlayback,
    seekProgressPlayback,
    updateVolume,
  }
)(Player);
