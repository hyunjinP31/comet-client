import React from 'react';
import { Link } from 'react-router-dom';
import { IMG_URL } from '../../config/contansts';
import Pagination from './Pagination';
import { FaRegHeart, FaHeart } from 'react-icons/fa'

const ProjectList = ({ projects, viewRaiseClick, total, limit, page, setPage, offset, heartfilling, heart, trickFullHeart, like, trickEmptyHeart }) => {
    const totalPages = Math.ceil(total / limit);
    return (
        <div className='listWrap projectlistWrap'>
            <ul className='listBottom inner'>
                {projects.slice(offset, offset + limit).map(data => (
                    <li className='listItem' key={data.id}>
                        <Link to={`/projectDetail/${data.id}`} onClick={() => viewRaiseClick(data.id)}>
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
                            <Link to={`/projectDetail/${data.id}`} onClick={() => viewRaiseClick(data.id)}>
                                <h3>{data.projectTitle}</h3>
                                <p>{data.projectPrice}</p>
                                <p>{data.sellerName}</p>
                            </Link>
                        </div>
                    </li>)
                )}
            </ul>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
};

export default ProjectList;