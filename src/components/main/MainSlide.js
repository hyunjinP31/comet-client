import React, { useEffect, useRef, useState } from 'react';

const MainSlide = () => {
    const backColors = ['#0f4c81', '#1b315e', '#864e79']
    const [currentIndex, setCurrnetIndex] = useState(1)
    const slideReplace = useRef();
    //슬라이드 앞/뒤 clone 배치
    const setSlides = ()=>{
        const addedLast = backColors[0];
        const addedFront = backColors[backColors.length - 1];
        return [addedFront, ...backColors, addedLast];
    }
    let slides = setSlides();
    //인덱스 조정
    const getItemIndex = index => {
        index -= 1;
        if(index < 0){
            index += slides.length;
        }else if(index >= slides.length){
            index -= slides.length;
        }
        return index;
    }
    //슬라이드 대체(눈속임)
    const replaceSlide = index => {
        setTimeout(()=>{
            setCurrnetIndex(index);
            slideReplace.current.style.transition = '0s';
        }, 500)
    }

    //slide 이동 핸들러(버튼)
    const handleSwipe = direction => {
        setCurrnetIndex(currentIndex + direction);
    }

    const useInterval = (callback, delay) => {
        const savedCallback = useRef();
        useEffect(() => {
            savedCallback.current = callback;
            if (currentIndex === 0) {
                // currentIndex + slides.length - 2
                replaceSlide(3);
            }
            else if (currentIndex === 4) {
                replaceSlide(1);
            }
        }, [callback]);
        useEffect(()=>{
            function tick(){
                //해당 useRef가 함수를 가르키고 있기 때문에 함수 실행을 위해 소괄호 붙임
                savedCallback.current();
            }
            if(delay !== null){
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        },[delay])
    }

    //slide 이동 핸들러(자동)
    useInterval(() => {
        setCurrnetIndex(currentIndex => currentIndex + 1);
    }, 2000)
    //slide 이동 핸들러(무한)
    


    return (
        <section className='mainSlider'>
            <div className='sliderWrap'>
                <div className='sliderView'>
                    <div className='sliderList'
                    style={{ transform: `translateX(${(-100 / slides.length)* currentIndex}%)`,
                    width: `${slides.length * 100}vw`}}
                    ref={slideReplace}
                    >
                        {
                            slides.map((slide, slideIndex) => {
                                const itemIndex = getItemIndex(slideIndex);
                                return (
                                    <div key={slideIndex}
                                    className='sliderItem'
                                    style={{ background: slide, width: 100 / slides.length+'%' }}>
                                        {slideIndex}({itemIndex})
                                    </div>
                                )

                            }
                            )
                        }
                    </div>
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