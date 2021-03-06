import { put, takeEvery, call } from "redux-saga/effects";
import {
  getArticleList,
  getArticleListSuccess,
  getArticleListFail,
} from "./actions";
import articlesService from "./services/api/articlesService";
import { updateEntities } from "../../redux/entities/actions";
import { normalizeData, createInjectableSaga } from "../../redux/redux";
import { EntitiesName } from "../../redux/entities/constants";
import { stateContext, ArticlesRequest } from "./state";
import { Action } from "redux-actions";

function* getArticlesSagas(action: Action<ArticlesRequest>) {
  try {
    const res = yield call(articlesService.getArticles, action.payload);
    const { result, entities } = normalizeData(
      res,
      EntitiesName.articles,
      "slug"
    );

    console.log(result,'result')
    yield put(updateEntities(entities));

    yield put(
      getArticleListSuccess({
        data: result.articles,
        total: result.articlesCount,
      })
    );
  } catch (error) {
    yield put(getArticleListFail(error));
  }
}

export function* watchGetArticlesPosts() {
  yield takeEvery(getArticleList().type, getArticlesSagas);
}

export const articlesSaga = createInjectableSaga(
  stateContext,
  watchGetArticlesPosts
);
