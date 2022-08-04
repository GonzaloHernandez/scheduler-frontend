import React from "react";
import "./Schedule.css";
import Cell from "./Cell"
// import axios from "axios"

const days      = [ "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday" ]
const houres    = [ "06 - 07","07 - 08","08 - 09","09 - 10","10 - 11","11 - 12","12 - 01","01 - 02","02 - 03",
                    "03 - 04","04 - 05","05 - 06","06 - 07","07 - 08","08 - 09","09 - 10"]

class Schedule extends React.Component {
    state = {
        session: ""
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
        const data = "0011110011110000 0000110000110000 0000000000000000 0000000000000000 0011000000001100"
        this.setState({session: data})
    }
    //-------------------------------------------------------------
    render() {
        const weekday = this.state.session.split(" ")

        let matrix = [
            weekday[0].split(""),
            weekday[1].split(""),
            weekday[2].split(""),
            weekday[3].split(""),
            weekday[4].split(""),
            weekday[5].split("")
        ]


        return (
            <div>
                <table>
                    <tr>
                        <td></td>
                        {days.map(d => <td>{d}</td>)}
                    </tr>
                    {houres.map( (h,hi) => <tr>
                        <td>{h}</td> 
                        {days.map((d,di) => <td>
                            {matrix[0][0]}
                        </td>)}
                    </tr>)}
                </table>
            </div>
        );
    }
}

export default Schedule
