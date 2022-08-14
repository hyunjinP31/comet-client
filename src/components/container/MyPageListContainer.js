import React, { useEffect } from 'react';
import MyProjectList from '../detail/MyProjectList';
import { Route, Routes, useParams } from 'react-router-dom';
import MyheartList from '../detail/MyheartList';
import { useDispatch, useSelector } from 'react-redux';
import { getHeart } from '../module/heart';
import { getMyProjectList } from '../module/project';

const MyPageListContainer = () => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    const heart = useSelector(state=>state.heart.heartData);
    const myProject = useSelector(state=>state.project.myProjectListData);
    const { loading, data, error } = heart;
    const { loading: myLoading, data: myData, error: myError } = myProject;
    useEffect(()=>{
        if(userId) {
            dispatch(getHeart());
            dispatch(getMyProjectList(userId));
        }
        //eslint-disable-next-line
    },[])
    if(loading || myLoading) return <div>loading</div>
    if(error || myError) return console.log(error);
    if(!data || !myData) return <div>loading</div>;
    return (
        <>
            <Routes>
                <Route path='myheartlist' element={<MyheartList  heart={data} />} />
                <Route path='myprojectlist' element={<MyProjectList myData={myData}/>} />
            </Routes>
        </>
    );
};

export default MyPageListContainer;