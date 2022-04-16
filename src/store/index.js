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
  recipetitle      : "",
  category         : "",
  productionCost   : "",
  productionPeriod : "",
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