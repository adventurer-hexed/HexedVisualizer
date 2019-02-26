import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router-dom"
import {  IoIosSearch, IoIosHome, IoMdMusicalNote, IoIosPower } from "react-icons/io"
import "./SideNav.css"
import NavLink from "./NavLink";
import LogoutBtn from "./LogoutBtn";

export default (props) => ReactDOM.createPortal(
   <div className="side_nav">
        <section>
            <NavLink path="/" text={"Home"}>
                <IoIosHome size={"2em"} color="white" />
            </NavLink>

            <NavLink path="/visualizer" text={"Visualizer"}>
                <IoMdMusicalNote size={"2em"} color="white"/>
            </NavLink>

            <NavLink path="/search" text={"Search"}>
                <IoIosSearch size={"2em"} color="white" />
            </NavLink>
        </section>
            
        <LogoutBtn />
        
   </div>,
   document.getElementById("sideNav")
)