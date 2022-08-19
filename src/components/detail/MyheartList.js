import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/contansts';
import Pagination from './Pagination';
import { FaHeart } from 'react-icons/fa'

const MyheartList = ({ heart, total, limit, page, setPage, offset, msgBox, isMsgBoxOpen, heartDelete }) => {
    const totalPages = Math.ceil(total / limit);
    return (
        <div className='myHeart myList'>
            <h2><FaHeart className='listIcon' />찜목록</h2>
            <div className='myHeartWrap myListWrap'>
                <ul className='myHeartItems myListItems'>
                    {heart.slice(offset, offset + limit).map(data =>
                        <li key={data.id}>
                            <Link to={`/projectdetail/${data.projectId}`}>
                                <div className='myHeartImg myListImg'>
                                    <img src={`${API_URL}/upload/${data.projectImg}`} alt='내 프로젝트 사진' />
                                </div>
                                <div className='myHeartInfo myListInfo'>
                                    <h3>{data.projectTitle}</h3>
                                    <span><span className='myListSpan'>{data.releaseDate}</span> - <span className='myListSpan'>{data.deadLine}</span></span>
                                </div>
                                <div className='myHeartPay myListPay'>
                                    <h3>{data.projectPrice}</h3>
                                    <p>achievement 달성</p>
                                    <p>판매자 : <span className='myListSpan'>{data.sellerId}</span></p>
                                </div>
                            </Link>
                            <p className='myListProjectBtn'>
                                <button onClick={() => isMsgBoxOpen(data.id, data.projectTitle)} className='deleteProject projectBtn'>삭제</button>
                            </p>
                        </li>
                    )}
                </ul>
                <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            </div>
            {msgBox.isOpen &&
                <>
                    <div className='blackCoverBg' onClick={isMsgBoxOpen}></div>
                    <div className='whiteBox'>
                        <p className='msgBoxAlert'>정말로 <span>삭제</span>하시겠습니까?</p>
                        <p className='msgBoxDelProject'>삭제될 프로젝트:<span>{msgBox.msgBoxTitle}</span></p>
                        <p className='msgBoxBtns'><button className='msgBtn' onClick={() => heartDelete(msgBox.msgBoxTitle)}>확인</button><button className='msgBtn' onClick={isMsgBoxOpen}>취소</button></p>
                    </div>
                </>}
        </div >
    );
};

export default MyheartList;