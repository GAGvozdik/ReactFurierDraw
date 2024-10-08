import { 
  UpdatePointsAction, 
  UpdateOpenCloseAction, 
  UpdatePositionAction,
  UpdateIsLineCompletedAction,
  UpdateArrowWidthAction,
  UpdateLineWidthAction,
  UpdateSpeedAction,
  UpdateArrowNumbAction,
  UpdateAnimLenAction,
  UpdateContourLineWidthAction,
  UpdateIsPlayingAction,
  UpdateDefaultZoomAction,
  UpdateLastArrowEndAction,
  UpdateZoomTypeAction,
  Action 
} from './types';

import {Point} from './types'


export const UpdatePoints = (points: Point[][]): UpdatePointsAction => ({
  type: 'UPDATE_POINTS',
  payload: points,
});

export const UpdatePosition = (position: {x: number, y: number}): UpdatePositionAction => ({
  type: 'UPDATE_POSITION',
  payload: position,
});

export const UpdateArrowWidth = (arrowWidth: number): UpdateArrowWidthAction => ({
  type: 'UPDATE_ARROW_WIDTH',
  payload: arrowWidth,
});

export const UpdateLineWidth = (lineWidth: number): UpdateLineWidthAction => ({
  type: 'UPDATE_LINE_WIDTH',
  payload: lineWidth,
});

export const UpdateSpeed = (updateSpeed: number): UpdateSpeedAction => ({
  type: 'UPDATE_SPEED',
  payload: updateSpeed,
});

export const UpdateArrowNumb = ( arrowNumb: number): UpdateArrowNumbAction => ({
  type: 'UPDATE_ARROW_NUMB',
  payload: arrowNumb,
});

export const UpdateAnimLen = (animLen: number): UpdateAnimLenAction => ({
  type: 'UPDATE_ANIM_LEN',
  payload: animLen,
});

export const UpdateContourLineWidth = (contourLineWidth: number): UpdateContourLineWidthAction => ({
  type: 'UPDATE_CONTOUR_LINE_WIDTH',
  payload: contourLineWidth,
});

export const UpdateIsPlaying = (isPlaying: boolean): UpdateIsPlayingAction => ({
  type: 'UPDATE_IS_PLAYING',
  payload: isPlaying,
});

export const UpdateDefaultZoom = (defaultZoom: boolean): UpdateDefaultZoomAction => ({
  type: 'UPDATE_DEFAULT_ZOOM',
  payload: defaultZoom,
});

export const UpdateOpenClose = (open: boolean): UpdateOpenCloseAction => ({
  type: 'UPDATE_OPEN',
  payload: open,
});

export const UpdateIsLineCompleted = (isLineCompleted: boolean): UpdateIsLineCompletedAction => ({
  type: 'UPDATE_IS_LINE_COMPLETED',
  payload: isLineCompleted,
});

export const UpdateLastArrowEnd = (lastArrowEnd: {x: number, y: number}): UpdateLastArrowEndAction => ({
  type: 'UPDATE_LAST_ARROW_END',
  payload: lastArrowEnd,
});


export const UpdateZoomType = (zoomType: "Zoom to center" | "Zoom to mouse" | "Zoom to last arrow"): UpdateZoomTypeAction => ({
  type: 'UPDATE_ZOOM_TYPE',
  payload: zoomType,
});

