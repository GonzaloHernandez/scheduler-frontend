import React from "react";
import Schedule from "./Schedule";
// import "./Main.css"
if (window.innerWidth <500) {
   import("./Main-mobile.css") 
} else {
    import("./Main.css") 
}


class Main extends React.Component {
    render() {
        return(
            <table>
                <tr>
                    <td><Schedule/></td>
                </tr>
                <tr>
                    <td><button>Save changes</button></td>
                </tr>
            </table>
        )
    }
}

export default Main