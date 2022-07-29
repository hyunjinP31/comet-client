import React from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import { HiArrowNarrowRight } from 'react-icons/hi';

const TopRanking = () => {
    return (
        <section className='topRanking inner'>
            <div className='topTop topTitle inner'>
                <h2 className='sectionTitle'>인기</h2>
                <span><span>전체보기</span><HiArrowNarrowRight /></span>
            </div>
            <div className='topWrap contentWrap'>
                <div className='topRankingWrap contentView'>
                    <ul className='topProjects contentSlide'>
                        <li className='topBox contentItem'>
                            <div className='topImg'></div>
                            <div className='topText contextInnerText'>
                                <h3>제목</h3>
                                <p>간단한 설명</p>
                                <p>fromWho</p>
                            </div>
                        </li>
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