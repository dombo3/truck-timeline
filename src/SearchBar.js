import React from 'react';
import "./Searchbar.scss"

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            id="search-bar" 
            type="text" 
            placeholder="Search for Truck ID"
            value={this.props.filterText}
            onChange={this.handleChange}
            />
        </form>
      </div>
      )
  }
}

export default Searchbar;