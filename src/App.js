import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import World from './components/Pages/World';
import Picks from './components/Pages/Picks';
import Blog from './components/Pages/Blog';
import Shop from './components/Pages/Shop';
import Home from './components/Pages/Home';
import Features from './components/Pages/Features';
import Contact from './components/Pages/Contact';
import Post from './components/Post';
import Dashboard from './components/Dashboard';
import DashPosts from './components/Dashboard/DashPosts';
import DashPodcasts from './components/Dashboard/DashPodcasts';
import DashUsers from './components/Dashboard/DashUsers';
import DashUser from './components/Dashboard/DashUser';
import DashboardLayout from './components/Layouts/DashboardLayout';
import AuthLayout from './components/Layouts/AuthLayout';
import MainLayout from './components/Layouts/MainLayout';

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  useEffect(() => {
    const token = localStorage.getItem('passport') || '';
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    if (user === null && token.length > 0) {
      axios.get('http://127.0.0.1:9001/api/user', config)
        .then(result => {
          if (result.data) {
            sessionStorage.setItem('user', JSON.stringify(result.data));
            setUser(result.data);
          } else {
            sessionStorage.removeItem('user');
          }
        });
    }

  }, [user]);

  const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
    return (
      <Route {...rest} render={props => (
        <Layout {...props}>
          <Component {...props} {...rest} />
        </Layout>
      )} />
    )
  }

  <div>
    <DashboardLayout />
    <AuthLayout />
    <MainLayout />
  </div>

  return (
    <BrowserRouter>
      <Switch>
        <AppRoute path="/register" layout={AuthLayout} component={Register} setUser={setUser} />
        <AppRoute path="/login" layout={AuthLayout} component={Login} setUser={setUser} />

        <AppRoute exact path="/" layout={MainLayout} component={Home} />
        <AppRoute path="/blog/:id" layout={MainLayout} component={Post} />
        <AppRoute path="/blog" layout={MainLayout} component={Blog} />
        <AppRoute path="/contact" layout={MainLayout} component={Contact} />
        <AppRoute path="/features" layout={MainLayout} component={Features} />
        <AppRoute path="/picks" layout={MainLayout} component={Picks} />
        <AppRoute path="/shop" layout={MainLayout} component={Shop} />
        <AppRoute path="/world" layout={MainLayout} component={World} />

        <AppRoute exact path="/dashboard" layout={DashboardLayout} component={Dashboard} />
        <AppRoute path="/dashboard/posts" layout={DashboardLayout} component={DashPosts} />
        <AppRoute path="/dashboard/podcasts" layout={DashboardLayout} component={DashPodcasts} />
        <AppRoute path="/dashboard/users/:id" layout={DashboardLayout} component={DashUser} />
        <AppRoute path="/dashboard/users" layout={DashboardLayout} component={DashUsers} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;