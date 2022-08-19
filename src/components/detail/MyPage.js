import React from 'react';
import { Link } from 'react-router-dom';
import MyPageListContainer from '../container/MyPageListContainer';
import { HiHeart } from 'react-icons/hi'
import { RiFileList3Line, RiHandHeartLine } from 'react-icons/ri';
import { IoPerson } from 'react-icons/io5'
import { getCookie } from '../../util/cookie';

const MyPage = () => {
    const userName = getCookie('userName');
    return (
        <div className='myPage inner'>
            <div className='myPageWrap'>
                 <div className='myPageLeft'>
                    <div>
                        <ul className='myInfo'>
                            <li className='userName'><IoPerson className='listIcon userInfo' /><span><span className='userInfo'>{userName}</span> 님</span></li>
                        </ul>
                    </div>
                    <ul className='myMenu'>
                        <li>
                            <Link to='myheartlist'> <HiHeart className='listIcon' /><span>찜목록</span></Link>
                        </li>
                        <li>
                            <Link to='myprojectlist'><RiFileList3Line className='listIcon' /><span>내 프로젝트</span></Link>
                        </li>
                        <li>
                            <Link to='myfundinglist'><RiHandHeartLine className='listIcon' /><span>내 후원</span></Link>
                        </li>
                    </ul>
                 </div>
                 <div className='myPageRight'>
                    <MyPageListContainer />
                 </div>
            </div>
        </div>
    );
};

export default MyPage;