import React from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/contansts';

const TopRanking = ({ topData, onClick, onMove, currentIndex }) => {
    if (!topData) return <div>loading</div>;
    
    return (
        <section className='topRanking inner'>
            <div className='topTop topTitle inner'>
                <h2 className='sectionTitle'>인기</h2>
                <span><span>전체보기</span><HiArrowNarrowRight /></span>
            </div>
            <div className='topWrap contentWrap'>
                <div className='topRankingWrap contentView'>
                    <ul style={{transform: `translateX(${currentIndex*1200}px)`}} className='topProjects contentSlide'>
                        {topData.map(data =>
                            <li className='topBox contentItem' key={data.id}>
                                <Link to={`projectDetail/${data.id}`} onClick={()=>onClick(data.id)}>
                                    <div className='topImg contentImg'>
                                        <img src={`${API_URL}/upload/${data.projectImg}`} alt='프로젝트 사진' />
                                    </div>
                                    <div className='topText contextInnerText'>
                                        <h3>{data.projectTitle}</h3>
                                        <p>{data.projectPrice}</p>
                                        <p>{data.sellerName}</p>
                                    </div>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className='topProjectNav'>
                <span data-name='leftBtn' data-value={1} onClick={onMove} className='topNavBtn topPrev NavBtn PrevBtn'>
                        <span className='coverUp' data-value={1} ></span><BsChevronLeft className='BtnArrow arrowLeft' />
                    </span>
                    <span data-name='rightBtn' data-value={-1} onClick={onMove} className='topNavBtn topNext NavBtn NextBtn'>
                        <span className='coverUp' data-value={-1} ></span><BsChevronRight className='BtnArrow arrowRight' />
                    </span>
                </div>
            </div>
        </section>
    );
};

export default TopRanking;