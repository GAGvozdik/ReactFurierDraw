import { createStore } from 'redux';
import { State, Action } from './types';

// Начальное состояние
const initialState: State = {
  points: [
    [
      [ 292, 214.7 ],
      [ 291, 211.8 ]
    ],
    [
      [ 292, 214.7 ],
      [ 291, 211.8 ]
    ]
  ],

  open: true,
  position: {x: 0, y: 0}
};

// Reducer-функция
const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_POINTS':
      return { ...state, points: action.payload };
    case 'UPDATE_OPEN':
      return { ...state, open: action.payload };
    case 'UPDATE_POSITION':
      return { ...state, position: action.payload };
    default:
      return state;
  }
};

// Создание Store с типом действия
const store = createStore<State, Action, {}>(reducer); 
export default store;