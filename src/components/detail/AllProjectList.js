import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/contansts';
import Pagination from './Pagination';

const AllProjectList = ({projects, viewRaiseClick, total, limit, page, setPage, offset}) => {
    const totalPages = Math.ceil( total / limit );
    return (
        <div className='listWrap projectlistWrap inner'>
            <h1>전체 프로젝트</h1>
            <ul className='listBottom'>
                {projects.slice(offset, offset + limit).map(data => (
                    <li className='listItem' key={data.id} onClick={()=>viewRaiseClick(data.id)} >
                        <Link to={`/projectDetail/${data.id}`}>
                            <div className='contentImg'>
                                <img src={`${API_URL}/upload/${data.projectImg}`} alt='프로젝트 사진' />
                            </div>
                            <div className='contentInnerText'>
                                <h3>{data.projectTitle}</h3>
                                <p>{data.projectPrice}</p>
                                <p>{data.sellerName}</p>
                            </div>
                        </Link>
                    </li>)
                )}
            </ul>
            <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
        </div>
    );
};

export default AllProjectList;