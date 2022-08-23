import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import SignUp from '../detail/SignUp';
import { setUserInput, createUser, addUserReset, getUser, validFalse, validTrue, validReset } from '../module/user';
import { useNavigate } from 'react-router-dom';

const SignUpContainer = () => {
    const navigate = useNavigate();
    const addUser = useSelector(state => state.user.addUser);
    const isValid = useSelector(state => state.user.isValid);
    const dispatch = useDispatch();
    const SignUpInputs = useRef([]);

    useEffect(()=>{
        dispatch(addUserReset());
        dispatch(validReset());
        //eslint-disable-next-line
    },[])

    const onChange = (e) => {
        dispatch(setUserInput(e));
        for(let i = 0; i< SignUpInputs.current.length ; i++){
            SignUpInputs.current[i].classList.remove('signInvalid');
        }
    }
    //id input 변경될 때
    const onIdChange = (e) => {
        onChange(e);
        document.querySelector('.userIdAlert').innerHTML = '';
    }
    //비밀번호
    const onPwChange = (e) => {
        onChange(e);
        document.querySelector('.userPwAlert').innerHTML = '';
        document.querySelector('.userPwChAlert').innerHTML = '';
        dispatch(validFalse('pwChValid'))
    }
    const onPwChChange = () => {
        document.querySelector('.userPwChAlert').innerHTML = '';
    }
    const onEmailChange = (e) => {
        onChange(e);
        document.querySelector('.emailAlert').innerHTML = ''
    }



    
    
    //영어 소문자, 숫자, 특수문자가 포함되어야 하는 형식의 8-16자의 문자열.(특수문자는 아래 지정된 문자만 입력가능);
    const pwForm = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?#&]{8,16}$/;
    //(지정된 특수기호를 제외한 문자열)+ @ +(지정된 특수기호를 제외한 문자열+ . + 지정된 특수기호를 제외하고 2글자 이상인 문자열)로 끝나는 대소문자 구분하지 않는 문자열
    const emailForm = /^(([^<>()\[\].,;:\s@"]+)|(".+"))@(([^<>()[\].,;:\s@"~!#$%^&*+=?`']+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    //정규표현식 사용해 id 체크
    const idCheck = () => {
        dispatch(getUser());
        if (addUser.userId === null || addUser.userId === undefined || addUser.userId === '') {
            dispatch(validFalse('idValid'));
            return document.querySelector('.userIdAlert').innerHTML = 'id를 입력하세요.';
        }
    }
    //정규표현식 사용해 pw 체크
    const pwCheck = (e) => {
        if (!document.querySelector('.userPwAlert')) return;
        if(e.target.value ===  null || e.target.value === '') return document.querySelector('.userPwAlert').innerHTML = '비밀번호를 입력하세요.';
        if (pwForm.test(e.target.value) === false) {
            document.querySelector('.userPwAlert').innerHTML = '영문 대 소문자, 숫자, 특수기호($@$!%*?&#)를 포함한 8~16글자';
        } else {
            document.querySelector('.userPwAlert').innerHTML = '';
            dispatch(validTrue('pwValid'));
        }
    }
    //입력한 비밀번호와 맞는 지 체크
    const pwChCheck = (e) => {
        if (!document.querySelector('.userPwChAlert')) return;
        if(e.target.value === null || e.target.value === '') return;
        if (addUser.userPw !== e.target.value) {
            document.querySelector('.userPwChAlert').innerHTML = '비밀번호가 일치하지 않습니다.';
            dispatch(validFalse('pwChValid'))
        } else {
            document.querySelector('.userPwChAlert').innerHTML = '비밀번호가 일치합니다.';
            dispatch(validTrue('pwChValid'));
        }
    }
    //정규표현식 사용해 email 체크
    const emailCheck = (e) => {
        if (!document.querySelector('.emailAlert')) return;
        if (e.target.value === null || e.target.value === '') {
            dispatch(validTrue('emailValid'))
            return document.querySelector('.emailAlert').innerHTML = '';
        }
        if (emailForm.test(e.target.value) === false) {
            document.querySelector('.emailAlert').innerHTML = '형식에 맞지 않는 이메일입니다.';
            dispatch(validFalse('emailValid'));
        } else {
            document.querySelector('.emailAlert').innerHTML = '';
            dispatch(validTrue('emailValid'));
        }
    }
    //생일과 전화번호 값 체크
    const birthCheck = () => {
        const birthInput = document.querySelector('input[name="userBirth"]');
        if (birthInput.value === null || birthInput.value === '' || birthInput.value.length >= 10) {
            dispatch(validTrue('birthValid'));
            document.querySelector('.birthAlert').innerHTML = "";
        } else if (birthInput.value.length < 10) {
            dispatch(validFalse('birthValid'));
            document.querySelector('.birthAlert').innerHTML = "생년월일 8자리를 입력하세요. 예시) 20010101";
        }
    }
    const phoneCheck = () => {
        const phoneInput = document.querySelector('input[name="userPhone"]');
        if (phoneInput.value === null || phoneInput.value === '' || phoneInput.value.length >= 12) {
            dispatch(validTrue('phoneValid'));
            document.querySelector('.phoneAlert').innerHTML = "";
        } else {
            dispatch(validFalse('phoneValid'));
            document.querySelector('.phoneAlert').innerHTML = "전화번호는 최소 10자리 이상이여야 합니다. 예시) 0101234567";
        }
    }
    //submit
    const onSubmit = (e) => {
        e.preventDefault();
        //유효하지 않은 input을 가진 채 submit 했을 때 해당 input focus 주기
        let inputs = SignUpInputs.current;
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].dataset.valid === 'false') {
                inputs[i].classList.add('signInvalid');
                return inputs[i].focus();
            }else {
                inputs[i].classList.remove('signInvalid');
            }
        }
        dispatch(createUser());
        navigate('/');
        dispatch(addUserReset());
        dispatch(validReset());
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
            onEmailChange={onEmailChange}
            ref={SignUpInputs}
            isValid={isValid}
            birthCheck={birthCheck}
            phoneCheck={phoneCheck} />
    );
};

export default SignUpContainer;