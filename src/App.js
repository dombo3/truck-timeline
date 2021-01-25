import React from 'react';
import Timeline, { DateHeader, TimelineHeaders } from 'react-calendar-timeline';
import Searchbar from './Searchbar';
import trucktimeline from './trucktimeline.json';
import moment from 'moment';
import { buildGroups, buildItems } from './utils.js';
import 'react-calendar-timeline/lib/Timeline.css';
import {CURRENT_MOMENT} from './constants.js';

import "./App.scss";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      filterText: '',
    }

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleItemClick = this.handleItemSelect.bind(this);
  }

  handleItemSelect(itemId, _, time) {
    alert(itemId);
  }

  handleFilterTextChange(filterText) {
    this.setState((state) => ({filterText: filterText}));
  }

  groupRenderer = ({ group }) => {
    return (
      <div className="group" style={{textAlign:"center"}}>
        <p className="title" style={{fontWeight: "700", margin: "0"}}>Truck-{group.title}</p>
      </div>
    )
  }

  render() {
    const { trucks, orders } = trucktimeline;
    const groups = buildGroups(trucks);
    const items = buildItems(trucks, orders);
    
    const filteredGroups = groups.filter(group => group.id.toLowerCase().indexOf(this.state.filterText.toLocaleLowerCase()) > -1);
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Truck Timeline</h1>
          <Searchbar
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
        </header>
        <main>
          <Timeline
            groups={filteredGroups}
            items={items}
            defaultTimeStart={moment(CURRENT_MOMENT).add(-12, 'hour')}
            defaultTimeEnd={moment(CURRENT_MOMENT).add(12, 'hour')}
            onItemSelect={this.handleItemSelect}
            groupRenderer={this.groupRenderer}
            lineHeight={120}
          >
          <TimelineHeaders
            style={{border:"none", fontWeight:"700", backgroundColor: "transparent"}}
            calendarHeaderStyle= {{border: "none"}}
          >
            <DateHeader
            unit="primaryHeader"
            style={{background: "transparent", textAlign: "center"}}
            intervalRenderer={({ getIntervalProps, intervalContext, data }) => {
                return <div {...getIntervalProps()} onClick={null}>
                          {intervalContext.intervalText}
                      </div>
              }}
            />
            <DateHeader
              labelFormat={([startTime, endTime], unit, labelWidth, formatOptions) => {
                if (labelWidth > 40) {
                  return moment(startTime).format("HH:00");
                } else {
                  return moment(startTime).format("HH");
                }
              }}
              intervalRenderer={({ getIntervalProps, intervalContext, data }) => {
                return (
                <div 
                  {...getIntervalProps()}
                  onClick={null}
                  style={{...getIntervalProps().style, fontSize: "0.8em", textAlign: "center"}}
                >
                  {intervalContext.intervalText}
                </div>)
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
