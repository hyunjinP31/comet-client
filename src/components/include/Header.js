import React, { useEffect } from 'react';
import {FiSearch} from 'react-icons/fi'
import {Link} from 'react-router-dom';
import { getCookie, removeCookie } from '../../util/cookie';

const Header = () => {
    const logout = ()=>{
        removeCookie('userId');
        removeCookie('userName');
    }
    return (
        <>
            <div className='header inner'>
                <div className='headerTop'>
                    <Link to='/'><h1 className='headerLogo'>TEMPUS</h1></Link>
                    <ul>
                    {getCookie('userId') ? <li><Link to='/createproject'>프로젝트 등록</Link></li> : <li></li>}
                        {getCookie('userId') ? <li onClick={logout}>로그아웃</li> : <li><Link to='/login'>로그인</Link></li>}
                        <li><Link to='/signup'>회원가입</Link></li>
                    </ul>
                </div>
                <div className='headerBottom'>
                    <div className='headerLeft'>
                        <div className='toggle'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <ul>
                            <li>인기</li>
                            <li>신규</li>
                            <li>마감임박</li>
                            <li>공개예정</li>
                        </ul>
                    </div>
                    <div className='searchBox'>
                        <input type='text' name='search' />
                        <FiSearch className='searchBtn'/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;