import React, { useEffect, useState } from 'react';
import MyProjectList from '../detail/MyProjectList';
import { Route, Routes, useParams } from 'react-router-dom';
import MyheartList from '../detail/MyheartList';
import { useDispatch, useSelector } from 'react-redux';
import { getHeart } from '../module/heart';
import { deleteProject, getMyProjectList } from '../module/project';
import { msgBoxAiming, msgBoxControl, resetMsgBoxAiming } from '../module/utility';

const MyPageListContainer = () => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    const heart = useSelector(state=>state.heart.heartData);
    const myProject = useSelector(state=>state.project.myProjectListData);
    const msgBox = useSelector(state=>state.utility.msgBoxOpen);
    const { loading, data, error } = heart;
    const { loading: myLoading, data: myData, error: myError } = myProject;
    useEffect(()=>{
        if(userId) {
            dispatch(getHeart());
            dispatch(getMyProjectList(userId));
        }
        //eslint-disable-next-line
    },[])
    const projectDelete = (id) => {
        dispatch(deleteProject(id));
        dispatch(msgBoxControl());
        dispatch(getMyProjectList(userId));
        dispatch(resetMsgBoxAiming());
    }
    const isMsgBoxOpen = (id, title) => {
        dispatch(msgBoxAiming(id, title));
        dispatch(msgBoxControl());
        if(msgBox.isOpen === true) dispatch(resetMsgBoxAiming());
    }
    if(loading || myLoading) return <div>loading</div>
    if(error || myError) return console.log(error);
    if(!data || !myData) return <div>loading</div>;
    return (
        <>
            <Routes>
                <Route path='myheartlist' element={<MyheartList  heart={data} />} />
                <Route path='myprojectlist' element={<MyProjectList myData={myData} msgBox={msgBox} projectDelete={projectDelete} isMsgBoxOpen={isMsgBoxOpen} />} />
            </Routes>
        </>
    );
};

export default MyPageListContainer;