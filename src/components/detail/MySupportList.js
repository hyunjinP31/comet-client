import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/contansts';
import Pagination from './Pagination';
import { RiFileList3Line } from 'react-icons/ri';

const MySupportList = ({support, total, limit, page, setPage, offset, isMsgBoxOpen, msgBox, supportCancel }) => {
    const totalPages = Math.ceil( total / limit );
    return (
        <div className='myProject myList'>
            <h2><RiFileList3Line className='listIcon' />내 후원내역</h2>
            <div className='myProjectWrap myListWrap'>
                <ul className='myProjectItems myListItems'>
                    {support.slice(offset, offset + limit).map(data =>
                        <div key={data.id}>
                            <li>
                                <Link to={`/projectdetail/${data.projectId}`}>
                                    <div className='myProjectImg myListImg'>
                                        <img src={`${API_URL}/upload/${data.projectImg}`} alt='내 프로젝트 사진' />
                                    </div>
                                    <div className='myProjectInfo myListInfo'>
                                        <h3>{data.projectTitle}</h3>
                                        <span><span className='myListSpan'>{data.releaseDate}</span> - <span className='myListSpan'>{data.deadLine}</span></span>
                                    </div>
                                    <div className='myProjectPay myListPay'>
                                        <h3>{data.achieve}</h3>
                                        <p>후원금액 : <span className='myListSpan'>{data.price}</span></p>
                                        <p>판매자: {data.sellerId}</p>
                                    </div>
                                </Link>
                                <p className='myListProjectBtn'>
                                    <button onClick={() => isMsgBoxOpen(data.id, data.projectTitle)} className='deleteProject projectBtn'>후원취소</button>
                                </p>
                            </li>
                        </div>
                    )}
                </ul>
                {msgBox.isOpen &&
                    <>
                        <div className='blackCoverBg' onClick={isMsgBoxOpen}></div>
                        <div className='whiteBox'>
                            <p className='msgBoxAlert'>정말로 후원을 <span>취소</span>하시겠습니까?</p>
                            <p className='msgBoxDelProject'>취소할 프로젝트:<span>{msgBox.msgBoxTitle}</span></p>
                            <p className='msgBoxBtns'><button className='msgBtn' onClick={() => supportCancel(msgBox.msgBoxTitle)}>확인</button><button className='msgBtn' onClick={isMsgBoxOpen}>취소</button></p>
                        </div>
                    </>}
                <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
            </div>
        </div>
    );
};

export default MySupportList;