import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/contansts';

const AllProjectList = ({projects, viewRaiseClick}) => {
    return (
        <div className='listWrap projectlistWrap inner'>
            <h1>전체 프로젝트</h1>
            <ul className='listBottom'>
                {projects.map(data => (
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
        </div>
    );
};

export default AllProjectList;