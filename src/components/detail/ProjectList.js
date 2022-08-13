import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/contansts';

const ProjectList = ({ projects, onClick }) => {
    return (
        <div className='listWrap projectlistWrap'>
            <ul className='listBottom inner'>
                {projects.map(data => (
                    <li className='listItem' key={data.id}>
                        <Link to={`/projectDetail/${data.id}`} onClick={() => onClick(data.id)}>
                            <div className='contentImg'>
                                <img src={`${API_URL}/upload/${data.projectImg}`} alt='프로젝트 사진' />
                            </div>
                            <div className='contextInnerText'>
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

export default ProjectList;