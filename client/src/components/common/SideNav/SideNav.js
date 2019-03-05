import React from "react"
import ReactDOM from "react-dom"
import { IoIosSearch, IoIosHome, IoMdMusicalNote } from "react-icons/io"
import "./SideNav.css"
import NavLink from "./NavLink";
import LogoutBtn from "./LogoutBtn";
import Logo from '../Logo/Logo';

const navLinks = [
    { path: "/", text: "Home", Component: IoIosHome },
    { path: "/visualizer", text: "Visualizer", Component: IoMdMusicalNote },
    { path: "/search", text: "Search", Component: IoIosSearch }
]

export default (props) => ReactDOM.createPortal(
    <div className="side_nav">
        <section>
            {
                (window.innerWidth > 1024) ? <Logo large={true} light={true} height="40px" /> : <Logo large={false} light={true} height="40px" />
            }
            {
                navLinks.map(({ path, text, Component }) => (
                    <NavLink key={text} path={path} text={text}>
                        <Component size={"2em"} color="white" />
                    </NavLink>
                ))
            }
        </section>

        <LogoutBtn />
    </div>,
    document.getElementById("sideNav")
)