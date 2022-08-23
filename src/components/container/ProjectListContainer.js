import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectKeyData, viewRaise } from '../module/project';
import { useParams } from 'react-router-dom';
import ProjectList from '../detail/ProjectList';
import { headerMenuChange, headerMenuDefault, paginate } from '../module/utility';
import { getCookie } from '../../util/cookie';
import { addHeart, deleteHeart, emptyHeartTrick, emptyHeartTrickDelete, fullHeartTrick, fullHeartTrickDelete, getHeart, giveHeart } from '../module/heart';
import HashLoader from 'react-spinners/HashLoader';

const override = {
    width: "100%",
    height: "500px",
    transform: "rotate(0deg)",
};


const ProjectListContainer = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const projectListData = useSelector(state=>state.project.projectListData);
    const paging = useSelector(state=>state.utility.paging);
    const offset = (paging.currentPage - 1) * paging.itemVolume;
    const heart = useSelector(state=> state.heart.heartData);
    const trickFullHeart = useSelector(state=> state.heart.trickHeart.full);
    const trickEmptyHeart = useSelector(state=>state.heart.trickHeart.empty);
    const { loading: hLoading, data: hData, error: hError } = heart;
    const { loading, data, error } = projectListData;
    const userId = getCookie('userId');
    const setPage = (num) => {
        dispatch(paginate(num))
    }
    useEffect(()=>{
        dispatch(getProjectKeyData(params.name));
        //eslint-disable-next-line
    },[params]);
    useEffect(()=>{
        if(params.name === '인기') dispatch(headerMenuChange("1"));
        if(params.name === '신규') dispatch(headerMenuChange("2")); 
        if(params.name === '마감임박') dispatch(headerMenuChange("3")); 
        if(params.name === '공개예정') dispatch(headerMenuChange("4"));
        return () => {
            dispatch(headerMenuDefault());
        }
        //eslint-disable-next-line
    },[])
    useEffect(()=>{
        if(userId) dispatch(getHeart());
        //eslint-disable-next-line
    },[userId])
    let like;
    if(hData) like = hData.map(like => like.projectTitle);
    useEffect(()=>{
        if(like) {
            like.forEach(title=>dispatch(fullHeartTrick(title)));
        }
        //eslint-disable-next-line
    },[hData])
    if(loading) return <HashLoader cssOverride={override} color="#838dd2" size={55}/>;
    if(error) return console.log(error);
    if(!data) return;
    //로그인 했을 때 하트 데이터 받아오기
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
                dispatch(giveHeart(data, userId));
                dispatch(addHeart());
            }
        }
    }
    const viewRaiseClick = (id) => {
        dispatch(viewRaise(id));
     }
    return (
        <>
            <ProjectList viewRaiseClick={viewRaiseClick} projects={data}  total={data.length} limit={paging.itemVolume} page={paging.currentPage} setPage={setPage} offset={offset} heartfilling={heartfilling} heart={hData} trickFullHeart={trickFullHeart} like={like} trickEmptyHeart={trickEmptyHeart} />
        </>
    );
};

export default ProjectListContainer;