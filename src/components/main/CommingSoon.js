import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { IMG_URL } from '../../config/contansts';

const CommingSoon = ({ comData, onClick, heartfilling, heart, trickFullHeart, like, trickEmptyHeart }) => {
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
                                <img src={`${IMG_URL}/${data.projectImg}`} alt='프로젝트 사진' />
                            </div>
                        </Link>
                        <div className='comText contentInnerText'>
                            <span className='heart'>{heart ? (trickEmptyHeart !== [] ? (trickEmptyHeart.includes(data.projectTitle) ? <FaRegHeart className='trickEmptyHeart' /> : '') : '') : ''}</span>
                            <span className='heart'>{heart ? (trickFullHeart !== [] ? (trickFullHeart.includes(data.projectTitle) ? <FaHeart className='fullHeart' /> : '') : '') : ''}</span>
                            <span className='heart' onClick={() => heartfilling(data, data.projectTitle)}>{heart ? (like.includes(data.projectTitle) ? <FaHeart className='fullHeart' /> : <FaRegHeart className='emptyHeart' />) : <FaRegHeart className='emptyHeart' />}</span>
                            <Link to={`projectDetail/${data.id}`} onClick={() => onClick(data.id)}>
                                <h3>{data.projectTitle}</h3>
                                <p>{data.projectPrice}</p>
                                <p>{data.sellerName}</p>
                            </Link>
                        </div>

                    </li>
                )}
            </ul>
        </section>
    );
};

export default CommingSoon;