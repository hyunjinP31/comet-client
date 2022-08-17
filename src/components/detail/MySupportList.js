import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/contansts';
import Pagination from './Pagination';
import { RiFileList3Line } from 'react-icons/ri';

const MySupportList = ({support, total, limit, page, setPage, offset }) => {
    const totalPages = Math.ceil( total / limit );
    useEffect(()=>{
        console.log('sss')
    },[])
    return (
        <div className='myProject myList'>
            <h2><RiFileList3Line className='listIcon' />내 후원내역</h2>
            <div className='myProjectWrap myListWrap'>
                <ul className='myProjectItems myListItems'>
                    {support.slice(offset, offset + limit).map(data =>
                        <div key={data.id}>
                            <li>
                                <Link to={`/projectdetail/${data.id}`}>
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
                                </Link>
                            </li>
                        </div>
                    )}
                </ul>
                <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
            </div>
        </div>
    );
};

export default MySupportList;