import Timeline from 'react-calendar-timeline';
import trucktimeline from './trucktimeline.json';
import moment from 'moment';
import {buildGroups, buildItems} from './utils.js';
import 'react-calendar-timeline/lib/Timeline.css'

function App() {
  const {trucks, orders} = trucktimeline;
  const groups = buildGroups(trucks);
  const items = buildItems(trucks, orders);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Truck Timeline</h1>
      </header>
      <main>
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={moment().add(-12, 'hour')}
          defaultTimeEnd={moment().add(12, 'hour')}
        />
      </main>
    </div>
  );
}

export default App;
