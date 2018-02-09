import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}

const isKitten = cat => cat.months < 7;
const getName = cat => cat.name;
const getKittenNames = cats =>
  cats.filter(isKitten)
    .map(getName);

const cats = [
  { name: 'Mojo',    months: 84 },
  { name: 'Mao-Mao', months: 34 },
  { name: 'Waffles', months: 4 },
  { name: 'Pickles', months: 6 }
];

const kittens = getKittenNames(cats);
console.log(kittens);

// simple if
const isGreaterThan5 = x => x > 5 ? 'Yep' : 'Nope';

// examples:
// // ternary
// function saveCustomer(customer) {
//   return isCustomerValid(customer)
//     ? database.save(customer)
//     : alert('customer is invalid')
// }
// // ES6 style
// const saveCustomer = customer =>
//   isCustomerValid(customer)
//     ? database.save(customer)
//     : alert('customer is invalid')

const getKittens = (filter, map, l) =>
  l.reduce((arr, cat) => filter(cat)
    ? arr.concat(map(cat)) : arr, []);

console.log(getKittens(isKitten, getName, kittens));

const takeFirst = (limit, predicate, list, i = 0, newList = []) => {
  const isDone = limit <= 0 || i >= list.length;
  const isMatch = isDone ? undefined : predicate(list[i]);

  return isDone  ? newList :
    isMatch ? takeFirst(limit - 1, predicate, list, i + 1, [...newList, list[i]])
      : takeFirst(limit, predicate, list, i + 1, newList);
};

const first5Kittens = takeFirst(5, isKitten, cats);
console.log(first5Kittens);

// SWITCH
// from redux site
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state;
  }
}
// quite nice
const switchcase = cases => defaultCase => key =>
  cases.hasOwnProperty(key) ? cases[key] : defaultCase

const counter0 = (state = 0, action) =>
  switchcase({
    'INCREMENT': state + 1,
    'DECREMENT': state -1
  })(state)(action.type);


// ...better
const switchcaseF = cases => defaultCase => key =>
  switchcase(cases)(defaultCase)(key)()

const counter1 = (state = 0, action) =>
  switchcaseF({
    'INCREMENT': () => state + 1,
    'DECREMENT': () => state -1
  })(() => state)(action.type);


// ... best - can be optional

const executeIfFunction = f =>
  f instanceof Function ? f() : f
const switchcaseF2 = cases => defaultCase => key =>
  executeIfFunction(switchcase(cases)(defaultCase)(key))

const counter2 = (state = 0, action) =>
  switchcaseF2({
    'INCREMENT': () => state + 1,
    'DECREMENT': () => state -1
  })(state)(action.type);
