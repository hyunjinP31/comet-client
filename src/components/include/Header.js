import React from 'react';
import { FiSearch } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../../util/cookie';
import { useDispatch, useSelector } from 'react-redux';
import { goToHome, headerMenuChange, onToggleClick, searchProject, sendSearchWord, toggleFalse } from '../module/utility';
import {GrCoatCheck,GrGamepad} from 'react-icons/gr';
import {BiDish} from 'react-icons/bi';
import {RiBook2Line} from 'react-icons/ri';
import {HiOutlineSparkles} from 'react-icons/hi';
import {AiOutlineUnorderedList} from 'react-icons/ai';
import styled, { css } from 'styled-components';
import { loggedOut } from '../module/user';
const ToggleMenu = styled.div`
        width: 100%;
        height: 100px;
        background: #fff;
        box-shadow: 0 1px 3px #ccc;
        transition: 0.3s;
        position: fixed;
        top: -110px;
        left: 0;
        z-index: 19;
        ${props =>
        props.isOpen &&
        css`
                    top: 110px;
                `
    }
    `;
const ToggleSpan = styled.span`
        display: block;
        width: 25px;
        height: 3px;
        background: #222;
        transition: 0.3s;

        &:not(:last-child) {
            margin-bottom: 7px;
        }
        ${props =>
        props.isOpen &&
        css`
            border-radius: 3px;
            position: absolute;
            &:nth-child(1){
                top: 0;
            }
            &:nth-child(2){
                background: #838dd2;
                top: 50%;
                transform: translateY(-50%); 
            }
            &:nth-child(3){
                bottom: 0;
            }
            &:not(:nth-child(2)){
                right: 7px;
                width: 12px;
            }
                
            `
    }
`
const ToggleDiv = styled.div`
        transition: 0.3s;
        position: relative;
        width: 25px;
        height: 23px;
        ${props =>
        props.isOpen &&
        css`
                transform: rotate(-90deg);
            `
    }
`

const Header = () => {
    const headerMenu = useSelector(state => state.utility.headerMenu);
    const isLogged = useSelector(state => state.user.loginUser.isLogged);
    const search = useSelector(state=> state.utility.search);
    const userId = getCookie('userId');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = () => {
        removeCookie('userId');
        removeCookie('userName');
        dispatch(loggedOut());
        dispatch(goToHome(navigate))
    }
    const onClick = (e) => {
        dispatch(headerMenuChange(e));
        dispatch(toggleFalse());
    }
    const toggleOpen = () => {
        dispatch(onToggleClick());
    }
    const onSearchChange = (e) => {
        dispatch(searchProject(e));
    }
    const onSearchSend = () => {
        dispatch(sendSearchWord());
    }
    const EnterSearchSend = (e) => {
        if(e.code === "Enter"){
            dispatch(sendSearchWord());
            navigate('/searchresult');
        }
    }
    return (
        <>
            <div className='headerHeight'></div>
            <ToggleMenu className='toggleMenu' isOpen={headerMenu.isOpen}>
                <ul className='inner'>
                    <li className='AllProjectList headerMenuList'>
                        <Link to='/allprojectlist' onClick={toggleOpen}><span><AiOutlineUnorderedList /></span>전체보기</Link>
                    </li>
                    <li className='headerMenuList'>
                        <Link to='/projecttypelist/의류' onClick={toggleOpen}><span><GrCoatCheck /></span>의류</Link>
                    </li>
                    <li className='headerMenuList'>
                        <Link to='/projecttypelist/식음료' onClick={toggleOpen}><span><BiDish /></span>식음료</Link>
                    </li>
                    <li className='headerMenuList'>
                        <Link to='/projecttypelist/취미' onClick={toggleOpen}><span><GrGamepad /></span>취미</Link>
                    </li>
                    <li className='headerMenuList'>
                        <Link to='/projecttypelist/도서' onClick={toggleOpen}><span><RiBook2Line /></span>도서</Link>
                    </li>
                    <li className='headerMenuList'>
                        <Link to='/projecttypelist/화장품' onClick={toggleOpen}><span><HiOutlineSparkles /></span>화장품</Link>
                    </li>
                </ul>
            </ToggleMenu>
            <div className='headerWrap'>
                <div className='header inner'>
                    <div className='headerTop'>
                        <Link to='/'><h1 className='headerLogo'>TEMPUS</h1></Link>
                        <ul>
                            {isLogged ? <li><Link to='/createproject'>프로젝트 등록</Link></li> : <li></li>}
                            {isLogged ? <li onClick={logout}>로그아웃</li> : <li><Link to='/login'>로그인</Link></li>}
                            <li>{isLogged ? <Link to={`/mypage/${userId}/*`}>내정보</Link> : <Link to='/signup'>회원가입</Link>}</li>
                        </ul>
                    </div>
                    <div className='headerBottom'>
                        <div className='headerLeft'>
                            <ToggleDiv isOpen={headerMenu.isOpen} className='toggle' onClick={toggleOpen}>
                                <ToggleSpan isOpen={headerMenu.isOpen}></ToggleSpan>
                                <ToggleSpan isOpen={headerMenu.isOpen}></ToggleSpan>
                                <ToggleSpan isOpen={headerMenu.isOpen}></ToggleSpan>
                            </ToggleDiv>
                            <ul>
                                <li>
                                    <Link to='/projectlist/인기' onClick={onClick} data-value="1">인기</Link>
                                    <span className={`headerLineSpan ${headerMenu.currentMenu === "1" ? 'bottomLine' : ''}`}></span>
                                </li>
                                <li>
                                    <Link to='/projectlist/신규' onClick={onClick} data-value="2">신규</Link>
                                    <span className={`headerLineSpan ${headerMenu.currentMenu === "2" ? 'bottomLine' : ''}`}></span>
                                </li>
                                <li>
                                    <Link to='/projectlist/마감임박' onClick={onClick} data-value="3">마감임박</Link>
                                    <span className={`headerLineSpan ${headerMenu.currentMenu === "3" ? 'bottomLine' : ''}`}></span>
                                </li>
                                <li>
                                    <Link to='/projectlist/공개예정' onClick={onClick} data-value="4">공개예정</Link>
                                    <span className={`headerLineSpan ${headerMenu.currentMenu === "4" ? 'bottomLine' : ''}`}></span>
                                </li>
                            </ul>
                        </div>
                        <div className='searchBox' onKeyDown={EnterSearchSend}>
                            <input type='text' name='search' value={search.searchWord} onChange={onSearchChange} />
                            <Link to='/searchresult' onClick={onSearchSend}><FiSearch className='searchBtn' /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;