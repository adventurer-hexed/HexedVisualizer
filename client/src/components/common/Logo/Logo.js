import React, { Component } from 'react'
import './Logo.css'
import Dark from './Dark.svg'
import Light from './Light.svg'

class Logo extends Component {
    render() {
        return (
            <figure className="logo" style={{
                height: this.props.height,
                fontSize: `calc(${this.props.height} * ${this.props.textMultiplier || 0.6})`
            }}>
                <img src={(this.props.light) ? Light : Dark} alt="Left Bracket" className="left-bracket" />
                {(this.props.large) ? <span className={(this.props.light) ? "logo-text light" : "logo-text"}>HEXED</span> : <span className={(this.props.light) ? "logo-text small light" : "logo-text small"}>H</span>}
                <img src={(this.props.light) ? Light : Dark} alt="Left Bracket" className="right-bracket" />
            </figure>
        )
    }
}

export default Logo