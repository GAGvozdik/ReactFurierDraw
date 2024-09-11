import { UpdatePointsAction, UpdateOpenCloseAction, Action } from './types';
import {Point} from './types'


export const UpdatePoints = (points: Point[][]): UpdatePointsAction => ({
  type: 'UPDATE_POINTS',
  payload: points,
});

export const UpdateOpenClose = (open: boolean): UpdateOpenCloseAction => ({
  type: 'UPDATE_OPEN',
  payload: open,
});