

import { createStore } from 'redux';
import reducer from '../features/reducer';

export const store = createStore(reducer);