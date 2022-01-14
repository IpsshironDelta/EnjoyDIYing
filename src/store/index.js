import { createStore }  from "redux";
import {UPDATE_FORM,
        UPDATE_RECIPE,} from '../actions/memberAction';

const initialState = {
  firstname        : "",
  secondname       : "",
  address          : "",
  password1        : "",
  password2        : "",
  nickname         : "",
  location         : "",
  recipetitle      : "",
  category         : "",
  productionCost   : "",
  productionPeriod : "",
  width            : "",
  height           : "",
  depth            : "",
};

const reducer = (state = initialState ,action) => {
    switch (action.type) {
        // case UPDATE_NAME:
        //     let nameState = {...state};
        //     nameState.name = action.payload;
        //     return nameState;
        case UPDATE_FORM:
            let formState = {...state};
            formState = action.payload;
            return formState;
        case UPDATE_RECIPE:
            let recipeState = {...state};
            recipeState = action.payload;
            return recipeState;
        // case UPDATE_AGE:
        //     let ageState = {...state};
        //     ageState.age = action.payload;
        //     return ageState;
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;