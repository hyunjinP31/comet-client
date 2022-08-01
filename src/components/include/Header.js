import React from 'react';
import {FiSearch} from 'react-icons/fi'
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className='header inner'>
                <div className='headerTop'>
                    <h1 className='headerLogo'>TEMPUS</h1>
                    <ul>
                        <li>로그인</li>
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