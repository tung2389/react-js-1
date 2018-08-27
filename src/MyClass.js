import React from 'react';

export class My_Class extends React.Component {
  render() {
    const src = this.props.src;
    return (
      <div>
        <h1>My class</h1>
        <img src={src}  width="1000" height="400" align="center" valign="center"/>
      </div>
    );
  }
}