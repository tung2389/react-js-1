import React from 'react';
const green = '#39D1B4';
const buttonstyle = {
  backgroundColor:green,
  fontSize:60
}
export class Enthused extends React.Component {
  componentWillUnmount(prevProps,prevState){
    clearInterval(this.interval);
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.props.addText(this.props.inp);
    }, 200);
  }

  render() {
    return (
      <button onClick={this.props.toggle} style={buttonstyle}>
        Stop!
      </button>
    );
  }
}