import React from "react"
import requireAuth from "../components/HOC/requireAuth"

class Test extends React.Component {
    render() {
        return (
            <div>
                test
            </div>
        )
    }
}

export default requireAuth(Test);