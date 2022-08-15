import React from 'react';

class Cell extends React.Component {
    //---------------------------------------------------
    constructor(props) {
        super(props)

        this.state = {
            handler : props.handler,
            r       : props.r,
            c       : props.c,
            value   : props.value
        }
    }
    //---------------------------------------------------
    static getDerivedStateFromProps(props, state) {
        return {value: props.value };
    }
    //---------------------------------------------------
    render() {
        const handler   = this.state.handler
        const r         = this.state.r
        const value     = this.state.value
        const starting  = handler.state.starting
        let   data      = handler.state.data

        return (
            <td
                className={
                    data.find(v=>v===value)?
                        "cell-on":
                    (r+starting)%4===0||((r+starting)-1)%4===0?"cell-off2":"cell-off1"}

                onMouseDown={(e)=>{
                    if (e.button === 0) { // left click
                        handler.setState({
                            dragging: true,
                            movement: false,
                            previous: data.find(v=>v===value)?true:false 
                        })
                      }
                }}
                onMouseMove={(e)=>{
                    handler.setState({select:!e.shiftKey})
                    handler.setState({movement:true})
                    if (handler.state.dragging) {
                        if (!e.shiftKey) {
                            if (!data.find(v=>v===value)) {
                                data.push(value)
                            }
                        } else {
                            const found = data.indexOf(value)
                            if (found >= 0) {
                                data.splice(found, 1)
                            }
                        }
                    }
                }}
                onMouseUp={(e)=>{
                    if (!handler.state.movement) {
                        if (handler.state.previous) {
                            const found = data.indexOf(value)
                            if (found >= 0) {
                                data.splice(found, 1)
                            }
                        }
                        else
                            data.push(value)
                    }
                    handler.setState({dragging:false, movement:false})
                }}
            >
                
            </td>
        )
    }
}

export default Cell