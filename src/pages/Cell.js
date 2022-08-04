import React from "react";
import "./Cell.css"

class Cell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: false
        }
    }
    //----------------------------------------------------------------
    render() {
        return(
            <button
                className={this.state.selected?"cell-on":"cell-off"}
                onClick={(e)=>this.setState({selected: ! this.state.selected})}
            >
            </button>
        )
    }
}

export default Cell