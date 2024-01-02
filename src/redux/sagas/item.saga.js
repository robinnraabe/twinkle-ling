import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* addNewItem(action) {
  console.log(action.payload);
  try {
    yield axios.post('/items', action.payload);
    yield put ({ type: 'FETCH_ITEMS', payload: action.payload.chapter_id });
  } catch (error) {
    console.log('Error adding item:', error);
  }
}

function* deleteItem(action) {
  try {
    yield axios.delete(`/items/${action.payload[0]}`);
    yield put ({ type: 'FETCH_ITEMS', payload: action.payload[1] });
  } catch (error) {
    console.log('Error deleting item:', error);
  }
}

function* fetchItems(action) {
  try { 
    const itemList = yield axios.get(`/items/${action.payload}`);
    yield put ({
      type: 'SET_ITEM_DETAILS',
      payload: itemList.data
    });
  } catch (error) {
    console.log('Error fetching items:', error);
  }
}

function* itemSaga() {
  yield takeLatest('ADD_ITEM', addNewItem);
  yield takeLatest('DELETE_ITEM', deleteItem);
  yield takeLatest('FETCH_ITEMS', fetchItems);
}

export default itemSaga;

