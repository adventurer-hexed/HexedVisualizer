import React from "react"
import ReactDOM from "react-dom"
import { IoIosSearch, IoIosHome, IoMdMusicalNote } from "react-icons/io"
import "./SideNav.css"
import NavLink from "./NavLink";
import LogoutBtn from "./LogoutBtn";
import Logo from '../Logo/Logo';
import { connect } from "react-redux"
import { playPlayback } from "../../../actions"
import history from "../../../history"

const navLinks = [
    { path: "/", text: "Home", Component: IoIosHome },
    { path: "/search", text: "Search", Component: IoIosSearch }
]

// export default (props) => ReactDOM.createPortal(
//     <div className="side_nav">
//         <section>
//             {
//                 (window.innerWidth > 1024) ? <Logo large={true} light={true} height="65px" textMultiplier=".8" /> : <Logo large={false} light={true} height="65px" textMultiplier=".8" />
//             }

//             {
//                 navLinks.map(({ path, text, Component }) => (
//                     <NavLink key={text} path={path} text={text}>
//                         <Component size={"2em"} color="white" />
//                     </NavLink>
//                 ))
//             }
//         </section>

//         <LogoutBtn />
//     </div>,
//     document.getElementById("sideNav")
// )


// export const playPlayback = (songURI, songId) => async (dispatch, getState) => {
//     if (!getState().playState.isPlayState || songURI) {
//         if (songURI) {
//             dispatch(fetchAnalysis(songId))
//         }
//         await axios.put(`/api/play-playback?deviceid=${getState().device.id}`, (songURI) ? { uris: JSON.stringify([songURI]) } : {})
//         dispatch({ type: PLAY_STATE_ON, payload: true })
//         dispatch(fetchCurrPlayback())
//     }
// }
const mapStateToProps = state => {
    return {
        currSongInfo: state.currSongInfo
    }
}

export default connect(mapStateToProps, { playPlayback })(
    class SideNav extends React.Component {
        state = {
            largeLogo: true
        }
        playSong = () => {
            const { URI, songId } = this.props.currSongInfo
            if (URI === "" || songId === "") {
                console.log("You have not selected any song")
            } else {

                this.props.playPlayback(URI, songId)
            }
        }

        renderSongToVis() {
            return (
                <div
                    className={`side_nav_icon_container`}
                    onClick={this.playSong}
                >
                    <div className="nav_icon_container">
                        <IoMdMusicalNote size={"2em"} color="white" />
                    </div>
                    <p className="nav_icon_text">Visualizer</p>
                </div>
            )
        }
        resizeHandler = () => {
            if (window.innerWidth < 1024) {
                this.setState({
                    largeLogo: false
                })
            } else {
                this.setState({
                    largeLogo: true
                })
            }
        }
        componentDidMount() {
            if (window.innerWidth < 1024) {
                this.setState({
                    largeLogo: false
                })
            }
            window.addEventListener('resize', this.resizeHandler)
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.resizeHandler)
        }

        render() {
            return (
                ReactDOM.createPortal(
                    <div className="side_nav">
                        <section>
                            <Logo large={this.state.largeLogo} light={true} height={(this.state.largeLogo) ? "65px" : "40px"} textMultiplier=".6" />

                            {
                                navLinks.map(({ path, text, Component }) => (
                                    <NavLink key={text} path={path} text={text}>
                                        <Component size={"2em"} color="white" />
                                    </NavLink>
                                ))
                            }
                            {this.renderSongToVis()}
                        </section>

                        <LogoutBtn />
                    </div>,
                    document.getElementById("sideNav")
                )
            )
        }
    })