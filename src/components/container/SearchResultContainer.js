import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchResult from '../detail/SearchResult';
import HashLoader from 'react-spinners/HashLoader';
import { getCookie } from '../../util/cookie';
import { addHeart, deleteHeart, emptyHeartTrick, emptyHeartTrickDelete, fullHeartTrick, fullHeartTrickDelete, getHeart, giveHeart } from '../module/heart';
import { viewRaise } from '../module/project';
import { paginate } from '../module/utility';

const override = {
    width: "100%",
    height: "500px",
    transform: "rotate(0deg)",
};

const SearchResultContainer = () => {
    const searchResult = useSelector(state=>state.utility.search);
    const dispatch = useDispatch();
    const { loading, data, error } = searchResult;
    const userId = getCookie('userId');
    const paging = useSelector(state=>state.utility.paging);
    const heart = useSelector(state=> state.heart.heartData);
    const trickFullHeart = useSelector(state=> state.heart.trickHeart.full);
    const trickEmptyHeart = useSelector(state=>state.heart.trickHeart.empty);
    const { loading: hLoading, data: hData, error: hError } = heart;
    const offset = (paging.currentPage - 1) * paging.itemVolume;
    useEffect(()=>{
        if(userId) dispatch(getHeart());
        //eslint-disable-next-line
    },[userId])
    const viewRaiseClick = (id) => {
        dispatch(viewRaise(id));
    }
    const setPage = (num) => {
        dispatch(paginate(num))
    }
    let like;
    if(hData) like = hData.map(like => like.projectTitle);
    useEffect(()=>{
        if(like) {
            like.forEach(title=>dispatch(fullHeartTrick(title)));
        }
        //eslint-disable-next-line
    },[hData])



    if(loading) return <HashLoader cssOverride={override} color="#838dd2" size={55}/>;
    if(!data) return;
    if(error) return console.log(error);
    if(userId) {
        if(hLoading) return <HashLoader cssOverride={override} color="#838dd2" size={55}/>;
        if(hError) return <div>error</div>;
        if(!hData) return null;
    }
    const heartfilling = (data, title) => {
        if(!userId) return alert('로그인을 먼저 해주세요');
        else {
            if(trickFullHeart.includes(title)) {
                dispatch(fullHeartTrickDelete(title));
                dispatch(emptyHeartTrick(title));
                dispatch(deleteHeart(title))
            }else {
                dispatch(emptyHeartTrickDelete(title));
                dispatch(fullHeartTrick(title));
                dispatch(giveHeart(data));
                dispatch(addHeart());
            }
        }
    }
    return (
        <div>
            <SearchResult
            search={data}
            viewRaiseClick={viewRaiseClick}
            total={data.length}
            limit={paging.itemVolume}
            page={paging.currentPage}
            setPage={setPage}
            offset={offset}
            heartfilling={heartfilling}
            heart={hData}
            trickFullHeart={trickFullHeart}
            like={like}
            trickEmptyHeart={trickEmptyHeart}/>
        </div>
    );
};

export default SearchResultContainer;