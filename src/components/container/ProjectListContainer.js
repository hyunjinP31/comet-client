import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectKeyData, viewRaise } from '../module/project';
import { useParams } from 'react-router-dom';
import ProjectList from '../detail/ProjectList';
import { headerMenuChange, headerMenuDefault, paginate } from '../module/utility';

const ProjectListContainer = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const projectListData = useSelector(state=>state.project.projectListData);
    const paging = useSelector(state=>state.utility.paging);
    const offset = (paging.currentPage - 1) * paging.itemVolume;
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
    const { loading, data, error } = projectListData;
    
    if(loading) return <div>loading</div>;
    if(error) return <div>error</div>;
    if(!data) return null;

    const viewRaiseClick = (id) => {
        dispatch(viewRaise(id));
     }
    return (
        <>
            <ProjectList viewRaiseClick={viewRaiseClick} projects={data}  total={data.length} limit={paging.itemVolume} page={paging.currentPage} setPage={setPage} offset={offset} />
        </>
    );
};

export default ProjectListContainer;