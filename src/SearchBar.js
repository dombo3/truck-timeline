import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input id="searchbar" type="text" placeholder="Search for Trucks"/>
        </form>
      </div>
      )
  }
}

export default SearchBar;