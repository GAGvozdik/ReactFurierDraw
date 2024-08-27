import { UpdatePointsAction, Action } from './types';
import {Point} from './types'


export const UpdatePoints = (points: Point[][]): UpdatePointsAction => ({
  type: 'UPDATE_POINTS',
  payload: points,
});