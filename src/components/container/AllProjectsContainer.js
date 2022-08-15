import React, { useEffect } from 'react';
import AllProjectList from '../detail/AllProjectList';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getAllProject, viewRaise } from '../module/project';

const AllProjectsContainer = () => {
    const dispatch = useDispatch();
    const allproject = useSelector(state=>state.project.allProjectData);
    const { loading, data, error } = allproject;
    useEffect(()=>{
        dispatch(getAllProject());
    },[dispatch])
    if(loading) return <div>loading</div>;
    if(!data) return <div>loading</div>;
    if(error) return console.log(error);
    const viewRaiseClick = (id) => {
        dispatch(viewRaise(id));
     }
    return (
        <div>
            <AllProjectList projects={data} viewRaiseClick={viewRaiseClick} />  
        </div>
    );
};

export default AllProjectsContainer;