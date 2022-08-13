import React from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/contansts';

const PotentUp = ({ potenData, onClick, onMove, currentIndex, heartfilling, heart, trickFullHeart, like, trickEmptyHeart }) => {
    if (!potenData) return <div>loading</div>;
    return (
        <section className='potentUp inner'>
            <div className='potenTop topTitle inner'>
                <h2 className='sectionTitle'>요즘 흥하는</h2>
            </div>
            <div className='potenWrap contentWrap'>
                <div className='potenView contentView'>
                    <ul style={{ transform: `translateX(${currentIndex.currentPoten * 1200}px)` }} className='potenProjects contentSlide'>
                        {potenData.map(data =>
                            <li className='potenProject contentItem' key={data.id}>
                                <Link to={`projectDetail/${data.id}`} onClick={() => onClick(data.id)}>
                                    <div className='potenImg contentImg'>
                                        <img src={`${API_URL}/upload/${data.projectImg}`} alt='프로젝트 사진' />
                                    </div>
                                </Link>
                                <div className='potenText contentInnerText'>
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
                <div className='potenNav'>
                    <span style={{ display: currentIndex.currentPoten >= 0 ? 'none' : '' }} className='potenPrev potenNavBtn NavBtn PrevBtn'>
                        <span className='coverUp' onClick={onMove} data-name='currentPoten' data-value={1} ></span><BsChevronLeft className='BtnArrow arrowLeft' />
                    </span>
                    <span style={{ display: currentIndex.currentPoten <= -2 ? 'none' : '' }} className='potenNext potenNavBtn NavBtn NextBtn'>
                        <span className='coverUp' onClick={onMove} data-name='currentPoten' data-value={-1} ></span><BsChevronRight className='BtnArrow arrowRight' />
                    </span>
                </div>
            </div>
        </section>
    );
};

export default PotentUp;