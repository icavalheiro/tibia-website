import React, {Component} from "react";
import "./style.css";

export class Content extends Component{
    render(){
        return (
            <div className="content col-8">
                {this.props.children}    
            </div>
        )
    }
}