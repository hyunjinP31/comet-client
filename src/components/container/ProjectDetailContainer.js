import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetail from '../detail/ProjectDetail';
import { useSelector, useDispatch } from 'react-redux';
import { getMyProjectList, getProjectData } from '../module/project';
import HashLoader from 'react-spinners/HashLoader';
import { addHeart, deleteHeart, emptyHeartTrick, emptyHeartTrickDelete, fullHeartTrick, fullHeartTrickDelete, getHeart, giveHeart } from '../module/heart';
import { getCookie } from '../../util/cookie';
import { cancelSupport, getMySupportData, getSupportCondition, giveSupport, isSupportChange, setSupportUserId, setSupprot } from '../module/support';
import { msgBoxAiming, msgBoxControl, resetMsgBoxAiming } from '../module/utility';

const override = {
    width: "100%",
    height: "500px",
    transform: "rotate(0deg)",
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
    const mysupportData = useSelector(state=>state.support.supportData);
    const myProjectData = useSelector(state=>state.project.myProjectListData);
    const { loading: myLoading, data: myData, error: myError } = myProjectData;
    const { loading: supLoading, data: supData, error: supError } = mysupportData;
    const msgBox = useSelector(state=>state.utility.msgBoxOpen);
    const isSupported = useSelector(state=>state.support.supportChange.isSupportChange)


    useEffect(()=>{
        dispatch(getProjectData(id));
        //eslint-disable-next-line
    },[])
    useEffect(()=>{
        if(userId) {
            dispatch(getMySupportData(userId));
            dispatch(getMyProjectList(userId));
            dispatch(getHeart());
        }
        //eslint-disable-next-line
    },[userId])
    let like;
    let supTitle;
    let myTitle;
    if(hData) like = hData.map(like => like.projectTitle);
    if(supData) supTitle = supData.map(support=> support.projectTitle);
    if(myData) myTitle = myData.map(myPro => myPro.projectTitle);
    useEffect(()=>{
        if(like) {
            like.forEach(title=>dispatch(fullHeartTrick(title)));
        }
        //eslint-disable-next-line
    },[hData])
    const heartfilling = (data, title) => {
        if(!userId) return alert('로그인이 필요한 서비스입니다.');
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
    const isMsgBoxOpen = (id, title) => {
        dispatch(msgBoxAiming(id, title));
        dispatch(msgBoxControl());
        if(msgBox.isOpen === true) dispatch(resetMsgBoxAiming());
    }
    const giveASupport = (data) => {
        if(!userId) return alert('로그인이 필요한 서비스입니다.');
        dispatch(setSupportUserId());
        dispatch(setSupprot(data));
        dispatch(giveSupport());
        dispatch(getSupportCondition(data.projectTitle));
    }
    const supportCancel = (title) => {
        dispatch(cancelSupport(title));
        dispatch(msgBoxControl());
        dispatch(resetMsgBoxAiming());
    }
    useEffect(()=>{
        dispatch(getMySupportData(userId));
        //eslint-disable-next-line
    },[isSupported])
    if( loading ) return <HashLoader cssOverride={override} color="#838dd2" size={55}/>;
    if(error) return console.log(error);
    if(!data) return;
    if(userId){
        if(hLoading || supLoading || myLoading) return <HashLoader cssOverride={override} color="#838dd2" size={55}/>;
        if(hError || supError || myError) return console.log(error);
        if(!hData || !supData || !myData) return;
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
            giveASupport={giveASupport}
            supTitle={supTitle}
            supportCancel={supportCancel}
            myTitle={myTitle}
            isMsgBoxOpen={isMsgBoxOpen}
            msgBox={msgBox}
            />
        </>
    );
};

export default ProjectDetailContainer;