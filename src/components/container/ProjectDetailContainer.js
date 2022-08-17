import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetail from '../detail/ProjectDetail';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectData } from '../module/project';
import HashLoader from 'react-spinners/HashLoader';
import { addHeart, deleteHeart, emptyHeartTrick, emptyHeartTrickDelete, fullHeartTrick, fullHeartTrickDelete, getHeart, giveHeart } from '../module/heart';
import { getCookie } from '../../util/cookie';
import { giveSupport, setSupportUserId, setSupprot } from '../module/support';

const override = {
    display: "block",
    margin: "0 auto",
    width: "100%",
    height: "700px",
};
const ProjectDetailContainer = () => {
    const {id} = useParams();
    const projectData = useSelector(state=>state.project.projectData);
    const heart = useSelector(state=> state.heart.heartData);
    const { loading, data, error } = projectData;
    const { loading: hLoading, data: hData, error: hError } = heart;
    const userId = getCookie('userId');
    const dispatch = useDispatch();
    const trickFullHeart = useSelector(state=> state.heart.trickHeart.full);
    const trickEmptyHeart = useSelector(state=>state.heart.trickHeart.empty);
    useEffect(()=>{
        dispatch(getProjectData(id));
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
    if( loading ) return <HashLoader cssOverride={override} color="#838dd2" size={55}/>;
    if(error) return console.log(error);
    if(!data) return;
    if(userId){
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
    const giveASupport = (data) => {
        if(!userId) return alert('로그인이 필요한 서비스입니다.');
        dispatch(setSupportUserId());
        dispatch(setSupprot(data));
        dispatch(giveSupport());
    }
    return (
        <>
            <ProjectDetail
            data={data}
            heart={hData}
            heartfilling={heartfilling}
            trickFullHeart={trickFullHeart}
            like={like}
            trickEmptyHeart={trickEmptyHeart}
            giveASupport={giveASupport}/>
        </>
    );
};

export default ProjectDetailContainer;