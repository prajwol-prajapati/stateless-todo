import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import fakeAuth from './Auth/fakeAuth';
import AuthButton from './Auth/AuthButton';
import PrivateRoute from './Auth/PrivateRoute';
import Login from './Auth/Login';
import Public from './Auth/Public';
import Protected from './Auth/Protected';



const AuthExample = () => (
    <Router>
        <div>
            <AuthButton />
            <ul>
                <li><Link to="/public">Public Page</Link></li>
                <li><Link to="/protected">Private Page</Link></li>
            </ul>
            <Route path="/public" component={Public}/>
            <Route path="/login" component={Login}/>
            <PrivateRoute path="/protected" component={Protected}/>

        </div>
    </Router>

)

export default AuthExample;
