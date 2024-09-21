
export interface State {
    points: Point[][];
    open: boolean;
    position: {x: number, y: number};
    isLineCompleted: boolean
    arrowWidth: number,
    lineWidth: number,
    updateSpeed: number,
    arrowNumb: number,
    isPlaying: boolean,
    animLen: number,
    contourLineWidth: number,
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

export interface UpdatePositionAction extends Action {
  type: 'UPDATE_POSITION';
  payload: {x: number, y: number};
  [key: string]: any;  
}


export interface UpdateOpenCloseAction extends Action {
  type: 'UPDATE_OPEN';
  payload: boolean;
  [key: string]: any; 
}

export interface UpdateIsLineCompletedAction extends Action {
  type: 'UPDATE_IS_LINE_COMPLETED';
  payload: boolean;
  [key: string]: any; 
}

export interface UpdateArrowWidthAction extends Action {
  type: 'UPDATE_ARROW_WIDTH';
  payload: number;
  [key: string]: any; 
}

export interface UpdateLineWidthAction extends Action {
  type: 'UPDATE_LINE_WIDTH';
  payload: number;
  [key: string]: any; 
}

export interface UpdateSpeedAction extends Action {
  type: 'UPDATE_SPEED';
  payload: number;
  [key: string]: any; 
}

export interface UpdateArrowNumbAction extends Action {
  type: 'UPDATE_ARROW_NUMB';
  payload: number;
  [key: string]: any; 
}

export interface UpdateAnimLenAction extends Action {
  type: 'UPDATE_ANIM_LEN';
  payload: number;
  [key: string]: any; 
}

export interface UpdateContourLineWidthAction extends Action {
  type: 'UPDATE_CONTOUR_LINE_WIDTH';
  payload: number;
  [key: string]: any; 
}

export interface UpdateIsPlayingAction extends Action {
  type: 'UPDATE_IS_PLAYING';
  payload: boolean;
  [key: string]: any; 
}




  export type Point = number[];