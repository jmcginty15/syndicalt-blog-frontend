import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import PostForm from './PostForm';
import PostList from './PostList';
import PostDetails from './PostDetails';
import UserDetails from './UserDetails';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/users/:name">
            <UserDetails />
          </Route>
          <Route exact path="/blog">
            <PostList />
          </Route>
          <Route exact path="/blog/posts/:id">
            <PostDetails />
          </Route>
          <Route exact path="/blog/posts/:id/edit">
            <PostForm />
          </Route>
          <Route exact path="/blog/new-post">
            <PostForm />
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
