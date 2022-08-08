import React from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TopRanking = ({ topData, onClick }) => {
    if (!topData) return <div>loading</div>;
    
    return (
        <section className='topRanking inner'>
            <div className='topTop topTitle inner'>
                <h2 className='sectionTitle'>인기</h2>
                <span><span>전체보기</span><HiArrowNarrowRight /></span>
            </div>
            <div className='topWrap contentWrap'>
                <div className='topRankingWrap contentView'>
                    <ul className='topProjects contentSlide'>
                        {topData.map(data =>
                            <li className='topBox contentItem' key={data.id}>
                                <Link to={`projectDetail/${data.id}`} onClick={()=>onClick(data.id)}>
                                    <div className='topImg'></div>
                                    <div className='topText contextInnerText'>
                                        <h3>{data.projectName}</h3>
                                        <p>{data.projectPrice}</p>
                                        <p>{data.sellerName}</p>
                                    </div>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className='topProjectNav'>
                    <span className='topNavBtn topPrev PrevBtn NavBtn'><BsChevronLeft className='BtnArrow arrowLeft' /></span>
                    <span className='topNavBtn topNext NextBtn NavBtn'><BsChevronRight className='BtnArrow arrowRight' /></span>
                </div>
            </div>
        </section>
    );
};

export default TopRanking;