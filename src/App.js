import React from 'react';
import Timeline from 'react-calendar-timeline';
import SearchBar from './SearchBar';
import trucktimeline from './trucktimeline.json';
import moment from 'moment';
import { buildGroups, buildItems } from './utils.js';
import 'react-calendar-timeline/lib/Timeline.css'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      filterText: '',
    }

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState((state) => ({filterText: filterText}));
  }

  render() {
    const { trucks, orders } = trucktimeline;
    const groups = buildGroups(trucks);
    const items = buildItems(trucks, orders);
    
    const filteredGroups = groups.filter(group => group.id.indexOf(this.state.filterText) > -1);
    
    return (
      <div className="App">
        <header className="App-header">
          <h1>Truck Timeline</h1>
        </header>
        <main>
          <SearchBar filterText={this.state.filterText} onFilterTextChange={this.handleFilterTextChange}/>
          <Timeline
            groups={filteredGroups}
            items={items}
            defaultTimeStart={moment().add(-12, 'hour')}
            defaultTimeEnd={moment().add(12, 'hour')}
          />
        </main>
      </div>
    );
  }
}

export default App;
