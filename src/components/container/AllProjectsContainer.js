import React, { useEffect } from 'react';
import AllProjectList from '../detail/AllProjectList';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getAllProject, viewRaise } from '../module/project';
import { paginate } from '../module/utility';

const AllProjectsContainer = () => {
    const dispatch = useDispatch();
    const allproject = useSelector(state => state.project.allProjectData);
    const paging = useSelector(state=>state.utility.paging);
    const { loading, data, error } = allproject;
    const offset = (paging.currentPage - 1) * paging.itemVolume;
    useEffect(() => {
        dispatch(getAllProject());
    }, [dispatch])
    const viewRaiseClick = (id) => {
        dispatch(viewRaise(id));
    }
    const setPage = (num) => {
        dispatch(paginate(num))
    }
    if (loading) return <div>loading</div>;
    if (!data) return <div>loading</div>;
    if (error) return console.log(error);
    return (
        <div>
            <AllProjectList projects={data} viewRaiseClick={viewRaiseClick}  total={data.length} limit={paging.itemVolume} page={paging.currentPage} setPage={setPage} offset={offset}/>
        </div>
    );
};

export default AllProjectsContainer;