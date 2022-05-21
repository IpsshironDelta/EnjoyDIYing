import { BrowserRouter, 
         Route, 
         Switch,
         useHistory,}           from "react-router-dom";
import Login                    from "./components/Login/Login";
import SignUp                   from "./components/SignUp/SignUp";
import PasswordReset            from './components/PasswordReset/PasswordReset';
import MainPage                 from "./components/MainPage/MainPage";
import PostPage                 from './components/PostPage/PostPage';
import MainTop                  from './components/MainPage/MainPage';
import CategoryList             from './components/CategoryList/CategoryList'
import DetailID                 from './components/DetailList/DetailList'
import RecipeDetails            from './components/RecipDetails/RecipeDetails';
import RecipeDetailsEdit        from './components/RecipDetailsEdit/RecipeDetailsEdit';
import RecipeDetailsID          from './components/RecipDetails/RecipeDetails';
import Profiles                 from './components/Profiles/Profiles'
import ProfileID                from './components/Profiles/Profiles'
import ProfileEdit              from './components/ProfileEdit/ProfileEdit'
import UserRegistration         from './components/UserRegistration/UserRegistration';
import UserRegistrationReview   from './components/UserRegistration/UserRegistrationReview';
import UserRegistrationComplete from './components/UserRegistration/UserRegistrationComplete';
import Message                  from './components/Message/Message';
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
        <Route exact path="/mainpage" component={MainPage} />
        <Route exact path="/categorylist" component={CategoryList} />
        <Route exact path="/categorylist/:id" component={DetailID} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profiles/:id" component={ProfileID} />
        <Route exact path="/profile/edit" component={ProfileEdit} />
        <Route exact path="/recipedetails/" component={RecipeDetails} />
        <Route exact path="/recipedetails/:id/edit" component={RecipeDetailsEdit} />
        <Route exact path="/recipedetails/:id" component={RecipeDetailsID} />
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
