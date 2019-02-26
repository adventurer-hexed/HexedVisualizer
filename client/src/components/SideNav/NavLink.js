import React from "react"
import { Link } from "react-router-dom"

export default ({path, icon, text, clN, children}) => (

    <Link to={path} className={`side_nav_icon_container ${clN}`}>
        <div className="nav_icon_container">
            { children }
        </div>
        <p className="nav_icon_text">{ text }</p>
    </Link>

)