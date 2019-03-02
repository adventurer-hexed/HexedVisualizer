import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router-dom"
import {  IoIosSearch, IoIosHome, IoMdMusicalNote, IoIosPower } from "react-icons/io"
import "./SideNav.css"
import NavLink from "./NavLink";
import LogoutBtn from "./LogoutBtn";

const navLinks = [
    { path: "/", text: "Home", Component: IoIosHome },
    { path: "/visualizer", text: "Visualizer", Component: IoMdMusicalNote },
    { path: "/search", text: "Search", Component: IoIosSearch }
]

export default (props) => ReactDOM.createPortal(
    <div className="side_nav">
        <section>
            {
                navLinks.map( ({path, text, Component}) => (
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