import { BrowserRouter, Route, Switch,useHistory } from "react-router-dom";
//import Dashboard from "./components/Dashboard";
import SignInSide from "./login/SignInSide";
import PastTranslation from "./components/PastTranslation";
import MainPage from "./components/MainPage";
import Page404 from './page/Page404';
import Post from './components/Post';
import MainTop from './components/MainPage';
import MyPage from './components/MyPage';
import RecipeDetails from './components/RecipeDetails';
import Checkout from './components/Checkout';

function App() {
  const history = useHistory();
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/login" component={SignInSide} />
        <Route exact path="/" component={MainTop} />
        <Route exact path="/pasttranslation" component={PastTranslation} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/mainpage" component={MainPage} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/recipedetails" component={RecipeDetails} />
        <Route exact path="/checkout" component={Checkout} />

        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  )
}
export default App;
