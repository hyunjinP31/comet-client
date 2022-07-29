import React from 'react';
import Marquee from 'react-fast-marquee';
import { HiArrowNarrowRight } from 'react-icons/hi'

const Imminent = () => {
    return (
        <section className='imminent contentWrap'>
            <div className='immiTop topTitle inner'>
                <h2 className='sectionTitle'>공개예정</h2>
                <span><span>전체보기</span><HiArrowNarrowRight /></span>
            </div>
            <Marquee pauseOnHover={true} speed={54} gradient={false}>
                <ul className='immiProjects contentSlide'>
                    <li className='immiProject contentItem'>
                        <div className='immiImg'></div>
                        <div className='immiText contextInnerText'></div>
                    </li>
                </ul>
            </Marquee>
        </section>
    );
};

export default Imminent;