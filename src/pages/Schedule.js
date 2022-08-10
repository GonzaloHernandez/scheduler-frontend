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
            size: 30,
            today: new Date(),
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
        const today = this.state.today
        const rows = Array.from(Array(size).keys())
        const days = ["MON","TUE","WED","THU","FRI","SAT","SUN"]
        const months = ["Juanuary","February","March","April","May","June","July",
                        "August","September","Octuber","November","December"]
        const firstday = today.getDate() - today.getDay() + 1
        const lastday = (new Date(today.getFullYear(), today.getMonth(), 0)).getDate()

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

        let numberdays = []
        for (let i=0,n=1; i<7; i++) {
            if (firstday+i<=lastday)
                numberdays[i] = firstday+i
            else if (firstday+i===lastday+i)
                numberdays[i] = n++
            else
            numberdays[i] = n++
        }

        return(
            <table>
                {/***************** Titile *****************/}
                <tr>
                    <th colSpan={8} className="title">
                        {months[today.getMonth()]} / {today.getFullYear()}
                    </th>
                </tr>
                {/***************** Subtitile **************/}
                <tr><th></th>
                    {days.map((t,ti)=>
                        <th className={ti+firstday===today.getDate()?"today":""}>
                            {t} {numberdays[ti]}
                        </th>
                    )}
                </tr>
                {/***************** Rows (Houres) **********/}
                {rows.map((r,ri)=>{
                    return <tr>
                    <td 
                        rowSpan={2}
                        hidden={r%2===1?true:false}
                        className={r+starting<=12||r+starting>42?"night":""}>
                        {houres[(r+starting)/2]}
                    </td>
                    {days.map((c,ci)=>{
                        return <Cell handler={this} r={r} c={ci}/>
                    })}
                    </tr>
                })}
            </table>
        )
    }
}

export default Schedule