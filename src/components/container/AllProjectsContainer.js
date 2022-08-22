import React, { useEffect } from 'react';
import AllProjectList from '../detail/AllProjectList';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getAllProject, viewRaise } from '../module/project';
import { paginate } from '../module/utility';
import { getCookie } from '../../util/cookie';
import { addHeart, deleteHeart, emptyHeartTrick, emptyHeartTrickDelete, fullHeartTrick, fullHeartTrickDelete, getHeart, giveHeart } from '../module/heart';
import HashLoader from 'react-spinners/HashLoader';

const override = {
    width: "100%",
    height: "500px",
    transform: "rotate(0deg)",
};

const AllProjectsContainer = () => {
    const dispatch = useDispatch();
    const allproject = useSelector(state => state.project.allProjectData);
    const paging = useSelector(state=>state.utility.paging);
    const heart = useSelector(state=> state.heart.heartData);
    const trickFullHeart = useSelector(state=> state.heart.trickHeart.full);
    const trickEmptyHeart = useSelector(state=>state.heart.trickHeart.empty);
    const { loading, data, error } = allproject;
    const { loading: hLoading, data: hData, error: hError } = heart;
    const userId = getCookie('userId');
    const offset = (paging.currentPage - 1) * paging.itemVolume;
    useEffect(() => {
        dispatch(getAllProject());
    }, [dispatch])
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
    if (loading) return <HashLoader cssOverride={override} color="#838dd2" size={55}/>;
    if (!data) return;
    if (error) return console.log(error);
    if(userId) {
        if(hLoading) return <HashLoader cssOverride={override} color="#838dd2" size={55}/>;
        if(hError) return console.log(error);
        if(!hData) return;
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
            <AllProjectList projects={data} viewRaiseClick={viewRaiseClick}  total={data.length} limit={paging.itemVolume} page={paging.currentPage} setPage={setPage} offset={offset} heartfilling={heartfilling} heart={hData} trickFullHeart={trickFullHeart} like={like} trickEmptyHeart={trickEmptyHeart}/>
        </div>
    );
};

export default AllProjectsContainer;