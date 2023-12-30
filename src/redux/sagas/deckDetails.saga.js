import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updateDetails(action) {
    try {
        yield axios.put(`/deck/${action.payload.deck_id}`, action.payload);
    } catch (error) {
        console.log('Error updating deck:', error);
    }
}

function* updateDetailsSaga() {
    yield takeLatest('UPDATE_DECK', updateDetails);
}

export default updateDetailsSaga;