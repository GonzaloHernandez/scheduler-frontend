import React from 'react';
import Cell from './Cell';

// import axios from "axios"

class Schedule extends React.Component {
    constructor(props) {
        super(props)

        // axios.get("http://localhost:3001/session/1")
        // .then( res => {
        //     this.setState({ session: res.data})
        // })
        // .catch( err => {
        //     console.log("Recovery failure")            
        // })

        const info =
            "000000000000000011111100000000001100000000000000" +
            "000000000000000011000000000000000000000000000000" +
            "000000000000000000000000000000000000000000000000" +
            "000000000000000000111100000011110000000000000000" +
            "000000000000000000000000000011110000000000000000" +
            "000000000000000000000000000000000000000000000000" +
            "000000000000000000000000000000000000000000000000"

        let matrix = Array(48).fill().map(()=>Array(7).fill())

        let i=0
        for (let c=0; c<7; c++) {
            for (let r=0; r<48; r++) {
                matrix[c][r] = parseInt(info[i++])
            }
        }

        this.state={
            data: matrix,
            starting: 14,
            size: 28,
            // For selection activity
            dragging: false,
            select: true,
            movement: false,
            previous: false,
        }
    }
    //----------------------------------------------------
    render() {
        const starting = this.state.starting
        const size = this.state.size
        const rows = Array.from(Array(size).keys())
        const titles = ["MON","TUE","WED","THU","FRI","SAT","SUN"]

        const houres = []
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

        return(
            <table>
            <tr><th></th>{titles.map((t)=><th>{t}</th>)}</tr>
            {rows.map((r,ri)=>{
                return <tr>
                <td 
                    rowSpan={2} 
                    hidden={r%2===1?true:false}
                    className={r+starting<=12||r+starting>40?"night":""}>
                    {houres[(r+starting)/2]}
                </td>
                {titles.map((c,ci)=>{
                    return <Cell handler={this} r={r} c={ci}/>
                })}
                </tr>
            })}
            </table>
        )
    }
}

export default Schedule