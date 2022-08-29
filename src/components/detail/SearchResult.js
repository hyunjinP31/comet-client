import React from 'react';
import { Link } from 'react-router-dom'
import { IMG_URL } from '../../config/contansts';
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import Pagination from './Pagination';

const SearchResult = ({search, viewRaiseClick, total, limit, page, setPage, offset, heartfilling, heart, trickFullHeart, like, trickEmptyHeart  }) => {
    const totalPages = Math.ceil(total / limit);
    return (
        <div className='listWrap projectlistWrap inner'>
            <h1>검색 결과</h1>
            <ul className='listBottom'>
                {
                    search.length === 0 ? <span className='searchNoResult'>검색 결과가 없습니다. 다른 단어를 입력해주세요</span> : search.slice(offset, offset + limit).map(data => (
                        <li className='listItem' key={data.id} onClick={() => viewRaiseClick(data.id)} >
                            <Link to={`/projectDetail/${data.id}`}>
                                <div className='contentImg'>
                                    <img src={`${IMG_URL}/${data.projectImg}`} alt='프로젝트 사진' />
                                </div>
                            </Link>
                            <div className='contentInnerText'>
                                <span className='heart' onClick={() => heartfilling(data, data.projectTitle)}>
                                    <span>{heart ? (trickEmptyHeart !== [] ? (trickEmptyHeart.includes(data.projectTitle) ? <FaRegHeart className='trickEmptyHeart' /> : '') : '') : ''}</span>
                                    <span>{heart ? (trickFullHeart !== [] ? (trickFullHeart.includes(data.projectTitle) ? <FaHeart className='fullHeart' /> : '') : '') : ''}</span>
                                    <span>{heart ? (like.includes(data.projectTitle) ? <FaHeart className='fullHeart' /> : <FaRegHeart className='emptyHeart' />) : <FaRegHeart className='emptyHeart' />}</span>
                                </span>
                                <Link to={`/projectDetail/${data.id}`}>
                                    <h3>{data.projectTitle}</h3>
                                    <p>{data.projectPrice}</p>
                                    <p>{data.sellerName}</p>
                                </Link>
                            </div>
                        </li>)
                    )
                }
            </ul>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
};

export default SearchResult;