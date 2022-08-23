import React from 'react';
import Marquee from 'react-fast-marquee';
import { HiArrowNarrowRight } from 'react-icons/hi'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { IMG_URL } from '../../config/contansts';

const Imminent = ({ immiData, onClick, heartfilling, heart, trickFullHeart, like, trickEmptyHeart }) => {
    if (!immiData) return <div>loading</div>;
    return (
        <section className='imminent contentWrap'>
            <div className='immiTop topTitle inner'>
                <h2 className='sectionTitle'>마감임박</h2>
                <Link to='/projectlist/마감임박'></Link><span><span>전체보기</span><HiArrowNarrowRight /></span>
            </div>
            <Marquee pauseOnHover={true} speed={54} gradient={false}>
                <ul className='immiProjects contentSlide'>
                    {immiData.map(data =>
                        <li className='immiProject contentItem' key={data.id}>
                            <Link to={`projectDetail/${data.id}`} onClick={() => onClick(data.id)}>
                                <div className='immiImg contentImg'>
                                    <img src={`${IMG_URL}/${data.projectImg}`} alt='프로젝트 사진' />
                                </div>
                            </Link>
                            <div className='immiText contentInnerText'>
                            <span className='heart'>{heart ? (trickEmptyHeart !== [] ? (trickEmptyHeart.includes(data.projectTitle) ? <FaRegHeart className='trickEmptyHeart' /> : '') : '') : ''}</span>
                                <span className='heart'>{heart ? (trickFullHeart !== [] ? (trickFullHeart.includes(data.projectTitle) ? <FaHeart className='fullHeart' /> : '') : '') : ''}</span>
                                <span className='heart' onClick={() => heartfilling(data, data.projectTitle)}>{heart ? (like.includes(data.projectTitle) ? <FaHeart className='fullHeart' /> : <FaRegHeart className='emptyHeart' />) : <FaRegHeart className='emptyHeart' />}</span>
                                <Link to={`projectDetail/${data.id}`} onClick={() => onClick(data.id)}>
                                    <h3>{data.projectTitle}</h3>
                                    <p>마감일 <span>{data.deadLine}</span></p>
                                </Link>
                            </div>
                        </li>
                    )}
                </ul>
            </Marquee>
        </section>
    );
};

export default Imminent;