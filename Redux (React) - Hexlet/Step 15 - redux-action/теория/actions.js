import { createAction } from 'redux-actions';
import {uniqueId} from 'lodash';

export const action11 = createAction('STATE1_TYPE_1');
export const action12 = createAction('STATE1_TYPE_2');
export const action21 = createAction('STATE2_TYPE_1');
export const action22 = createAction(uniqueId());