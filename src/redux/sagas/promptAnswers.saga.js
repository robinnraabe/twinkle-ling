import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPrompts() {
  try { 
    const promptList = yield axios.get(`/prompts`);
    yield put ({
      type: 'SET_PROMPTS',
      payload: promptList.data
    });
  } catch (error) {
    console.log('Error fetching prompts:', error);
  }
}

function* fetchAnswers(action) {
    try { 
      const answerList = yield axios.get(`/prompts/${action.payload}`);
      yield put ({
        type: 'SET_ANSWERS',
        payload: answerList.data
      });
    } catch (error) {
      console.log('Error fetching answers:', error);
    }
  }

function* promptAnswerSaga() {
  yield takeLatest('FETCH_PROMPTS', fetchPrompts);
  yield takeLatest('FETCH_ANSWERS', fetchAnswers);
}

export default promptAnswerSaga;