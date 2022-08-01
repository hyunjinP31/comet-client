import React, { useState } from 'react';
import PopupPostCode from './AddressSearch/PopupPostCode';
import PopupDom from './AddressSearch/PopupDom';

const Login = ({ onChange, addUser, onSubmit }) => {

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
    return (
        <>
            <h1>꼬리별</h1>
            <form onSubmit={onSubmit}>
                <div className='loginWrap'>
                    <ul>
                        <li>
                            <p>아이디</p>
                            <input type='text' name='userId' placeholder='아이디를 입력하세요' onChange={onChange} value={addUser.userId} />
                            <button>아이디확인</button>
                            <span className='userIdAlert'></span>
                        </li>
                        <li>
                            <p>비밀번호</p>
                            <input type='password' name='userPw' placeholder='비밀번호를 입력하세요' onChange={onChange} value={addUser.userPw} />
                            <input type='password' name='userPwCh' placeholder='비밀번호를 한 번 더 입력하세요' />
                        </li>
                        <li>
                            <p>이름</p>
                            <input type='text' name='userName' placeholder='이름을 입력하세요' onChange={onChange} value={addUser.userName} />
                        </li>
                        <li>
                            <p>생년월일</p>
                            <input type='text' name='userBirth' placeholder='YYYYMMDD' onChange={onChange} value={addUser.userBirth} />
                        </li>
                        <li>
                            <p>성별</p>
                            <span><input type='checkbox' name='userGender' value='여성' onChange={onChange} /> 여성</span>
                            <span><input type='checkbox' name='userGender' value='남성' /> 남성</span>
                            <span><input type='checkbox' name='userGender' value='선택하지 않음' /> 선택하지 않음</span>
                        </li>
                        <li>
                            <p>휴대폰</p>
                            <input type='text' name='userPhone' placeholder='전화번호를 입력하세요' onChange={onChange} value={addUser.userPhone} />
                        </li>
                        <li>
                            <p>이메일</p>
                            <input type='text' name='userEmail' placeholder='이메일을 입력하세요' onChange={onChange} />@
                            <select name='userEmail'>
                                <option value='naver.com'>naver.com</option>
                                <option value='daum.com'>daum.com</option>
                                <option value='gmail.com'>gmail.com</option>
                            </select>
                        </li>
                        <li>
                            <p>주소<button className="inputButton" onClick={openPostCode}>주소 찾기</button></p>
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
                    </ul>
                    <button>가입하기</button>
                </div>
            </form>
        </>
    );
};

export default Login;