import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchLanguages() {
  try { 
    const languageList = yield axios.get('/api/languages');
    yield put ({
      type: 'SET_LANGUAGES',
      payload: languageList.data
    });
  } catch (error) {
    console.log('fetchLanguages error:', error);
  }
}

function* languageSaga() {
  yield takeLatest('FETCH_LANGUAGES', fetchLanguages);
}
  
export default languageSaga;

