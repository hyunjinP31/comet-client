import React from 'react';
import { BsSuitHeartFill } from 'react-icons/bs';

const ProjectDetail = ({data}) => {
    return (
        <div className='projectDetail inner'>
            <h2 className='pDetailTitle'>{data.projectTitle}</h2>
            <div className='projectDetailWrap'>
                <div className='pDetailImg'>
                    <img src={`${process.env.PUBLIC_URL}/images/projects/project1.png`} alt='project' />
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
                        <li className='pDetailLikes pDetailflexLi'>
                            <div className='pDetailHit'>조회수: <span>{data.projectHits}</span></div>
                            <div className='pDetailHeart'>{BsSuitHeartFill}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;