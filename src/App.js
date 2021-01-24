import React from 'react';
import Timeline, { DateHeader, TimelineHeaders } from 'react-calendar-timeline';
import SearchBar from './SearchBar';
import trucktimeline from './trucktimeline.json';
import moment from 'moment';
import { buildGroups, buildItems } from './utils.js';
import 'react-calendar-timeline/lib/Timeline.css';
import {CURRENT_MOMENT} from './constants.js';

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
          <SearchBar filterText={this.state.filterText} onFilterTextChange={this.handleFilterTextChange}/>
        </header>
        <main>
          <Timeline
            groups={filteredGroups}
            items={items}
            defaultTimeStart={moment(CURRENT_MOMENT).add(-12, 'hour')}
            defaultTimeEnd={moment(CURRENT_MOMENT).add(12, 'hour')}
          >
          <TimelineHeaders>
            <DateHeader
            unit="primaryHeader"
            intervalRenderer={({ getIntervalProps, intervalContext, data }) => {
                return <div {...getIntervalProps()} class="rct-dateHeader" onClick={null}>
                  {intervalContext.intervalText}
                </div>
              }}
            />
            <DateHeader
              intervalRenderer={({ getIntervalProps, intervalContext, data }) => {
                return <div {...getIntervalProps()} class="rct-dateHeader" onClick={null}>
                  {intervalContext.intervalText}
                </div>
              }}
            />  
          </TimelineHeaders>
          </Timeline>
        </main>
      </div>
    );
  }
}

export default App;
