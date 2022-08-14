import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/contansts';

const MyheartList = ({ heart }) => {
    return (
        <div className='myHeart myList'>
            <h2>찜목록</h2>
            <div className='myHeartWrap myListWrap'>
                <ul className='myHeartItems myListItems'>
                    {heart.map(data =>
                        <Link to={`/projectdetail/${data.projectId}`} key={data.id}>
                            <li>
                                <div className='myHeartImg myListImg'>
                                    <img src={`${API_URL}/upload/${data.projectImg}`} alt='내 프로젝트 사진' />
                                </div>
                                <div className='myHeartInfo myListInfo'>
                                    <h3>{data.projectTitle}</h3>
                                    <span><span className='myListSpan'>{data.releaseDate}</span> - <span className='myListSpan'>{data.deadLine}</span></span>
                                </div>
                                <div className='myHeartPay myListPay'>
                                    <h3>{data.projectPrice}</h3>
                                    <p>achievement 달성</p>
                                    <p>판매자 : <span className='myListSpan'>{data.sellerId}</span></p>
                                </div>
                            </li>
                        </Link>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MyheartList;