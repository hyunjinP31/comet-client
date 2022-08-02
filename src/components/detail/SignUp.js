import React, { useEffect, useState } from 'react';
import PopupPostCode from './AddressSearch/PopupPostCode';
import PopupDom from './AddressSearch/PopupDom';

const Login = ({
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
    onEmailChange
}) => {
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

    //휴대폰 번호 자동 하이픈 생성
    const [phoneNum, setphoneNum] = useState('');
    const onPhoneChange = (e) => {
        setphoneNum(e.target.value);
        onChange(e);
    }
    useEffect(() => {
        if (phoneNum.length === 10) {
            setphoneNum(phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
        }
        if (phoneNum.length === 13) {
            setphoneNum(phoneNum.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
        if (phoneNum.length === 14) {
            let cutNum = phoneNum.slice(0, 12);
            setphoneNum(cutNum);
        }
    }, [phoneNum]);

    //생년월일 자동 하이픈 생성
    const [birth, setBirth] = useState('');
    useEffect(()=>{
        setBirth(addUser.userBirth);
        console.log(birth)
        if(birth.length === 8){
            setBirth(birth.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
        }
        if(birth.length > 9){
            setBirth(birth);
        }
    },[addUser.userBirth])

    return (
        <div className='signUp inner'>
            <h1>꼬리별</h1>
            <div className='signUpWrap'>
                <form onSubmit={onSubmit}>
                    <ul>
                        <li>
                            <p>아이디</p>
                            <input type='text' name='userId' placeholder='아이디를 입력하세요' onChange={onIdChange} value={addUser.userId} onBlur={idCheck} />
                            <span className='userIdAlert formAlert'></span>
                        </li>
                        <li>
                            <p>비밀번호</p>
                            <input type='password' name='userPw' placeholder='비밀번호를 입력하세요' onChange={onPwChange} onBlur={pwCheck} value={addUser.userPw} />
                            <span className='userPwAlert formAlert'></span>
                            <input type='password' name='userPwCh' placeholder='비밀번호를 한 번 더 입력하세요' onBlur={pwChCheck} onChange={onPwChChange} />
                            <span className='userPwChAlert formAlert'></span>
                        </li>
                        <li>
                            <p>이름</p>
                            <input type='text' name='userName' placeholder='이름을 입력하세요' onChange={onChange} value={addUser.userName} />
                        </li>
                        <li>
                            <p>생년월일</p>
                            <input type='text' name='userBirth' placeholder='YYYYMMDD' onChange={onChange} value={birth} />
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
                            <input type='text' name='userPhone' placeholder='전화번호를 입력하세요' onChange={onPhoneChange} value={phoneNum} />
                        </li>
                        <li>
                            <p>이메일</p>
                            <input type='email' name='userEmail' placeholder='이메일을 입력하세요' onChange={onEmailChange} onBlur={emailCheck} />
                            <span className='emailAlert formAlert'></span>
                        </li>
                        <li>
                            <p>주소<button className="addrSearchBtn" onClick={openPostCode}>주소 찾기</button></p>
                            <input type='text' name='userAddr1' onChange={onChange} value={addUser.userAddr1} />
                            <input type='text' name='userAddr2' onChange={onChange} placeholder='상세주소를 입력하세요' value={addUser.userAddr2} />
                            <div id="popupDom">
                                {isPopupOpen && (
                                    <PopupDom>
                                        <PopupPostCode onClose={closePostCode} onAddData={onAddData} />
                                    </PopupDom>
                                )}
                            </div>
                        </li>
                        <li>
                            <button className='signUpBtn' type='submit' onSubmit={onSubmit}>가입하기</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    );
};

export default Login;