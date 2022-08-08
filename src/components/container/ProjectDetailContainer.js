import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetail from '../detail/ProjectDetail';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectData } from '../module/project';

const ProjectDetailContainer = () => {
    const {id} = useParams();
    const projectData = useSelector(state=>state.project.projectData);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProjectData(id));
    },[dispatch])
    const { loading, data, error} = projectData;
    if( loading ) return <div>loading</div>;
    if(error) return console.log(error);
    if(!data) return null;
    return (
        <>
            <ProjectDetail data={data} />
        </>
    );
};

export default ProjectDetailContainer;