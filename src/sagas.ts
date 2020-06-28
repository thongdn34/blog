import { all } from "redux-saga/effects";
import { watchGetArticlesPosts } from "./pages/Feeds/sagas";

export default function* rootSaga() {
  yield all([watchGetArticlesPosts()]);
}
