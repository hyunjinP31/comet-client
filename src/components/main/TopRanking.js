import React from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/contansts';

const TopRanking = ({ topData, onClick, onMove, currentIndex, heartfilling, heart, trickFullHeart, like, trickEmptyHeart}) => {
    if (!topData) return <div>loading</div>;

    return (
        <section className='topRanking inner'>
            <div className='topTop topTitle inner'>
                <h2 className='sectionTitle'>인기</h2>
                <Link to='/projectlist/인기'><span><span>전체보기</span><HiArrowNarrowRight /></span></Link>
            </div>
            <div className='topWrap contentWrap'>
                <div className='topRankingWrap contentView'>
                    <ul style={{ transform: `translateX(${currentIndex.currentTop * 1200}px)` }} className='topProjects contentSlide'>
                        {topData.map(data =>
                            <li className='topBox contentItem' key={data.id}>
                                <Link to={`projectDetail/${data.id}`} onClick={() => onClick(data.id)}>
                                    <div className='topImg contentImg'>
                                        <img src={`${API_URL}/upload/${data.projectImg}`} alt='프로젝트 사진' />
                                    </div>
                                </Link>
                                <div className='topText contentInnerText'>
                                    <span className='heart' onClick={() => heartfilling(data, data.projectTitle)}>
                                        <span>{heart ? (trickEmptyHeart !== [] ? (trickEmptyHeart.includes(data.projectTitle) ? <FaRegHeart className='trickEmptyHeart' /> : '') : '') : ''}</span>
                                        <span>{heart ? (trickFullHeart !== [] ? (trickFullHeart.includes(data.projectTitle) ? <FaHeart className='fullHeart' /> : '') : '') : ''}</span>
                                        <span>{heart ? (like.includes(data.projectTitle) ? <FaHeart className='fullHeart' /> : <FaRegHeart className='emptyHeart' />) : <FaRegHeart className='emptyHeart' />}</span>
                                    </span>
                                    <Link to={`projectDetail/${data.id}`} onClick={() => onClick(data.id)}>
                                        <h3>{data.projectTitle}</h3>
                                        <p>{data.projectPrice}</p>
                                        <p>{data.sellerName}</p>
                                    </Link>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                <div className='topProjectNav'>
                    <span data-name='currentTop' style={{ display: currentIndex.currentTop >= 0 ? 'none' : '' }} data-value={1} onClick={onMove} className='topNavBtn topPrev NavBtn PrevBtn'>
                        <span className='coverUp' data-name='currentTop' data-value={1} ></span><BsChevronLeft className='BtnArrow arrowLeft' />
                    </span>
                    <span data-name='currentTop' style={{ display: currentIndex.currentTop <= -2 ? 'none' : '' }} data-value={-1} onClick={onMove} className='topNavBtn topNext NavBtn NextBtn'>
                        <span className='coverUp' data-name='currentTop' data-value={-1} ></span><BsChevronRight className='BtnArrow arrowRight' />
                    </span>
                </div>
            </div>
        </section>
    );
};

export default TopRanking;