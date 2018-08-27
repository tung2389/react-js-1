import React from 'react';
import './App.css'
class Square extends React.Component{
  render(){
    return(
      <button className={this.props.but} onClick={this.props.onClick} disabled={this.props.ending}>{this.props.value}</button>
    );
  }
}

export default Square;