import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { IMG_URL } from '../../config/contansts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import 'swiper/css';
import "swiper/css/navigation";

const NewProject = ({ newData, onClick, heartfilling, heart, trickFullHeart, like, trickEmptyHeart }) => {
    if (!newData) return;
    return (
        <section className='newProject inner'>
            <div className='newTop topTitle inner'>
                <h2 className='sectionTitle'>신규</h2>
                <Link to='/projectlist/신규'></Link><span><span>전체보기</span><HiArrowNarrowRight /></span>
            </div>
            <div className='newWrap contentWrap'>
                <div className='newProjectView contentView'>
                    <Swiper
                        className='topProjects contentSlide mySwiper'
                        spaceBetween={30}
                        slidesPerView={3}
                        slidesPerGroup={3}
                        navigation={true}
                        modules={[Navigation]}
                        centeredSlides={false}
                        pagination={{
                          clickable: true,
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 5,
                                slidesPerGroup: 5,
                            }
                        }}>
                        {newData.map(data =>
                            <SwiperSlide  className='contentItem' key={data.id}>
                                <Link to={`projectDetail/${data.id}`} onClick={() => onClick(data.id)}>
                                    <div className='newImg contentImg'>
                                        <img src={`${IMG_URL}/${data.projectImg}`} alt='프로젝트 사진' />
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
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default NewProject;