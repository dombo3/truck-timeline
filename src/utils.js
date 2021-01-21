import moment from 'moment';
import {DATEFORMAT} from './constants';

const buildGroups = function (trucks) {
  return trucks.map(({name}) => ({id: name, title: `Truck-${name}`}));
}

const buildItems = function(trucks, orders) {
  return orders.map(({id, from, to}) =>
    ({
      id: id,
      group: findGroupByOrderId(trucks, id),
      title: `${id}`,
      start_time: moment(from, DATEFORMAT),
      end_time: moment(to, DATEFORMAT),
    })
  );
}

const findGroupByOrderId = function(trucks, orderId) {
  let truck = trucks.find(({assignedOrderId}) => assignedOrderId.includes(orderId));
  return truck ? truck.name : "";
}

export {buildGroups, buildItems, findGroupByOrderId}