import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* setUserSettings(action) {
    try {
        yield axios.put(`/api/user/settings`, action.payload);
    } catch (error) {
        console.log('Error updating user settings:', error);
    }
}

function* userSettingsSaga() {
    yield takeLatest('SET_USER_SETTINGS', setUserSettings);
}

export default userSettingsSaga;