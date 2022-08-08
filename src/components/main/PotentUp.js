import React from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom';

const PotentUp = ({ potenData, onClick }) => {
    if (!potenData) return <div>loading</div>;
    return (
        <section className='potentUp inner'>
            <div className='potenTop topTitle inner'>
                <h2 className='sectionTitle'>요즘 흥하는</h2>
                <span><span>전체보기</span><HiArrowNarrowRight /></span>
            </div>
            <div className='potenWrap contentWrap'>
                <div className='potenView contentView'>
                    <ul className='potenProjects contentSlide'>
                        {potenData.map(data =>
                            <li className='potenProject contentItem' key={data.id}>
                                <Link to={`projectDetail/${data.id}`} onClick={()=>onClick(data.id)}>
                                    <div className='potenImg'></div>
                                    <div className='potenText contextInnerText'></div>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className='potenNav'>
                    <span className='potenPrev potenNavBtn NavBtn PrevBtn'><BsChevronLeft className='BtnArrow arrowLeft' /></span>
                    <span className='potenNext potenNavBtn NavBtn NextBtn'><BsChevronRight className='BtnArrow arrowRight' /></span>
                </div>
            </div>
        </section>
    );
};

export default PotentUp;