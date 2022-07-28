import React from 'react';
import Marquee from 'react-fast-marquee';

const Theme = () => {
    //li width 조정
    return (
        <section className='theme contentWrap'>
            <Marquee pauseOnHover={true} speed={54} gradient={false}>
                <ul className='themeSlide contentSlide'>
                    <li className='contentItem'>
                        <div className='themeImg'></div>
                        <div className='themeText contextInnerText'></div>
                    </li>
                </ul>
            </Marquee>
        </section>
    );
};

export default Theme;