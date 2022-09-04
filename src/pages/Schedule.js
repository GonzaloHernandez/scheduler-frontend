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

        const info ="16578900,16603758,16603740,16603794,16603776,16603830,16603812,16603866,16603848,16603902,16603884,16603938,16603920,16603974,16603956,16604010,16603992,16604046,16604028,16604082,16604064,16604118,16604100,16604154,16604136,16604190,16604172,16604226"
            
        let array = []
        info.split(",").map( (t,i) => array[i]=parseInt(t))

        const currentdate = new Date()

        this.state={
            data        : array,
            starting    : 14,
            size        : 30,
            firstdate   : new Date(currentdate.setDate(currentdate.getDate()-currentdate.getDay() + 1)),
            // For selection activity
            dragging    : false,
            select      : true,
            movement    : false,
            previous    : false,
        }

        this.touchx=0
        this.touchy=0
    }
    //----------------------------------------------------
    render() {
        const starting  = this.state.starting
        const size      = this.state.size
        const firstdate = this.state.firstdate
        const today     = new Date()
        const rows      = Array.from(Array(size).keys())
        const days      = [ "MON","TUE","WED","THU","FRI","SAT","SUN" ]
        const months    = [ "Juanuary","February","March","April","May","June","July",
                            "August","September","Octuber","November","December" ]
        const lastday   = (new Date(firstdate.getFullYear(), firstdate.getMonth(), 0)).getDate()

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
            if (firstdate.getDate()+i<=lastday)
                numberdays[i] = firstdate.getDate()+i
            else if (firstdate.getDate()+i===lastday+i)
                numberdays[i] = n++
            else
            numberdays[i] = n++
        }

        return(
            <table
                onWheel={(e)=>{
                    if (e.deltaY<0 && starting>1) {
                        this.setState({starting: starting-2})
                        }
                    else if (e.deltaY>0 && starting<48-size) {
                        this.setState({starting: starting+2})
                    }
                }}
                onTouchStart={(e)=>{
                    this.touchy = e.targetTouches[0].clientY
                }}
                onTouchMove={(e)=>{
                    if (e.targetTouches.length === 2) return
                        if (e.targetTouches[0].clientY > this.touchy+10 && starting>1) {
                            this.setState({starting: starting-2})
                        } else if (e.targetTouches[0].clientY < this.touchy-10 && starting<48-size) {
                            this.setState({starting: starting+2})
                        }
                        this.touchy = e.targetTouches[0].clientY
                    // }
                }}
            >
                {/***************** Titile *****************/}
                <tr>
                    <th colSpan={8} className="title">
                        <button
                            onClick={(e)=>{
                                this.setState({firstdate   : new Date(firstdate.setDate(firstdate.getDate()-7))})
                            }}
                        > {"<"} </button>
                        ... {months[firstdate.getMonth()]} / {firstdate.getFullYear() } ...
                        <button
                            onClick={(e)=>{
                                this.setState({firstdate   : new Date(firstdate.setDate(firstdate.getDate()+7))})
                            }}
                        > {">"} </button>
                    </th>
                </tr>
                {/***************** Subtitile **************/}
                <tr><th></th>
                    {days.map((t,ti)=>
                        <th className={ti+firstdate.getDate()===today.getDate()?"today":""}>
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

                        const currentdate   = new Date(firstdate)
                        currentdate.setDate(firstdate.getDate()+ci)
                        const y         = currentdate.getFullYear()
                        const m         = currentdate.getMonth()
                        const d         = currentdate.getDate()
                        const h         = (starting+ri)/2
                        const u         = (starting+ri)%2

                        const txtdate   = (y + "-" + ("0"+m).slice(-2) + "-" + ("0"+d).slice(-2) + "T" + 
                                            ("0"+parseInt(h)).slice(-2) + ":" + (u===0?"00":"30") + ":00")
                        const value     = Date.parse(txtdate)/100000

                        return <Cell handler={this} r={ri} c={ci} value={value}/>
                    })}
                    </tr>
                })}
            </table>
        )
    }
}

export default Schedule