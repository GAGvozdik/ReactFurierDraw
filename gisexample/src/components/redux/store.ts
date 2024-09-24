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
  position: {x: 0, y: 0},
  isLineCompleted: true,
  arrowWidth: 1.4,
  lineWidth: 0.7,      
  updateSpeed: 20,
  arrowNumb: 20,
  isPlaying: false,
  animLen: 3999,
  contourLineWidth: 1,
  defaultZoom: true,
  lastArrowEnd: {x: 0, y: 0},
  zoomType: "Zoom to center",
  
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

    case 'UPDATE_IS_LINE_COMPLETED':
      return { ...state, isLineCompleted: action.payload };

    case 'UPDATE_ARROW_WIDTH':
      return { ...state, arrowWidth: action.payload };

    case 'UPDATE_LINE_WIDTH':
      return { ...state, lineWidth: action.payload };

    case 'UPDATE_SPEED':
      return { ...state, updateSpeed: action.payload };

    case 'UPDATE_ARROW_NUMB':
      return { ...state, arrowNumb: action.payload };

    case 'UPDATE_ANIM_LEN':
      return { ...state, animLen: action.payload };

    case 'UPDATE_CONTOUR_LINE_WIDTH':
      return { ...state, contourLineWidth: action.payload };

    case 'UPDATE_IS_PLAYING':
      return { ...state, isPlaying: action.payload };

    case 'UPDATE_DEFAULT_ZOOM':
      return { ...state, defaultZoom: action.payload };

      case 'UPDATE_LAST_ARROW_END':
      return { ...state, lastArrowEnd: action.payload };

      case 'UPDATE_ZOOM_TYPE':
      return { ...state, zoomType: action.payload };

    default:
      return state;
  }
};

const store = createStore<State, Action, {}>(reducer); 

export default store;

// arrowWidth = 1.4, // Значение по умолчанию
// lineWidth = 0.7,      // Значение по умолчанию
// updateSpeed = 20,
// arrowNumb = 20,
// isPlaying = false,
// animLen = 2000,
// contourLineWidth = 1,

// UpdateArrowWidthAction
// UpdateLineWidthAction
// UpdateSpeedAction
// UpdateArrowNumbAction
// UpdateAnimLenAction
// UpdateContourLineWidthAction
// UpdateIsPlayingAction

// UpdateArrowWidth
// UpdateLineWidth
// UpdateSpeed
// UpdateArrowNumb
// UpdateAnimLen
// UpdateContourLineWidth
// UpdateIsPlaying

// 'UPDATE_ARROW_WIDTH'
// 'UPDATE_LINE_WIDTH'
// 'UPDATE_SPEED'
// 'UPDATE_ARROW_NUMB'
// 'UPDATE_ANIM_LEN'
// 'UPDATE_CONTOUR_LINE_WIDTH'
// 'UPDATE_IS_PLAYING'




