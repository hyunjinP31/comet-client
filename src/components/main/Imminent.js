import React from 'react';
import Marquee from 'react-fast-marquee';
import { HiArrowNarrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom';

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
                            <Link to={`projectDetail/${data.id}`} onClick={()=>onClick(data.id)}>
                                <div className='immiImg'>
                                    <img src='' alt='' />
                                </div>
                                <div className='immiText contextInnerText'></div>
                            </Link>
                        </li>
                    )}
                </ul>
            </Marquee>
        </section>
    );
};

export default Imminent;