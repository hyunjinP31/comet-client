import React from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { IMG_URL } from '../../config/contansts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import 'swiper/css';
import "swiper/css/navigation";

const PotentUp = ({ potenData, onClick, heartfilling, heart, trickFullHeart, like, trickEmptyHeart }) => {
    if (!potenData) return;
    return (
        <section className='potentUp inner'>
            <div className='potenTop topTitle inner'>
                <h2 className='sectionTitle'>요즘 흥하는</h2>
            </div>
            <div className='potenWrap contentWrap'>
                <div className='potenView contentView'>
                <Swiper
                        className='potenProjects contentSlide mySwiper'
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
                                slidesPerView: 3,
                                slidesPerGroup: 3,
                            }
                        }}>
                        {potenData.map(data =>
                            <SwiperSlide  className='contentItem' key={data.id}>
                                <Link to={`projectDetail/${data.id}`} onClick={() => onClick(data.id)}>
                                    <div className='potenImg contentImg'>
                                        <img src={`${IMG_URL}/${data.projectImg}`} alt='프로젝트 사진' />
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
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default PotentUp;