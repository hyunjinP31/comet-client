import React from 'react';

const Login = ({loginUser, onChange, onSubmit}) => {
    return (
        <div className='login inner'>
            <div className='loginWrap'>
                <form className='login'>
                    <ul>
                        <li className='loginTitle'><h1>로그인</h1></li>
                        <li>
                            <input onChange={onChange} className='signTextInput' type='text' name='userId' placeholder='아이디를 입력하세요' value={loginUser.userId} />
                            <input onChange={onChange} className='signTextInput' type='password' name='userPw' placeholder='비밀번호를 입력하세요' value={loginUser.userPw} />
                        </li>
                        <li className='loginAlert'><span></span></li>
                        <li>
                            <button className='signUpBtn' type='submit'>로그인</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    );
};

export default Login;