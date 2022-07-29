import React from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { HiArrowNarrowRight } from 'react-icons/hi'

const NewProject = () => {
    return (
        <section className='newProject inner'>
            <div className='newTop topTitle inner'>
                <h2 className='sectionTitle'>신규</h2>
                <span><span>전체보기</span><HiArrowNarrowRight /></span>
            </div>
            <div className='newWrap contentWrap'>
                <div className='newProjectView contentView'>
                    <ul className='newProjects contentSlide'>
                        <li className='newProject contentItem'>
                            <div className='newImg'></div>
                            <div className='newText contextInnerText'></div>
                        </li>
                    </ul>
                </div>
                <div className='newNav'>
                    <span className='newPrev newNavBtn NavBtn PrevBtn'><BsChevronLeft className='BtnArrow arrowLeft' /></span>
                    <span className='newNext newNavBtn NavBtn NextBtn'><BsChevronRight className='BtnArrow arrowRight' /></span>
                </div>
            </div>
        </section>
    );
};

export default NewProject;