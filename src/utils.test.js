import {buildGroups, buildItems, findGroupByOrderId} from './utils.js';
import moment from 'moment';
import {DATEFORMAT} from './constants';

test('create group from trucks with one item', () => {
  const truckName = "OOF692";
  const input = [{ "name": truckName, "assignedOrderId": [ "order1","order2" ]}];
  
  const groups = buildGroups(input);
  
  const expected = [{id: truckName, title: `Truck-${truckName}`}]
  
  expect(groups).toStrictEqual(expected);
});

test('create groups from trucks with more item', () => {
  const truckName1 = "OOF692";
  const truckName2 = "KYX004";
  const truckName3 = "CDC185";

  const trucks = [
      { "name": truckName1, "assignedOrderId": [ "order1","order2" ]},
      { "name": truckName2, "assignedOrderId": [ "order3","order4","order5","order6","order7","order8" ]},
      { "name": truckName3, "assignedOrderId": [ "order9","order10","order11" ]},
    ];
  
  const groups = buildGroups(trucks);
  
  const expected = [
    {id: truckName1, title: `Truck-${truckName1}`},
    {id: truckName2, title: `Truck-${truckName2}`},
    {id: truckName3, title: `Truck-${truckName3}`},
  ]
  
  expect(groups).toStrictEqual(expected);
});

test('find group/truckName by orderId', () => {
  const orderId = "order9";
  const truckName = "CDC185";

  const trucks = [
    { "name": "OOF692", "assignedOrderId": [ "order1","order2" ]},
    { "name": "KYX004", "assignedOrderId": [ "order3","order4","order5","order6","order7","order8" ]},
    { "name": truckName, "assignedOrderId": [ orderId,"order10","order11" ]},
  ];

  const group = findGroupByOrderId(trucks, orderId);

  expect(group).toBe(truckName);
})

test('handle misisng orderId', () => {
  const missingOrderId = "order1";

  const trucks = [
    { "name": "OOF692", "assignedOrderId": [ "order2" ]},
    { "name": "KYX004", "assignedOrderId": [ "order3","order4","order5","order6","order7","order8" ]},
    { "name": "CDC185", "assignedOrderId": [ "order9","order10","order11" ]},
  ];

  const group = findGroupByOrderId(trucks, missingOrderId);
  const emptyString = "";

  expect(group).toBe(emptyString);
})

test('create items from trucktimeline', () => {
  const order1 = "order1";
  const order2 = "order2";
  const order3 = "order3";
  const truck1 = "OOF692";
  const truck2 = "KYX004";
  const start_time = "2020.02.01 10:00:00";
  const end_time = "2020.02.01 18:35:00";
  
  const {trucks, orders} = {
    "trucks": [
        { "name": truck1, "assignedOrderId": [order1, order2]},
        { "name": truck2, "assignedOrderId": [order3]},
    ],
    "orders": [
        { "id": order1, "from": start_time, "to": end_time },
        { "id": order2, "from": start_time, "to": end_time },
        { "id": order3, "from": start_time, "to": end_time },
    ]
  }

  const item1 = createItem(order1, truck1, order1, moment(start_time,DATEFORMAT), moment(end_time, DATEFORMAT));
  const item2 = createItem(order2, truck1, order2, moment(start_time,DATEFORMAT), moment(end_time, DATEFORMAT));
  const item3 = createItem(order3, truck2, order3, moment(start_time,DATEFORMAT), moment(end_time, DATEFORMAT));

  const items = [item1, item2, item3];

  expect(buildItems(trucks, orders)).toStrictEqual(items);

});

const createItem = function(id, group, title, start_time, end_time) {
  return {
    id: id,
    group: group,
    title: title,
    start_time: start_time,
    end_time: end_time,
  }
}