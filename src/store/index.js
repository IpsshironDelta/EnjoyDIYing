import { createStore }  from "redux";
import {UPDATE_FORM,
        UPDATE_RECIPE,} from '../actions/memberAction';

const initialState = {
  address          : "",
  addressErrorMS   : "",
  password1        : "",
  password2        : "",
  passwordErrorMS  : "",
  nicknameErrorMS  : "",
  location         : "",
  locationErrorMS  : "",
  loginUserUID     : "",  // ログインユーザーのUID
  displayName      : "",  // ユーザー名
  recipetitle      : "",  // 作品タイトル
  category         : "",  // 大項目カテゴリー
  detail           : "",  // 小項目
  productionCost   : "",  // 制作費用
  productionPeriod : "",  // 制作期間
  productionMemo   : "",  // 作品メモ
  createdAt        : "",  // 投稿日時
  recipeimage      : "",  // 作品画像
  documentID       : "",  // firebaseのドキュメントID格納用
  recipeUID        : "",  // recipe-image-uidを格納する
  commentCount     : "",  // コメントの数
  photoURL         : "",  
  memo             : "",
  photoFileData    : "",
  phoneNumber      : "",
};

const reducer = (state = initialState ,action) => {
    switch (action.type) {
        case UPDATE_FORM:
            let formState = {...state};
            formState = action.payload;
            return formState;
        case UPDATE_RECIPE:
            let recipeState = {...state};
            recipeState = action.payload;
            return recipeState;
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;