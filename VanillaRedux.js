import { createStore, combineReducers } from 'redux';

console.clear();

// People dropping off a form (Action Creators)
const createPolicy = (name, amount) => {
  // Action object (a form in our analogy)
  return {
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: amount,
    },
  };
};

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name,
    },
  };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect,
    },
  };
};

// Reducers (Departments!)
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    // we care about this action (FORM!)
    return [...oldListOfClaims, action.payload];
  }

  //we don't care about the action (form!!)
  return oldListOfClaims;
};

const accounting = (bagOfMoney = 100000, action) => {
  if (action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amountOfMoneyToCollect;
  }

  return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === 'DELETE_POLICY') {
    return listOfPolicies.filter((name) => name !== action.payload.name);
  }

  return listOfPolicies;
};

// To wire up our reducers, we use combineReducers function
const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies,
});

const store = createStore(ourDepartments);

// store object represents our entire Redux application
// console.log(store);

const action = createPolicy('Stillhome', 60);
// console.log(action);
store.dispatch(action);
console.log(store.getState());
