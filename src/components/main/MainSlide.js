import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";

const MainSlide = () => {

    const backColors = ['images/mainSlide/slide_5.png', 'images/mainSlide/slide_18.jpg', 'images/mainSlide/slide_17.jpg']

    //슬라이드 앞/뒤 clone 배치
    const setSlides = () => {
        return [...backColors];
    }
    let slides = setSlides();

    return (
        <section className='mainSlider'>
            <div className='sliderWrap'>
                <div className='sliderView'>
                    <Swiper 
                    className='sliderList mySwiper'
                    spaceBetween={30}
                    slidesPerView={1}
                    modules={[Pagination, Autoplay]}
                    centeredSlides={false}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false
                    }}
                    pagination={{
                      clickable: true,
                    }}>
                        {
                            slides.map((slide, slideIndex) => {
                                return (
                                    <SwiperSlide key={slideIndex}
                                        className='sliderItem'
                                        style={{ background: `url(${slide})center center/cover no-repeat`, width: 100 / slides.length + '%' }}>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default MainSlide;