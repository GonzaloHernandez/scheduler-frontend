import React from "react";
import "./Cell.css"

class Cell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: props.selected,
            handler: props.handler
        }
    }
    //----------------------------------------------------------------
    render() {
        return(
            <button
                className={this.state.selected?"cell-on":"cell-off"}
                onClick={(e)=>this.setState({selected: ! this.state.selected})}
                onMouseDown={(e)=>{
                    if (this.state.selected) 
                        this.state.handler.setState({select:false})
                    else
                        this.state.handler.setState({select:true})
                    
                    this.state.handler.setState({dragging:true})
                }}
                onMouseUp={(e)=>this.state.handler.setState({dragging:false})}
                onMouseMove={(e)=>{
                    if (this.state.handler.state.dragging) {
                        this.setState({selected: this.state.handler.state.select})
                    }
                }}
            >
            </button>
        )
    }
}

export default Cell