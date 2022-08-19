import React from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { API_URL } from '../../config/contansts';
import { AiOutlineSmile } from 'react-icons/ai';

const ProjectDetail = ({ data, heart, heartfilling, trickFullHeart, like, trickEmptyHeart, giveASupport, supTitle, supportCancel, myTitle,isMsgBoxOpen, msgBox }) => {
    if (!data) return null;
    return (
        <div className='projectDetail inner'>
            <div className='pDetailTitle'>
                <h2>{data.projectTitle}</h2>
                <div className='pDetailAct'>
                    <span className='pDetailHit'>조회수: <span>{data.projectHits}</span></span>
                    <span className='heart' onClick={() => heartfilling(data, data.projectTitle)}>
                        <span>{heart ? (trickEmptyHeart !== [] ? (trickEmptyHeart.includes(data.projectTitle) ? <FaRegHeart className='trickEmptyHeart' /> : '') : '') : ''}</span>
                        <span>{heart ? (trickFullHeart !== [] ? (trickFullHeart.includes(data.projectTitle) ? <FaHeart className='pDetailfullHeart' /> : '') : '') : ''}</span>
                        <span>{heart ? (like.includes(data.projectTitle) ? <FaHeart className='pDetailfullHeart' /> : <FaRegHeart className='pDetailEmptyHeart' />) : <FaRegHeart className='pDetailEmptyHeart' />}</span>
                    </span>
                </div>
            </div>
            <div className='projectDetailWrap'>
                <div className='pDetailImg'>
                    <img src={`${API_URL}/upload/${data.projectImg}`} alt='project' />
                </div>
                <div className='pDetailInfo'>
                    <ul>
                        <li className='pDetailAchieve'>
                            <p>{data.achieve}<span>% 달성</span></p>
                        </li>
                        <li className='pDetailDeadline'>
                            <p>{data.deadLine}</p>
                        </li>
                        <li className='projectPrice'>
                            <p>{data.price}<span>원</span></p>
                        </li>
                        <li className='pDetailPeriod'>
                            <span>목표금액: <span className='projectGoal'>{data.goal}</span> 원</span>
                            <span><span>{data.releaseDate}</span>~<span>{data.deadLine}</span></span>
                        </li>
                        <li className='pDetaiKind pDetailflexLi'>
                            <div className='pDetailType'>
                                <span>{data.projectType}</span>
                            </div>
                            <div className='pDetailTag'>
                                <span>{data.projectKeyword}</span>
                            </div>
                        </li>
                        <li className='pDetailFunding'>
                            {
                                supTitle !== [] ? (myTitle.includes(data.projectTitle) ? <button className='pDetailBtn pDetailMyProjectBtn' disabled><span>내가 올린 프로젝트예요</span><AiOutlineSmile className='smilyFace'/></button> :
                                (supTitle.includes(data.projectTitle) ?
                                <button className='pDetailBtn pDetailBtnDelete' onClick={()=>isMsgBoxOpen(data.id, data.projectTitle)}>후원 취소하기</button> :
                                <button className='pDetailBtn' onClick={()=>giveASupport(data)}>후원하기</button>)) :
                                <button className='pDetailBtn' onClick={()=>giveASupport(data)}>후원하기</button>
                            }
                        </li>
                    </ul>
                    {msgBox.isOpen &&
                                <>
                                    <div className='blackCoverBg' onClick={isMsgBoxOpen}></div>
                                    <div className='whiteBox'>
                                            <p className='msgBoxAlert'>정말로 <span>취소</span>하시겠습니까?</p>
                                            <p className='msgBoxDelProject'>선택한 프로젝트 : <span>{msgBox.msgBoxTitle}</span></p>
                                            <p className='msgBoxBtns'><button className='msgBtn' onClick={()=>supportCancel(msgBox.msgBoxTitle)}>확인</button><button className='msgBtn' onClick={isMsgBoxOpen}>취소</button></p>
                                    </div>
                    </>}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;