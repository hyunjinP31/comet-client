import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import Login from '../detail/Login';
import {getLogin, loggedIn, resetLoginInput, setLoginInput} from '../module/user'
import { useNavigate } from 'react-router';
import { setCookie } from '../../util/cookie';

const LoginContainer = () => {
    const dispatch = useDispatch();
    const loginUser = useSelector(state=> state.user.loginUser);
    const navigate = useNavigate();

    useEffect(()=>{
        return ()=>{
            dispatch(resetLoginInput());
        }
    },[])

    const onChange = (e) => {
        dispatch(setLoginInput(e));
        document.querySelector('.loginAlert span').innerHTML = "";
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(getLogin());
        dispatch(getLogin()).then(res=>{
            const {userId, userName} = res;
            if(res === undefined || !res) return document.querySelector('.loginAlert span').innerHTML = '아이디를 찾을 수 없습니다.';
            else if(res === 'password undefined') return document.querySelector('.loginAlert span').innerHTML = '비밀번호가 일치하지 않습니다.';
            else {
                let expires = new Date();
                expires.setMinutes(expires.getMinutes()+60);
                setCookie('userId', `${userId}`, {path: '/', expires} );
                setCookie('userName', `${userName}`, {path: '/', expires} );
                dispatch(loggedIn())
                navigate('/');
                dispatch(resetLoginInput());
            }
        })
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