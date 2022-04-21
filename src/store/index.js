import { createStore }  from "redux";
import {UPDATE_FORM,
        UPDATE_RECIPE,} from '../actions/memberAction';

const initialState = {
  address          : "",
  addressErrorMS   : "",
  password1        : "",
  password2        : "",
  passwordErrorMS  : "",
  displayName      : "",
  nicknameErrorMS  : "",
  location         : "",
  locationErrorMS  : "",
  recipetitle      : "",  // 作品タイトル
  category         : "",  // カテゴリー
  productionCost   : "",  // 制作費用
  productionPeriod : "",  // 制作期間
  productionMemo   : "",  // 作品メモ
  memo             : "",
  photoURL         : "",
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