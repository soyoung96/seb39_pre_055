import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import {
  detailReducer,
  questionReducer,
  tagReducer,
  testReducer,
  userReducer,
} from '../reducers';
import { searchReducer } from '../reducers/searchSlice';

const rootReducer = combineReducers({
  test: testReducer,
  tag: tagReducer,
  question: questionReducer,
  user: userReducer,
  detail: detailReducer,
  search: searchReducer,
  // 앞으로 추가하게 될 전역 상태는 관심사에 따라 파일을 분리한 후 이곳에 추가해주세요.
  // user: userReducer,  -> user정보에 관련된 전역 상태
  // mountain: mountainReducer,  -> 산과 관련된 전역 상태
  // review: reviewReducer, -> review와 관련된 전역 상태
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  });
};
// export const store = configureStore({
//   reducer: {
//     test: testReducer,
//     tag: tagReducer,
//     question: questionReducer,
//     user: userReducer,
//     detail: detailReducer,
//     search: searchReducer,
//     // 앞으로 추가하게 될 전역 상태는 관심사에 따라 파일을 분리한 후 이곳에 추가해주세요.
//     // user: userReducer,  -> user정보에 관련된 전역 상태
//     // mountain: mountainReducer,  -> 산과 관련된 전역 상태
//     // review: reviewReducer, -> review와 관련된 전역 상태
//   },
//   devTools: process.env.NODE_ENV !== 'production', // 크롬 익스텐션 Redux DevTools 설치 해주세요.
// });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

// component에서 action을 dispatch 하고 싶다면 useAppDispatch를 사용하세요.
export const useAppDispatch: () => AppDispatch = useDispatch;
// component에서 store의 상태를 사용하고 싶다면 useAppSelector를 사용하세요.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 비동기 action에서 사용합니다. (createAsyncThunk)
export type CreateAsyncThunkTypes = {
  dispatch: AppDispatch;
  state: RootState;
  rejectValue: string;
};
