import React from "react";
import "./Schedule.css";
import Cell from "./Cell"

// import axios from "axios"

const days      = [ "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday" ]
const houres    = [ "06 - 07","07 - 08","08 - 09","09 - 10","10 - 11","11 - 12","12 - 01","01 - 02","02 - 03",
                    "03 - 04","04 - 05","05 - 06","06 - 07","07 - 08","08 - 09","09 - 10"]

class Schedule extends React.Component {
    state = {
        session: "",
        dragging: false,
        select: true,
        movement: false,
        previous: false,
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
        for (let d=0; d<7; d++) {
            for (let h=0; h<16; h++) {
                matrix[d][h] = parseInt(data[i++])
            }
        }

        return (
            <table>
                <tr>
                    <td></td>
                    {days.map(d => <td>{d}</td>)}
                </tr>
                {houres.map( (h,hi) => <tr>
                    <td>{h}</td>
                    {days.map((d,di) => <td>
                        <Cell
                            selected={matrix[di][hi]?true:false} 
                            handler={this}/>
                    </td>)}
                </tr>)}
            </table>
        )
    }
}

export default Schedule
