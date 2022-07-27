import React, { useEffect, useRef, useState } from 'react';

const MainSlide = () => {

    const backColors = ['#0f4c81', '#1b315e', '#864e79']
    const [currentIndex, setCurrnetIndex] = useState(1)
    const slideReplace = useRef();

    //슬라이드 앞/뒤 clone 배치
    const setSlides = () => {
        const addedLast = backColors[0];
        const addedFront = backColors[backColors.length - 1];
        return [addedFront, ...backColors, addedLast];
    }
    let slides = setSlides();

    //슬라이드 대체(눈속임)
    const replaceSlide = index => {
        setTimeout(function () {
            slideReplace.current.style.transition = '0s';
            setCurrnetIndex(index);
        }, 200)
    }

    //slide 이동 핸들러(버튼)
    const handleSwipe = direction => {
        if (slideReplace.current !== undefined) slideReplace.current.style.transition = '0.2s';
        setCurrnetIndex(currentIndex + direction);
    }
    //slide 무한 이동
    const Interval = (callback, delay) => {
        const savedCallback = useRef();
        useEffect(() => {
            savedCallback.current = callback;
            if (currentIndex === 0) {
                // 0 + 5
                replaceSlide(3);
            }
            else if (currentIndex === 4) {
                replaceSlide(1);
            }
        }, [callback]);
        useEffect(() => {
            function tick() {
                slideReplace.current.style.transition = '0.2s';
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay])
    }


    //slide 이동 핸들러(자동)
    Interval(() => {
        setCurrnetIndex(currentIndex => currentIndex + 1);
    }, 4000)

    return (
        <section className='mainSlider'>
            <div className='sliderWrap'>
                <div className='sliderView'>
                    <div className='sliderList'
                        style={{
                            transform: `translateX(${(-100 / slides.length) * currentIndex}%)`,
                            width: `${slides.length * 100}vw`
                        }}
                        ref={slideReplace}>
                        {
                            slides.map((slide, slideIndex) => {
                                return (
                                    <div key={slideIndex}
                                        className='sliderItem'
                                        style={{ background: slide, width: 100 / slides.length + '%' }}>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='sliderIndis'>
                        {
                            backColors.map((item, index)=>{
                                return <span key={index}
                                onClick={(e)=> setCurrnetIndex(parseInt(e.target.dataset.value))}
                                data-value={index+1}
                                className={`sliderIndi ${index + 1 === currentIndex ? 'currentIndi' : '' ||
                                index === 2 ? (currentIndex === 0 ? 'currentIndi': '') : '' ||
                                index === 0 ? (currentIndex === slides.length - 1 ? 'currentIndi' : '') : ''}`}
                                ></span>;
                            })
                        }
                </div>
                <div className='sliderNav'>
                    <span className='prevBtn sliderBtn' onClick={() => handleSwipe(-1)}></span>
                    <span className='nextBtn sliderBtn' onClick={() => handleSwipe(1)}></span>
                </div>
            </div>
        </section>
    );
};

export default MainSlide;