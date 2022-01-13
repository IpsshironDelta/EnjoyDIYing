import { BrowserRouter, Route, Switch,useHistory } from "react-router-dom";
import SignInSide from "./login/SignInSide";
import PastWork from "./components/PastWorks/PastWork";
import MainPage from "./components/MainPage/MainPage";
import Post from './components/PostPage/Post';
import MainTop from './components/MainPage/MainPage';
import MyPage from './components/MyPage/MyPage';
import RecipeDetails from './components/RecipDetails/RecipeDetails';
import UserRegistration from './components/UserRegistration/UserRegistration';
import FirebaseTest from './components/test/test';

function App() {
  const history = useHistory();
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/login" component={SignInSide} />
        <Route exact path="/" component={MainTop} />
        <Route exact path="/pastwork" component={PastWork} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/mainpage" component={MainPage} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/recipedetails" component={RecipeDetails} />
        <Route exact path="/userregistration" component={UserRegistration} />

        <Route exact path="/test" component={FirebaseTest} />

        {/* <Route component={Page404} /> */}
      </Switch>
    </BrowserRouter>
  )
}
export default App;
