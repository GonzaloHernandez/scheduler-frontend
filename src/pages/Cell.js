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
                // onClick={(e)=>this.setState({selected: ! this.state.selected})}
                onMouseDown={(e)=>{
                    this.state.handler.setState({
                        dragging:true,
                        movement: false,
                        previous:this.state.selected
                    })
                }}
                onMouseMove={(e)=>{
                    this.state.handler.setState({movement:true})
                    if (this.state.handler.state.dragging) {
                        this.setState({selected: this.state.handler.state.select})
                    }
                }}
                onMouseUp={(e)=>{
                    if (!this.state.handler.state.movement) {
                        this.setState({selected: !this.state.handler.state.previous})
                    }
                    this.state.handler.setState({dragging:false, movement:false})
                }}
                onKeyDown={(e)=>{
                    if(e.key == 'd') this.state.handler.setState({select:false})
                }}
                onKeyUp={(e)=>{
                    if(e.key == 'd') this.state.handler.setState({select:true})
                }}
            >
            </button>
        )
    }
}

export default Cell