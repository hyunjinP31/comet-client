import React from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import SignUp from '../detail/SignUp';
import { setUserInput, createUser } from '../module/user';
import {useNavigate} from 'react-router-dom';

const SignUpContainer = () => {
    const navigate = useNavigate();
    const user = useSelector(state=>state.user.user);
    const addUser = useSelector(state=>state.user.addUser);
    const dispatch = useDispatch();
    const onChange = (e)=>{
        dispatch(setUserInput(e));
        //영어 소문자, 숫자, 특수문자가 포함되어야 하는 형식의 8-16자의 문자열.(특수문자는 아래 지정된 문자만 입력가능);
        const pwForm = /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?#&]{8,16}$/;
        //id 언더바만 사용할 수 있게 하기 특수기호 및 공백 ㄴㄴ
        const idForm = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*?#&]{8,16}$/;
        console.log()
        if(!document.querySelector('.userIdAlert')) return;
        else {
            if(!idForm.test(addUser.userId)){
                document.querySelector('.userIdAlert').innerHTML = '아이디는 8~16자, 영문 대 소문자, 특수기호(@$!%*?&#) 중 2가지 이상을 사용하세요.';
            }else{
                document.querySelector('.userIdAlert').innerHTML = '';
            }
        }
        
    }
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createUser());
        navigate('/');
    }

    return (
        <SignUp onChange={onChange} addUser={addUser} onSubmit={onSubmit} />
    );
};

export default SignUpContainer;