import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import NewPost from './NewPost';
import PostDetails from './PostDetails';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <h1>Homepage</h1>
          </Route>
          <Route exact path="/blog">
            <h1>List of posts here</h1>
          </Route>
          <Route exact path="/blog/new">
            <NewPost />
          </Route>
          <Route path="/blog/posts/:id">
            <PostDetails />
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
