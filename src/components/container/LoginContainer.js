import React from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import Login from '../detail/Login';
import {getLogin, resetLoginInput, setLoginInput} from '../module/user'

const LoginContainer = () => {
    const dispatch = useDispatch();
    const loginUser = useSelector(state=> state.user.loginUser);

    const onChange = (e) => {
        console.log(loginUser)
        dispatch(setLoginInput(e));
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(getLogin());
        dispatch(resetLoginInput());
    }

    return (
        <>
            <Login
            loginUser={loginUser}
            onChange={onChange}
            onSubmit={onSubmit}/>
        </>
    );
};

export default LoginContainer;