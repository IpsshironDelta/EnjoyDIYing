import { BrowserRouter, 
         Route, 
         Switch,
         useHistory }           from "react-router-dom";
import Login                    from "./components/Login/Login";
import SignUp                   from "./components/SignUp/SignUp";
import PasswordReset            from './components/PasswordReset/PasswordReset';
import PastWork                 from "./components/PastWorks/PastWork";
import MainPage                 from "./components/MainPage/MainPage";
import PostPage                  from './components/PostPage/PostPage';
import MainTop                  from './components/MainPage/MainPage';
import MyPage                   from './components/MyPage/MyPage';
import MyPageEdit               from './components/MyPageEdit/MyPageEdit';
import RecipeDetails            from './components/RecipDetails/RecipeDetails';
import UserRegistration         from './components/UserRegistration/UserRegistration';
import UserRegistrationReview   from './components/UserRegistration/UserRegistrationReview';
import UserRegistrationComplete from './components/UserRegistration/UserRegistrationComplete';
import Message                  from './components/Message/Message';
import Profile                  from './components/Profile/Profile'
import ProfileEdit              from './components/ProfileEdit/ProfileEdit'
import Test                     from './components/test/test'

function App() {
  const history = useHistory();

  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/" component={MainTop} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/passwordreset" component={PasswordReset} />
        <Route exact path="/pastwork" component={PastWork} />
        <Route exact path="/mainpage" component={MainPage} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/edit" component={ProfileEdit} />
        <Route exact path="/mypage/edit" component={MyPageEdit} />
        <Route exact path="/recipedetails" component={RecipeDetails} />
        <Route exact path="/userregistration" component={UserRegistration} />
        <Route exact path="/userregistration/Review" component={UserRegistrationReview} />
        <Route exact path="/userregistration/Complete" component={UserRegistrationComplete} />
        <Route exact path="/message" component={Message} />
        <Route exact path="/postpage" component={PostPage} />
        <Route exact path="/test" component={Test} />

        {/* <Route component={Page404} /> */}
      </Switch>
    </BrowserRouter>
  )
}
export default App;
