import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// import Intro from './components/Intro/Intro';
import Main from './components/Main/Main';
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
import {Container} from '@material-ui/core';

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  useEffect(() => {
    const token = localStorage.getItem('passport') || '';
    // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5M2M0MGJiZi1iYTA1LTQ2ZWYtYTMwOC1mOTg0ZDljMmVjM2IiLCJqdGkiOiJiNWJmZWY3MDc2YjlkNjAxN2UzYjA3MjAxOTI2ZGIyMjFkNjgyODgxMjExNTgzOWNkNjRjYjNiYmY5N2I2NTBkYjBiMDk1NzA0YzZjMDM5ZCIsImlhdCI6MTYyNDcwMzU4OC45MDU2NDgsIm5iZiI6MTYyNDcwMzU4OC45MDU2NTEsImV4cCI6MTY1NjIzOTU4OC45MDQyMzUsInN1YiI6IjUiLCJzY29wZXMiOltdfQ.ARJYUZ1wyAtUOYI56jPXfEktdDMY4jkXALzJLuenJmxV28FmsRWfyOKVW6KkkAksuRSpuKA0wwyZwgsrNWUK6aoYLzH4XMKDWC74HvNGQAB-A20f0vy0XnrlnToDAoGN4CK3NVxAegEA-TT7Gedvf6ehqlfGIqRpeY2jLNi7qhYIkn_u96kWhNAaXes3crkib8lP1YQ-IoXHv5XG6K9EtTsFRXqRn261ULBDOiyeQi1GPQRQgp_y2JXLzLlBmy86p8xVaRYc_aQ_COAZ3TvuDAb8rfVRwN1USx29Hsa7f2LypYcxxL8zB93qkafAPU-f8mMwQj3Vbhzk5F9Er1D4gkq96rph8JzODWvw9HGquc6jIcY7Bz-3IY1r3kZMK9UwwvNgVAymqWHV9UUPkGQLtCcwdX2w-vRbYtSjE8hNLt5gwaLRjJHrYfVKSUrvaHs6JcMvwdZmuk8YWUk5Ewk-o3d32_E_1Ujh_-auMJar37zpDIJT2W-j4SYffPwpn8QoOktZ7w4bvtsiV6PnnebqQvLC1y_Z7tIBfXhhcy1G3icq0WutW78RvuTiZoTj97tmBP55B_rdAWCh7sf4litUMlvXebmADjr8d6ORXeL3Vhb8b2r8gdhO2KnHi-1o8yT2ln-BqOb8Wf9X5hQiTx-nYFvqItAJzv2iX5XxwK3Q8uM';
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

  console.log(user);

  const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
    return (
      <Route {...rest} render={props => (
        <Layout {...props}>
            <Component {...props} {...rest} />
        </Layout>
      )} />
    )
  }

  const MainLayout = (props) => {
    return (
      <Container>
          <Header title={"WIPCAST"} currentUser={user} />
          {props.children}
          <Footer />
      </Container>
    )
  }

  const AuthLayout = props => (
    <div className="app-wrapper">
        {props.children}
    </div>
  )

  return (
    <BrowserRouter>
    <Switch>
      <AppRoute path="/register" layout={AuthLayout} component={Register} setUser={setUser} />
      <AppRoute path="/login" layout={AuthLayout} component={Login} setUser={setUser} />

      {/* <AppRoute exact path="/" layout={MainLayout} component={Intro} /> */}
      {/* <AppRoute path="/main" layout={MainLayout} component={Main} /> */}
      <AppRoute exact path="/" layout={MainLayout} component={Home} />
      <AppRoute path="/blog" layout={MainLayout} component={Blog} />
      <AppRoute path="/contact" layout={MainLayout} component={Contact} />
      <AppRoute path="/features" layout={MainLayout} component={Features} />
      <AppRoute path="/picks" layout={MainLayout} component={Picks} />
      <AppRoute path="/shop" layout={MainLayout} component={Shop} />
      <AppRoute path="/world" layout={MainLayout} component={World} />
    

    </Switch>
  </BrowserRouter>
  );
}

export default App;