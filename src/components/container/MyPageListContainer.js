import React, { useEffect } from 'react';
import MyProjectList from '../detail/MyProjectList';
import { Route, Routes, useParams } from 'react-router-dom';
import MyheartList from '../detail/MyheartList';
import { useDispatch, useSelector } from 'react-redux';
import { getHeart } from '../module/heart';
import { deleteProject, getMyProjectList } from '../module/project';
import { msgBoxAiming, msgBoxControl, paginate, resetItemVolume, resetMsgBoxAiming, setItemVolumn } from '../module/utility';
import HashLoader from 'react-spinners/HashLoader';
import MySupportList from '../detail/MySupportList';
import { cancelSupport, getMySupportData } from '../module/support';

const override = {
    display: "block",
    margin: "0 auto",
    width: "100%",
    height: "500px",
};

const MyPageListContainer = () => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    const heart = useSelector(state=>state.heart.heartData);
    const myProject = useSelector(state=>state.project.myProjectListData);
    const supportData = useSelector(state => state.support.supportData);
    const paging = useSelector(state=>state.utility.paging);
    const offset = (paging.currentPage - 1) * paging.itemVolume;
    const msgBox = useSelector(state=>state.utility.msgBoxOpen);
    const { loading, data, error } = heart;
    const { loading: myLoading, data: myData, error: myError } = myProject;
    const { loading: supLoading, data: supData, error: supError } = supportData;

    useEffect(()=>{
        dispatch(setItemVolumn(7));
        if(userId) {
            dispatch(getHeart());
            dispatch(getMyProjectList(userId));
            dispatch(getMySupportData(userId));
        }
        return ()=>{
            dispatch(resetItemVolume());
        }
        //eslint-disable-next-line
    },[])
    
    const setPage = (num) => {
        dispatch(paginate(num))
    }
    const projectDelete = (id) => {
        dispatch(deleteProject(id));
        dispatch(msgBoxControl());
        dispatch(resetMsgBoxAiming());
        dispatch(getMyProjectList(userId));
    }
    const isMsgBoxOpen = (id, title) => {
        dispatch(msgBoxAiming(id, title));
        dispatch(msgBoxControl());
        if(msgBox.isOpen === true) dispatch(resetMsgBoxAiming());
    }
    const supportCancel = (title) => {
        dispatch(cancelSupport(title));
        dispatch(msgBoxControl());
        dispatch(getMySupportData(userId));
        dispatch(resetMsgBoxAiming());
    }
    if(loading || myLoading || supLoading) return <HashLoader cssOverride={override} color="#838dd2" size={55}/>;
    if(error || myError || supError) return console.log(error, myError, supError);
    if(!data || !myData || !supData) return;
    return (
        <>
            <Routes>
                <Route path='myheartlist' element={<MyheartList  heart={data}  total={data.length} limit={paging.itemVolume} page={paging.currentPage} setPage={setPage} offset={offset} />} />
                <Route path='myprojectlist' element={<MyProjectList myData={myData} msgBox={msgBox} projectDelete={projectDelete} isMsgBoxOpen={isMsgBoxOpen} total={myData.length} limit={paging.itemVolume} page={paging.currentPage} setPage={setPage} offset={offset} />} />
                <Route path='myfundinglist' element={<MySupportList support={supData} total={supData.length} limit={paging.itemVolume} page={paging.currentPage} setPage={setPage} offset={offset} isMsgBoxOpen={isMsgBoxOpen} msgBox={msgBox} supportCancel={supportCancel}/>} />
            </Routes>
        </>
    );
};

export default MyPageListContainer;