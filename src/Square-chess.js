import React from 'react';
import './App.css'
class Square extends React.Component{
  render(){
    return(
      <button className={this.props.value} onClick={this.props.onClick}></button>
    );
  }
}

export default Square;