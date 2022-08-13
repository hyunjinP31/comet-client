import React from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/contansts';

const Theme = ({ themeData, onClick, onMove, currentIndex, heartfilling, heart, trickFullHeart, like, trickEmptyHeart }) => {
    if (!themeData) return <div>loading</div>;
    return (
        <section className='theme inner'>
            <div className='thmemTop topTitle inner'>
                <h2 className='sectionTitle'>테마</h2>
            </div>
            <div className='themeWrap contentWrap'>
                <div className='themeProjectView contentView'>
                    <ul style={{ transform: `translateX(${currentIndex.currentTheme * 1200}px)` }} className='themeSlide contentSlide'>
                        {themeData.map(data =>
                            <li className='themeProject contentItem' key={data.id}>
                                <Link to={`projectDetail/${data.id}`} onClick={() => onClick(data.id)}>
                                    <div className='themeImg contentImg'>
                                        <img src={`${API_URL}/upload/${data.projectImg}`} alt='프로젝트 사진' />
                                    </div>
                                </Link>
                                <div className='themeText contentInnerText'>
                                    <span className='heart'>{heart ? (trickEmptyHeart !== [] ? (trickEmptyHeart.includes(data.projectTitle) ? <FaRegHeart className='trickEmptyHeart' /> : '') : '') : ''}</span>
                                    <span className='heart'>{heart ? (trickFullHeart !== [] ? (trickFullHeart.includes(data.projectTitle) ? <FaHeart className='fullHeart' /> : '') : '') : ''}</span>
                                    <span className='heart' onClick={() => heartfilling(data, data.projectTitle)}>{heart ? (like.includes(data.projectTitle) ? <FaHeart className='fullHeart' /> : <FaRegHeart className='emptyHeart' />) : <FaRegHeart className='emptyHeart' />}</span>
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
                <div className='themeNav'>
                    <span style={{ display: currentIndex.currentTheme >= 0 ? 'none' : '' }} className='themePrev themeNavBtn NavBtn PrevBtn'>
                        <span className='coverUp' onClick={onMove} data-name='currentTheme' data-value={1} ></span><BsChevronLeft className='BtnArrow arrowLeft' />
                    </span>
                    <span style={{ display: currentIndex.currentTheme <= -1 ? 'none' : '' }} className='themeNext themeNavBtn NavBtn NextBtn'>
                        <span className='coverUp' onClick={onMove} data-name='currentTheme' data-value={-1} ></span><BsChevronRight className='BtnArrow arrowRight' />
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Theme;