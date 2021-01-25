import React from 'react';
import "./MarkerToggle.scss"

class MarkerToggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
    <button 
      class="marker-button"
      onClick={this.handleClick}
    >
      {this.props.showMarker ? 'Hide' : 'Show'} Current Moment
    </button>)
  }
}

export default MarkerToggle;