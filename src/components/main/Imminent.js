import React from 'react';
import Marquee from 'react-fast-marquee';
import { HiArrowNarrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/contansts';

const Imminent = ({ immiData, onClick }) => {
    if (!immiData) return <div>loading</div>;
    return (
        <section className='imminent contentWrap'>
            <div className='immiTop topTitle inner'>
                <h2 className='sectionTitle'>공개예정</h2>
                <span><span>전체보기</span><HiArrowNarrowRight /></span>
            </div>
            <Marquee pauseOnHover={true} speed={54} gradient={false}>
                <ul className='immiProjects contentSlide'>
                    {immiData.map(data =>
                        <li className='immiProject contentItem' key={data.id}>
                            <Link to={`projectDetail/${data.id}`} onClick={() => onClick(data.id)}>
                                <div className='immiImg contentImg'>
                                    <img src={`${API_URL}/upload/${data.projectImg}`} alt='프로젝트 사진' />
                                </div>
                                <div className='immiText contextInnerText'>
                                    <h3>{data.projectTitle}</h3>
                                    <p>마감일 <span>{data.deadLine}</span></p>
                                </div>
                            </Link>
                        </li>
                    )}
                </ul>
            </Marquee>
        </section>
    );
};

export default Imminent;