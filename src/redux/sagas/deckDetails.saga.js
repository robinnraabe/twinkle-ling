import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* updateDetails(action) {
    try {
        yield axios.put(`/deck/${action.payload.deck_id}`, action.payload);
    } catch (error) {
        console.log('Error updating deck:', error);
    }
}

function* addNewDeck(action) {
    try {
        yield axios.post('/deck', action.payload);
        console.log('axios posted');
        yield put ({ type: 'SET_DECK_DETAILS', payload: action.payload });
        console.log('saga finished');
    } catch (error) {
        console.log('Error adding deck:', error);
    }
}

function* updateDetailsSaga() {
    yield takeLatest('UPDATE_DECK', updateDetails);
    yield takeLatest('ADD_DECK', addNewDeck);
}

export default updateDetailsSaga;
