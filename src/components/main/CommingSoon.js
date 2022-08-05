import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom';

const CommingSoon = ({ comData }) => {
    if (!comData) return <div>loading</div>;
    return (
        <section className='commingSoon inner'>
            <div className='comTop topTitle'>
                <h2 className='sectionTitle'>공개예정</h2>
                <span><span>전체보기</span><HiArrowNarrowRight /></span>
            </div>
            <ul className='comBottom'>
                {comData.map(data =>
                    <li className='comProject' key={data.id}>
                        <Link to={`projectDetail/${data.id}`}>
                            <div className='comImg'>
                                <img src='' alt='' />
                            </div>
                            <div className='comText'>
                                <h3>{data.projectName}</h3>
                                <p>{data.projectPrice}</p>
                                <p>{data.sellerName}</p>
                            </div>
                        </Link>
                    </li>
                )}
            </ul>
        </section>
    );
};

export default CommingSoon;