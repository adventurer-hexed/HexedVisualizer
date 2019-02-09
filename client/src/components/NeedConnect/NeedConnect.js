import React from 'react'
import connectionImg from "../../assets/images/needConnect.png"
export default () => (
    <div className="need_connection_container">
        <figure className="connect_wrapper">
            <div>
                <img 
                    className="connectionImg" 
                    alt="Connection required" 
                    src={connectionImg} 
                />
            </div>

            <figcaption className="connection_text">
                <p>Connect with your device</p>
                <p>Device name: Visualizer</p>
            </figcaption>
        </figure>
    </div>
)