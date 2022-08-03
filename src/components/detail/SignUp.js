import React, { useEffect, useState, forwardRef } from 'react';
import PopupPostCode from './AddressSearch/PopupPostCode';
import PopupDom from './AddressSearch/PopupDom';

const Login = forwardRef(({
    onChange,
    addUser,
    onSubmit,
    idCheck,
    pwCheck,
    pwChCheck,
    emailCheck,
    onIdChange,
    onPwChange,
    onPwChChange,
    onEmailChange,
    isValid
},SignUpInputs) => {
    //우편번호 관리
    const onAddData = (data) => {
        const postAdd = data.address;
        onChange({
            target: {
                name: 'userAddr1',
                value: postAdd
            }
        })
    }
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPostCode = (e) => {
        e.preventDefault();
        setIsPopupOpen(true);
    }

    const closePostCode = (e) => {
        e.preventDefault();
        setIsPopupOpen(false);
    }
    //우편번호 관리 끝

    //자동 하이픈 생성
    const [phone, setPhone] = useState('');
    const [birth, setBirth] = useState('');
    const onPhoneChange = (e) => {
        setPhone(e.target.value);
        onChange(e);
    }
    const onBirthChange = (e) => {
        setBirth(e.target.value);
        onChange(e);
    }
    useEffect(() => {
        let rePhone = phone.replace(/[^0-9]/g, '')
            .replace(/^(\d{0,3})(\d{0,3})(\d{0,4})$/g, "$1-$2-$3")
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
            .replace(/(\-{1,2})$/g, "");
        let reBirth = birth.replace(/[^0-9]/g, '')
            .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3")
            .replace(/(\-{1,2})$/g, "");

        setBirth(reBirth);
        setPhone(rePhone);
    }, [phone, birth]);
    




    return (
        <div className='signUp inner'>
            <h1>꼬리별</h1>
            <div className='signUpWrap'>
                <form onSubmit={onSubmit}>
                    <ul>
                        <li>
                            <p>아이디</p>
                            <input pattern={isValid.idValid} ref={el => SignUpInputs.current[0] = el} type='text' name='userId' placeholder='아이디를 입력하세요' onChange={onIdChange} value={addUser.userId} onBlur={idCheck} />
                            <span className='userIdAlert formAlert'></span>
                        </li>
                        <li>
                            <p>비밀번호</p>
                            <input ref={el => SignUpInputs.current[1] = el} type='password' name='userPw' placeholder='비밀번호를 입력하세요' onChange={onPwChange} onBlur={pwCheck} value={addUser.userPw} />
                            <span className='userPwAlert formAlert'></span>
                            <input ref={el => SignUpInputs.current[2] = el} type='password' name='userPwCh' placeholder='비밀번호를 한 번 더 입력하세요' onBlur={pwChCheck} onChange={onPwChChange} />
                            <span className='userPwChAlert formAlert'></span>
                        </li>
                        <li>
                            <p>이름</p>
                            <input ref={el => SignUpInputs.current[3] = el} type='text' name='userName' placeholder='이름을 입력하세요' onChange={onChange} value={addUser.userName} />
                        </li>
                        <li>
                            <p>생년월일</p>
                            <input ref={el => SignUpInputs.current[4] = el} type='text' name='userBirth' maxLength={10} placeholder='YYYYMMDD' onChange={onBirthChange} value={birth} />
                        </li>
                        <li>
                            <p>성별</p>
                            <div className='genderCheck'>
                                <span><input type='radio' name='userGender' value='여성' onChange={onChange} />여성</span>
                                <span><input type='radio' name='userGender' value='남성' onChange={onChange} />남성</span>
                                <span><input type='radio' name='userGender' value='선택하지 않음' onChange={onChange} />선택하지 않음</span>
                            </div>
                        </li>
                        <li>
                            <p>휴대폰</p>
                            <input ref={el => SignUpInputs.current[5] = el} type='text' name='userPhone' maxLength={13} placeholder='전화번호를 입력하세요' onChange={onPhoneChange} value={phone} />
                        </li>
                        <li>
                            <p>이메일</p>
                            <input ref={el => SignUpInputs.current[6] = el} type='email' name='userEmail' placeholder='이메일을 입력하세요' onChange={onEmailChange} onBlur={emailCheck} />
                            <span className='emailAlert formAlert'></span>
                        </li>
                        <li>
                            <p>주소<button className="addrSearchBtn" onClick={openPostCode}>주소 찾기</button></p>
                            <input ref={el => SignUpInputs.current[7] = el} type='text' name='userAddr1' onChange={onChange} value={addUser.userAddr1} />
                            <input ref={el => SignUpInputs.current[8] = el} type='text' name='userAddr2' onChange={onChange} placeholder='상세주소를 입력하세요' value={addUser.userAddr2} />
                            <div id="popupDom">
                                {isPopupOpen && (
                                    <PopupDom>
                                        <PopupPostCode onClose={closePostCode} onAddData={onAddData} />
                                    </PopupDom>
                                )}
                            </div>
                        </li>
                        <li>
                            <button className='signUpBtn' type='submit'>가입하기</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    );
});

export default Login;