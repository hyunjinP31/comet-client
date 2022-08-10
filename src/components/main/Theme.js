import React from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/contansts';

const Theme = ({ themeData, onClick, onMovePrev, onMoveNext, currentIndex }) => {
    if (!themeData) return <div>loading</div>;
    //li width 조정
    return (
        <section className='theme inner'>
            <div className='thmemTop topTitle inner'>
                <h2 className='sectionTitle'>테마</h2>
                <span><span>전체보기</span><HiArrowNarrowRight /></span>
            </div>
            <div className='themeWrap contentWrap'>
                <div className='themeProjectView contentView'>
                    <ul style={{transform: `translateX(${currentIndex*1200}px)`}} className='themeSlide contentSlide'>
                        {themeData.map(data =>
                            <li className='themeProject contentItem' key={data.id}>
                                <Link to={`projectDetail/${data.id}`} onClick={() => onClick(data.id)}>
                                    <div className='themeImg contentImg'>
                                        <img src={`${API_URL}/upload/${data.projectImg}`} alt='프로젝트 사진' />
                                    </div>
                                    <div className='themeText contextInnerText'>
                                        <h3>{data.projectTitle}</h3>
                                        <p>{data.projectPrice}</p>
                                        <p>{data.sellerName}</p>
                                    </div>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className='themeNav'>
                    <span data-name='leftBtn' onClick={onMovePrev} className='themePrev themeNavBtn NavBtn PrevBtn'>
                        <span className='coverUp' ></span><BsChevronLeft className='BtnArrow arrowLeft' />
                    </span>
                    <span data-name='rightBtn' onClick={onMoveNext} className='themeNext themeNavBtn NavBtn NextBtn'>
                        <span className='coverUp' ></span><BsChevronRight className='BtnArrow arrowRight' />
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Theme;