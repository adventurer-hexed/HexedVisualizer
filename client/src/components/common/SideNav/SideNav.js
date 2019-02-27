import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router-dom"
import {  IoIosSearch, IoIosHome, IoMdMusicalNote, IoIosPower } from "react-icons/io"
import "./SideNav.css"
import NavLink from "./NavLink";
import LogoutBtn from "./LogoutBtn";

const navLinks = [
    { path: "/", text: "Home", component: IoIosSearch },
    { path: "/visualizer", text: "Visualizer", component: IoMdMusicalNote },
    { path: "/search", text: "Search", component: IoIosSearch }
]

export default (props) => ReactDOM.createPortal(
    <div className="side_nav">
        <section>
            {
                navLinks.map( a => (
                    <NavLink path={a.path} text={a.text}>
                        <a.component size={"2em"} color="color" />
                    </NavLink>
                ))
            }
        </section>

        <LogoutBtn />
    </div>,
   document.getElementById("sideNav")
)