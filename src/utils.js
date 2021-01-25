import moment from 'moment';
import {DATEFORMAT} from './constants';

const buildGroups = function (trucks) {
  return trucks.map(({name}) => ({id: name, title: `${name}`}));
}

const buildItems = function(trucks, orders) {
  return orders.map(({id, from, to}) =>
    ({
      id: id,
      group: findGroupByOrderId(trucks, id),
      title: `${id}`,
      start_time: moment(from, DATEFORMAT),
      end_time: moment(to, DATEFORMAT),
      canMove: false,
      canResize: false,
      canChangeGroup: false,
      itemProps: {
        style: {
          background: "#595549",
          borderRadius: "6px",
          border: "3px solid #D0FC30",
          overflow: "hidden",
          textAlign: "center",
        }
      }
    })
  );
}

const findGroupByOrderId = function(trucks, orderId) {
  let truck = trucks.find(({assignedOrderId}) => assignedOrderId.includes(orderId));
  return truck ? truck.name : "";
}

export {buildGroups, buildItems, findGroupByOrderId}