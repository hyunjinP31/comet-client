import React from 'react';
import { Link } from 'react-router-dom';
import { IMG_URL } from '../../config/contansts';
import Pagination from './Pagination';
import { RiFileList3Line } from 'react-icons/ri';

const MyProjectList = ({ myData, projectDelete, isMsgBoxOpen, msgBox, total, limit, page, setPage, offset }) => {
    const totalPages = Math.ceil( total / limit );
    return (
        <div className='myProject myList'>
            <h2><RiFileList3Line className='listIcon' />내 프로젝트</h2>
            <div className='myProjectWrap myListWrap'>
                <ul className='myProjectItems myListItems'>
                    {myData.slice(offset, offset + limit).map(data =>
                        <div key={data.id}>
                            <li>
                                <Link to={`/projectdetail/${data.id}`}>
                                    <div className='myProjectImg myListImg'>
                                        <img src={`${IMG_URL}/${data.projectImg}`} alt='내 프로젝트 사진' />
                                    </div>
                                    <div className='myProjectInfo myListInfo'>
                                        <h3>{data.projectTitle}</h3>
                                        <span><span className='myListSpan'>{data.releaseDate}</span> - <span className='myListSpan'>{data.deadLine}</span></span>
                                    </div>
                                    <div className='myProjectPay myListPay'>
                                        <h3>achievement 달성</h3>
                                        <p>키워드: '' ''</p>
                                        <p>조회수 : <span className='myListSpan'>{data.projectHits}</span></p>
                                    </div>
                                </Link>
                                <p className='myListProjectBtn'>
                                    <Link to={`/projectedit/${data.id}`}><button className='editProject projectBtn'>수정</button></Link>
                                    <button onClick={() => isMsgBoxOpen(data.id, data.projectTitle)} className='deleteProject projectBtn'>삭제</button>
                                </p>
                            </li>
                            {msgBox.isOpen &&
                                <>
                                    <div className='blackCoverBg' onClick={isMsgBoxOpen}></div>
                                    <div className='whiteBox'>
                                            <p className='msgBoxAlert'>정말로 <span>삭제</span>하시겠습니까?</p>
                                            <p className='msgBoxDelProject'>삭제될 프로젝트:<span>{msgBox.msgBoxTitle}</span></p>
                                            <p className='msgBoxBtns'><button className='msgBtn' onClick={() => projectDelete(msgBox.msgBoxId)}>확인</button><button className='msgBtn' onClick={isMsgBoxOpen}>취소</button></p>
                                    </div>
                                </>}
                        </div>
                    )}
                </ul>
                <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
            </div>
        </div>
    );
};

export default MyProjectList;