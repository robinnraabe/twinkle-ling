import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addNewItem(action) {
    try {
      yield axios.post('/items', action.payload);
    } catch (error) {
      console.log('Error adding item:', error);
    }
}

function* itemSaga() {
    yield takeLatest('ADD_ITEM', addNewItem);
}

export default itemSaga;