
export interface State {
    points: Point[][];
    open: boolean;
  }
  
export interface Action {
  type: string;
  payload?: any;
}

export interface UpdatePointsAction extends Action {
  type: 'UPDATE_POINTS';
  payload: Point[][];
  [key: string]: any;  
}


export interface UpdateOpenCloseAction extends Action {
  type: 'UPDATE_OPEN';
  payload: boolean;
  [key: string]: any; 
}

  export type Point = number[];