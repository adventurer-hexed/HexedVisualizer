import React from "react"
import { Link } from "react-router-dom"
// import { IoIosArrowBack } from "react-icons/io"
import "./BackBtn.css"
export default ({artist, song}) => (
    <Link to="/" className="back_btn">
        <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
            <span className="back_btn_text"><i>{song}</i></span>
            <span className="back_btn_text">{artist}</span>
        </div>
    </Link>
)