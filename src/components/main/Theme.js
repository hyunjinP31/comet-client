import React from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom';

const Theme = ({ themeData }) => {
    if (!themeData) return <div>loading</div>;
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
                        {themeData.map(data =>
                            <li className='themeProject contentItem' key={data.id}>
                                <Link to={`projectDetail/${data.id}`}>
                                    <div className='themeImg'></div>
                                    <div className='themeText contextInnerText'></div>
                                </Link>
                            </li>
                        )}
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