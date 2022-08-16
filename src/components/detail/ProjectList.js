import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/contansts';
import Pagination from './Pagination';

const ProjectList = ({ projects, viewRaiseClick, total, limit, page, setPage, offset }) => {
    const totalPages = Math.ceil( total / limit );
    if(projects === []) return;
    return (
        <div className='listWrap projectlistWrap'>
            <ul className='listBottom inner'>
                {projects.slice(offset, offset + limit).map(data => (
                    <li className='listItem' key={data.id}>
                        <Link to={`/projectDetail/${data.id}`} onClick={() => viewRaiseClick(data.id)}>
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

export default ProjectList;