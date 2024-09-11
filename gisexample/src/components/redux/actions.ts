import { UpdatePointsAction, UpdateOpenCloseAction, UpdatePositionAction, Action } from './types';
import {Point} from './types'


export const UpdatePoints = (points: Point[][]): UpdatePointsAction => ({
  type: 'UPDATE_POINTS',
  payload: points,
});

export const UpdatePosition = (position: {x: number, y: number}): UpdatePositionAction => ({
  type: 'UPDATE_POSITION',
  payload: position,
});

export const UpdateOpenClose = (open: boolean): UpdateOpenCloseAction => ({
  type: 'UPDATE_OPEN',
  payload: open,
});