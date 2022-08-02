import React from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import SignUp from '../detail/SignUp';
import { setUserInput, createUser, addUserReset, getUser } from '../module/user';
import { useNavigate } from 'react-router-dom';

const SignUpContainer = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const addUser = useSelector(state => state.user.addUser);
    const dispatch = useDispatch();


    const onChange = (e) => {
        dispatch(setUserInput(e));
        dispatch(getUser());
    }
    //id input 변경될 때
    const onIdChange = (e)=>{
        onChange(e);
        document.querySelector('.userIdAlert').innerHTML = '';
    }
    //비밀번호
    const onPwChange = (e) => {
        onChange(e);
        document.querySelector('.userPwAlert').innerHTML = '';
        document.querySelector('.userPwChAlert').innerHTML = '';
    }
    const onPwChChange = ()=>{
        document.querySelector('.userPwChAlert').innerHTML = '';
    }
    const onEmailChange = (e)=>{
        onChange(e);
        document.querySelector('.emailAlert').innerHTML = ''
    }

    const { data, loading, error } = user;

    //영어 소문자를 포함한 8자 이상 16자 이하의 문자열(공백불가, 특수문자 언더바_ 만 사용가능)
    const idForm = /^(?=.*[a-z])[A-Za-z\d_]{8,16}$/;
    //영어 소문자, 숫자, 특수문자가 포함되어야 하는 형식의 8-16자의 문자열.(특수문자는 아래 지정된 문자만 입력가능);
    const pwForm = /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?#&]{8,16}$/;
    //(지정된 특수기호를 제외한 문자열)+ @ +(지정된 특수기호를 제외한 문자열+ . + 지정된 특수기호를 제외하고 2글자 이상인 문자열)로 끝나는 대소문자 구분하지 않는 문자열
    const emailForm = /^(([^<>()\[\].,;:\s@"]+)|(".+"))@(([^<>()[\].,;:\s@"~!#$%^&*+=?`']+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    //정규표현식 사용해 id 체크
    const idCheck = (e) => {
        if (loading) return;
        if (!data || e.target.value === null || e.target.value === undefined || e.target.value === '' || Boolean(e.target.value) === false){
            return document.querySelector('.userIdAlert').innerHTML = 'id를 입력하세요';
        };
        if (error) return;
        if (data.length > 0) document.querySelector('.userIdAlert').innerHTML = '중복된 id입니다.';
        else {
            if (idForm.test(e.target.value) === false) {
                document.querySelector('.userIdAlert').innerHTML = '사용불가';
            } else {
                document.querySelector('.userIdAlert').innerHTML = '사용가능한 id 입니다'
            }
        }

    }
    //정규표현식 사용해 pw 체크
    const pwCheck = (e) => {
        if (!document.querySelector('.userPwAlert')) return;
        if (pwForm.test(e.target.value) === false) {
            document.querySelector('.userPwAlert').innerHTML = '사용불가';
        } else {
            document.querySelector('.userPwAlert').innerHTML = '사용가능';
        }
    }
    //입력한 비밀번호와 맞는 지 체크
    const pwChCheck = (e) => {
        if (!document.querySelector('.userPwChAlert')) return;
        if (addUser.userPw !== e.target.value) {
            document.querySelector('.userPwChAlert').innerHTML = '사용불가';
        } else {
            document.querySelector('.userPwChAlert').innerHTML = '사용가능';
        }
    }
    //정규표현식 사용해 email 체크
    const emailCheck = (e) => {
        if (!document.querySelector('.emailAlert')) return;
        if (emailForm.test(e.target.value) === false) {
            document.querySelector('.emailAlert').innerHTML = '사용불가'
        } else {
            document.querySelector('.emailAlert').innerHTML = '사용가능'
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createUser());
        navigate('/');
        dispatch(addUserReset());
    }

    return (
        <SignUp
            onChange={onChange}
            addUser={addUser}
            onSubmit={onSubmit}
            idCheck={idCheck}
            pwCheck={pwCheck}
            pwChCheck={pwChCheck}
            emailCheck={emailCheck}
            onIdChange={onIdChange}
            onPwChange={onPwChange}
            onPwChChange={onPwChChange}
            onEmailChange={onEmailChange} />
    );
};

export default SignUpContainer;