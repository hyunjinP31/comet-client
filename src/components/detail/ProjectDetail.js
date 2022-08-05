import React from 'react';
import { BsSuitHeartFill } from 'react-icons/bs';

const ProjectDetail = () => {
    return (
        <div className='projectDetail inner'>
            <h2 className='pDetailTitle'>ㅎㅎㅎ</h2>
            <div className='projectDetailWrap'>
                <div className='pDetailImg'>
                    <img src={`${process.env.PUBLIC_URL}/images/projects/project1.png`} alt='project' />
                </div>
                <div className='pDetailInfo'>
                    <ul>
                        <li className='pDetailAchieve'>
                            <p>345,435,353<span>원</span></p>
                        </li>
                        <li className='pDetailDeadline'>
                            <p>2022년 09월 05일</p>
                        </li>
                        <li className='pDetailGoal'>
                            <p>1,000,000<span>원</span></p>
                        </li>
                        <li className='pDetailPeriod'>
                            <span><span>2022년 08월 01일</span>~<span>2022년 09월 01일</span></span>
                        </li>
                        <li className='pDetaiKind pDetailflexLi'>
                            <div className='pDetailType'>
                                <span>의류</span>
                            </div>
                            <div className='pDetailTag'>
                                <span>인기</span>
                            </div>
                        </li>
                        <li className='pDetailLikes pDetailflexLi'>
                            <div className='pDetailHit'>조회수: <span>0</span></div>
                            <div className='pDetailHeart'>{BsSuitHeartFill}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;