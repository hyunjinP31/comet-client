import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/contansts';

const MyProjectList = ({ myData }) => {
    return (
        <div className='myProject myList'>
            <h2>내 프로젝트</h2>
            <div className='myProjectWrap myListWrap'>
                <ul className='myProjectItems myListItems'>
                    {myData.map(data =>
                        <Link key={data.id} to={`/projectdetail/${data.id}`}>
                            <li>
                                <div className='myProjectImg myListImg'>
                                    <img src={`${API_URL}/upload/${data.projectImg}`} alt='내 프로젝트 사진' />
                                </div>
                                <div className='myProjectInfo myListInfo'>
                                    <h3>{data.projectTitle}</h3>
                                    <span><span className='myListSpan'>{data.releaseDate}</span> - <span className='myListSpan'>{data.deadLine}</span></span>
                                </div>
                                <div className='myProjectPay myListPay'>
                                    <h3>achievement 달성</h3>
                                    <p>키워드: '' ''</p>
                                    <p>조회수 : <span className='myListSpan'>{data.projectHits}</span></p>
                                </div>
                            </li>
                        </Link>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MyProjectList;