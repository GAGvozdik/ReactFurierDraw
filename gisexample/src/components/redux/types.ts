
export interface State {
    points: Point[][];
  }
  
  export interface Action {
    type: string;
    payload?: any;
  }
  
  export interface UpdatePointsAction extends Action {
    type: 'UPDATE_POINTS';
    payload: Point[][];
    [key: string]: any; // Добавляем индексный тип 
  }
  
  export type Point = number[];