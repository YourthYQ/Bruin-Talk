import { Navigate } from 'react-router-dom';
import Home from '../views/home/index';
import UserLogin from '../views/user/login';
import UserRegister from '../views/user/register';

const routesList = [
    {
        path: '/home/:id?',
        element: <Home />,
        meta: { title: 'Bruin Talk', isLogin: true },
        children: []
    },
    {
        path: '/',
        element: <Navigate to="/home" replace />,
        meta: { title: 'Bruin Talk', isLogin: false },
    },
    {
        path: '/user/login',
        meta: { title: 'Bruin Talk - Login', isLogin: false },
        element: <UserLogin />
    },
    {
        path: '/user/register',
        meta: { title: 'Bruin Talk - Register', isLogin: false },
        element: <UserRegister />
    },
];

export default routesList;
