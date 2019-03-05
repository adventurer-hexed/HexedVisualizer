import React from "react"
import Script from "react-load-script"
import { connect } from "react-redux"
import { deviceStateListener, fetchAvailableDevices, updateCurrentDeviceId } from "../../actions"

export default connect(null, { deviceStateListener, fetchAvailableDevices, updateCurrentDeviceId })(

    class SpotifyScript extends React.Component {
        setupScriptLoad = () => {
            window.onSpotifyWebPlaybackSDKReady = () => {
                const player = new window.Spotify.Player({
                    name: "Visualizer",
                    getOAuthToken: cb => { cb(this.props.token); }
                });

                // Error handling
                player.addListener('initialization_error', ({ message }) => { console.error(message); });
                player.addListener('authentication_error', ({ message }) => { console.error(message); });
                player.addListener('account_error', ({ message }) => { console.error(message); });
                player.addListener('playback_error', ({ message }) => { console.error(message); });

                // Playback status updates
                player.addListener('player_state_changed', state => {
                    if (state) {
                        console.log(state)
                        // this.props.deviceStateListener(state.paused)
                        this.props.deviceStateListener(state);
                        // this.props.fetchAnalysis(state.track_window.current_track.id)
                        this.props.fetchAvailableDevices()
                    }
                });

                // Ready
                player.addListener('ready', ({ device_id }) => {
                    console.log(device_id)
                    this.props.updateCurrentDeviceId(device_id)
                });

                // Not Ready
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                // Connect to the player!
                player.connect();
            };
        }
        componentWillMount() {
            this.setupScriptLoad();
        }
        render() {
            return (
                <Script
                    url="https://sdk.scdn.co/spotify-player.js"
                />
            )
        }
    }
)