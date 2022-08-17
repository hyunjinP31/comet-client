import React from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { API_URL } from '../../config/contansts';

const ProjectDetail = ({ data, heart, heartfilling, trickFullHeart, like, trickEmptyHeart, giveASupport }) => {
    if (!data) return null;
    return (
        <div className='projectDetail inner'>
            <h2 className='pDetailTitle'>
                {data.projectTitle}
                <div className='pDetailAct'>
                    <span className='pDetailHit'>조회수: <span>{data.projectHits}</span></span>
                    <span className='heart' onClick={() => heartfilling(data, data.projectTitle)}>
                        <span>{heart ? (trickEmptyHeart !== [] ? (trickEmptyHeart.includes(data.projectTitle) ? <FaRegHeart className='trickEmptyHeart' /> : '') : '') : ''}</span>
                        <span>{heart ? (trickFullHeart !== [] ? (trickFullHeart.includes(data.projectTitle) ? <FaHeart className='pDetailfullHeart' /> : '') : '') : ''}</span>
                        <span>{heart ? (like.includes(data.projectTitle) ? <FaHeart className='pDetailfullHeart' /> : <FaRegHeart className='pDetailEmptyHeart' />) : <FaRegHeart className='pDetailEmptyHeart' />}</span>
                    </span>
                </div>
            </h2>
            <div className='projectDetailWrap'>
                <div className='pDetailImg'>
                    <img src={`${API_URL}/upload/${data.projectImg}`} alt='project' />
                </div>
                <div className='pDetailInfo'>
                    <ul>
                        <li className='pDetailAchieve'>
                            <p>{data.projectPrice}<span>원</span></p>
                        </li>
                        <li className='pDetailDeadline'>
                            <p>{data.deadLine}</p>
                        </li>
                        <li className='pDetailGoal'>
                            <p>{data.projectGoal}<span>원</span></p>
                        </li>
                        <li className='pDetailPeriod'>
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
                            <button className='pDetailBtn' onClick={()=>giveASupport(data)}>후원하기</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;