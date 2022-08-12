import React from 'react';

class Cell extends React.Component {
    //---------------------------------------------------
    constructor(props) {
        super(props)

        this.state = {
            handler: props.handler,
            r: props.r,
            c: props.c,
            value: 0
        }
    }
    //---------------------------------------------------
    render() {
        const [r,c]     = [this.state.r, this.state.c]
        const handler   = this.state.handler
        const starting  = handler.state.starting
        const size      = handler.state.size
        let   data      = handler.state.data
        const firstdate = handler.firstdate
        
        const currentdate   = new Date(firstdate)
        currentdate.setDate(firstdate+c)
        const [y,m,d]   = [currentdate.getFullyear(),currentdate.getMonth(),currentdate.getDate()]
        const h         = starting/2+r

        const txtdate   = (y + "-" + ("0"+m).slice(-2) + "-" + ("0"+d).slice(-2) + "T" + ("0"+h).slice(-2) + ":" + (m?"00":"30") + ":00")
        const value     = Date.parse(txtdate)/100000
        this.setState({value: value})

        return (
            <td
                className={
                    data.find(v=>v===value)?
                        "cell-on":
                    (r+starting)%4===0||((r+starting)-1)%4===0?"cell-off2":"cell-off1"}
                onWheel={(e)=>{
                    if (e.deltaY<0 && starting>1) {
                        handler.setState({starting: starting-2})
                    }
                    else if (e.deltaY>0 && starting<48-size) {
                        handler.setState({starting: starting+2})
                    }
                }}

                onMouseDown={(e)=>{
                    if (e.button === 0) { // left click
                        handler.setState({
                            dragging: true,
                            movement: false,
                            previous: data.find(v=>v===value)?true:false //data[c][r+starting]
                        })
                    }
                }}
                onMouseMove={(e)=>{
                    handler.setState({select:!e.shiftKey})
                    handler.setState({movement:true})
                    if (handler.state.dragging) {
                        //data[c][r+starting] = handler.state.select
                        if (!e.shiftKey) {
                            if (!data.find(v=>v===value)) {
                                data.push(value)
                            }
                        } else {
                            data = data.filter(v=>v!=value)
                        }
                    }
                }}
                onMouseUp={(e)=>{
                    if (!handler.state.movement) {
                        if (handler.state.previous)
                            data = data.filter(v=>v!=value)
                        else
                            data.push(value)
                        // data[c][r+starting] = !handler.state.previous   //****************** im here */
                    }
                    handler.setState({dragging:false, movement:false})
                }}
            >
            </td>
        )
    }
}

export default Cell