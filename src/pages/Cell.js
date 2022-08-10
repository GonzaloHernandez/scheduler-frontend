import React from 'react';

class Cell extends React.Component {
    //---------------------------------------------------
    constructor(props) {
        super(props)
        this.state = {
            handler: props.handler,
            r: props.r,
            c: props.c,
        }
    }
    //---------------------------------------------------
    render() {
        const [r,c] = [this.state.r, this.state.c]
        const handler = this.state.handler
        const starting = handler.state.starting
        const size = handler.state.size
        let   data = handler.state.data

        return (
            <td
                className={data[c][r+starting]?"cell-on":"cell-off"}
                onWheel={(e)=>{
                    if (e.deltaY<0 && starting>1) {
                        handler.setState({starting: starting-2})
                    }
                    else if (e.deltaY>0 && starting<48-size) {
                        handler.setState({starting: starting+2})
                    }
                }}
                onMouseDown={(e)=>{
                    handler.setState({
                        dragging: true,
                        movement: false,
                        previous: data[c][r+starting]
                    })
                }}

                onMouseMove={(e)=>{
                    handler.setState({select:!e.shiftKey})
                    handler.setState({movement:true})
                    if (handler.state.dragging) {
                        data[c][r+starting] = handler.state.select
                    }
                }}
                onMouseUp={(e)=>{
                    if (!handler.state.movement) {
                        data[c][r+starting] = !handler.state.previous
                    }
                    handler.setState({dragging:false, movement:false})
                }}
            >
            </td>
        )
    }
}

export default Cell