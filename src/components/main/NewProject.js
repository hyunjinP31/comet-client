import React from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/contansts';

const NewProject = ({ newData, onClick }) => {
    if (!newData) return <div>loading</div>;
    return (
        <section className='newProject inner'>
            <div className='newTop topTitle inner'>
                <h2 className='sectionTitle'>신규</h2>
                <span><span>전체보기</span><HiArrowNarrowRight /></span>
            </div>
            <div className='newWrap contentWrap'>
                <div className='newProjectView contentView'>
                    <ul className='newProjects contentSlide'>
                        {newData.map(data =>
                            <li className='newProject contentItem' key={data.id}>
                                <Link to={`projectDetail/${data.id}`} onClick={() => onClick(data.id)}>
                                    <div className='newImg contentImg'>
                                        <img src={`${API_URL}/upload/${data.projectImg}`} alt='프로젝트 사진' />
                                    </div>
                                    <div className='newText contextInnerText'>
                                        <h3>{data.projectTitle}</h3>
                                        <p>{data.projectPrice}</p>
                                        <p>{data.sellerName}</p>
                                    </div>
                                </Link>
                            </li>
                        )}
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