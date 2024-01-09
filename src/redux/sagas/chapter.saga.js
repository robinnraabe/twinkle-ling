import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* deleteChapter(action) {
  try {
    yield axios.delete(`/chapters/${action.payload[0]}`);
    yield put ({ type: 'FETCH_CHAPTERS', payload: action.payload[1] });
  } catch (error) {
    console.log('Error deleting chapter:', error);
  }
}

function* addNewChapter(action) {
  try {
      yield axios.post('/chapters', action.payload);
      yield put ({ type: 'SET_CHAPTER_DETAILS', payload: action.payload });
  } catch (error) {
      console.log('Error adding chapter:', error);
  }
}

function* fetchChapters(action) {
  try { 
    const chapterList = yield axios.get(`/chapters/${action.payload}`);
    yield put ({
      type: 'SET_CHAPTER_DETAILS',
      payload: chapterList.data
    });
  } catch (error) {
    console.log('Error fetching chapters:', error);
  }
}

function* chapterSaga() {
  yield takeLatest('DELETE_CHAPTER', deleteChapter);
  yield takeLatest('FETCH_CHAPTERS', fetchChapters);
  yield takeLatest('ADD_CHAPTER', addNewChapter);
}

export default chapterSaga;