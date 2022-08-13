import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/contansts';

const CommingSoon = ({ comData, onClick }) => {
    if (!comData) return <div>loading</div>;
    return (
        <section className='commingSoon inner listWrap'>
            <div className='comTop topTitle listTop'>
                <h2 className='sectionTitle'>공개예정</h2>
                <Link to='/projectlist/공개예정'><span><span>전체보기</span><HiArrowNarrowRight /></span></Link>
            </div>
            <ul className='comBottom listBottom'>
                {comData.map(data =>
                    <li className='comProject listItem' key={data.id}>
                        <Link to={`projectDetail/${data.id}`} onClick={() => onClick(data.id)}>
                            <div className='comImg contentImg'>
                                <img src={`${API_URL}/upload/${data.projectImg}`} alt='프로젝트 사진' />
                            </div>
                            <div className='comText contextInnerText'>
                                <h3>{data.projectTitle}</h3>
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