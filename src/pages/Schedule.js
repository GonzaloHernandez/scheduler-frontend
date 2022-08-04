import React from "react";
import "./Schedule.css";

const days      = [ "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday" ]
const houres    = [ "06-07","07-08","08-09","09-10","10-11","11-12","12-01","01-02","02-03",
                    "03-04","04-05","05-06","06-07","07-08","08-09","09-10"]

class Schedule extends React.Component {
    
    //---------------------------------------------------------------
    render() {
        return (
            <table>
                <tr>
                    <td></td>
                    {days.map(d => <td>{d}</td>)}
                </tr>
                {houres.map(h => <tr><td>{h}</td>{days.map(() => <td><button>.</button></td>)}</tr>)}
            </table>
        );
    }
}

export default Schedule
