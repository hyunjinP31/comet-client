import React from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { IMG_URL } from '../../config/contansts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import 'swiper/css';
import "swiper/css/navigation";


const TopRanking = ({ topData, onClick, heartfilling, heart, trickFullHeart, like, trickEmptyHeart }) => {
    if (!topData) return;

    return (
        <section className='topRanking inner'>
            <div className='topTop topTitle inner'>
                <h2 className='sectionTitle'>인기</h2>
                <Link to='/projectlist/인기'><span><span>전체보기</span><HiArrowNarrowRight /></span></Link>
            </div>
            <div className='topWrap contentWrap'>
                <div className='topRankingWrap contentView'>
                    <Swiper
                        className='topProjects contentSlide mySwiper'
                        spaceBetween={10}
                        slidesPerView={2}
                        slidesPerGroup={2}
                        navigation={true}
                        modules={[Navigation]}
                        centeredSlides={false}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            768: {
                                spaceBetween: 30,
                                slidesPerView: 4,
                                slidesPerGroup: 4,
                            }
                        }}>
                        {topData.map(data =>
                            <SwiperSlide className='contentItem' key={data.id}>
                                <Link to={`projectDetail/${data.id}`} onClick={() => onClick(data.id)}>
                                    <div className='topImg contentImg'>
                                        <img src={`${IMG_URL}/${data.projectImg}`} alt='프로젝트 사진' />
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
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default TopRanking;