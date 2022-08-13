import React from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/contansts';

const NewProject = ({ newData, onClick, onMove, currentIndex, heartfilling, heart, trickFullHeart, like, trickEmptyHeart }) => {
    if (!newData) return <div>loading</div>;
    return (
        <section className='newProject inner'>
            <div className='newTop topTitle inner'>
                <h2 className='sectionTitle'>신규</h2>
                <Link to='/projectlist/신규'></Link><span><span>전체보기</span><HiArrowNarrowRight /></span>
            </div>
            <div className='newWrap contentWrap'>
                <div className='newProjectView contentView'>
                    <ul style={{ transform: `translateX(${currentIndex.currentNew * 1200}px)` }} className='newProjects contentSlide'>
                        {newData.map(data =>
                            <li className='newProject contentItem' key={data.id}>
                                <Link to={`projectDetail/${data.id}`} onClick={() => onClick(data.id)}>
                                    <div className='newImg contentImg'>
                                        <img src={`${API_URL}/upload/${data.projectImg}`} alt='프로젝트 사진' />
                                    </div>
                                </Link>
                                <div className='newText contentInnerText'>
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
                <div className='newNav'>
                    <span style={{ display: currentIndex.currentNew >= 0 ? 'none' : '' }} className='newPrev newNavBtn NavBtn PrevBtn'>
                        <span onClick={onMove} className='coverUp' data-name='currentNew' data-value={1} ></span><BsChevronLeft className='BtnArrow arrowLeft' />
                    </span>
                    <span style={{ display: currentIndex.currentNew <= -1 ? 'none' : '' }} className='newNext newNavBtn NavBtn NextBtn'>
                        <span onClick={onMove} className='coverUp' data-name='currentNew' data-value={-1} ></span><BsChevronRight className='BtnArrow arrowRight' />
                    </span>
                </div>
            </div>
        </section>
    );
};

export default NewProject;