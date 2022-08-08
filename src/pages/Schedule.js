import React from "react";
import "./Schedule.css";
import Cell from "./Cell"

// import axios from "axios"

const days  = [ "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday" ]
const cells = []

class Schedule extends React.Component {
    //-------------------------------------------------------------
    constructor(props) {
        super(props)
        for (let i=0; i<48; i++) cells[i] = i
        this.state = {
            session: "",
            dragging: false,
            select: true,
            movement: false,
            previous: false,
        }
    }
    //-------------------------------------------------------------
    componentDidMount() {
        // axios.get("http://localhost:3001/session/1")
        // .then( res => {
        //     this.setState({ session: res.data})
        // })
        // .catch( err => {
        //     console.log("Recovery failure")            
        // })
        const data = "0011110011110000000011000011000000000000000000000000000000000000001100000000110000000000000000000000000000000000"
        this.setState({session: data})
    }
    //-------------------------------------------------------------
    render() {
        const data = "0011110011110000000011000011000000000000000000000000000000000000001100000000110000000000000000000000000000000000"
        let matrix = Array(7).fill().map(()=>Array(16).fill())
        let i=0
        for (let d=0; d<days.length; d++) {
            for (let h=0; h<16; h++) {
                matrix[d][h] = parseInt(data[i++])
            }
        }

        let houres = []
        // for (let i=0; i<=24; i++) houres[i] = i.toString()+":00";

        houres[0] = "12:00 AM"
        for (let i= 1; i<12; i++) {
            let formatted = i.toLocaleString('en-US',{
                minimumIntegerDigits: 2,
                useGrouping: false
            })
            houres[i] = formatted+":00 AM";
            houres[i+12] = formatted+":00 PM";
        }
        houres[12] = "12:00 PM"
        houres[24] = "12:00 AM"

        return (
            <div>
            <table>
                <tr>
                    <td rowSpan={50}>
                        <table className="table-houres">
                            {houres.map(h=><tr className="tr-houres">
                                <td align="Right" className="td-houres">{h}</td>
                            </tr>)}
                        </table>
                    </td>
                    {days.map(d => <td>{d}</td>)}
                </tr>
                {cells.map( (c,ci) => <tr>

                    {days.map((d,di) => <td>
                        <Cell
                            selected={matrix[di][ci]?true:false} 
                            handler={this}/>
                    </td>)}
                </tr>)}
                <tr>{days.map(d => <td></td>)}</tr>
            </table>
            </div>
        )
    }
}

export default Schedule
