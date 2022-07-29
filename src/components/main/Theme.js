import React from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { HiArrowNarrowRight } from 'react-icons/hi'

const Theme = () => {
    //li width 조정
    return (
        <section className='theme inner'>
            <div className='thmemTop topTitle inner'>
                <h2 className='sectionTitle'>테마</h2>
                <span><span>전체보기</span><HiArrowNarrowRight /></span>
            </div>
            <div className='themeWrap contentWrap'>
                <div className='themeProjectView contentView'>
                    <ul className='themeSlide contentSlide'>
                        <li className='themeProject contentItem'>
                            <div className='themeImg'></div>
                            <div className='themeText contextInnerText'></div>
                        </li>
                    </ul>
                </div>
                <div className='themeNav'>
                    <span className='themePrev themeNavBtn NavBtn PrevBtn'><BsChevronLeft className='BtnArrow arrowLeft' /></span>
                    <span className='themeNext themeNavBtn NavBtn NextBtn'><BsChevronRight className='BtnArrow arrowRight' /></span>
                </div>
            </div>
        </section>
    );
};

export default Theme;