import React, { useEffect, useState } from 'react';
import CommingSoon from './CommingSoon';
import Imminent from './Imminent';
import MainSlide from './MainSlide';
import NewProject from './NewProject';
import PotentUp from './PotentUp';
import Theme from './Theme';
import TopRanking from './TopRanking';
import { useSelector, useDispatch } from 'react-redux';
import { printMain, sideSwipe, viewRaise } from '../module/project';

const MainIndex = () => {
    const dispatch = useDispatch();
    const project = useSelector(state => state.project.project);
    const currentIndex = useSelector(state=>state.project.projectSideSwipe.current);
    const { loading, data, error } = project;

    useEffect(() => {
        dispatch(printMain());
    }, [dispatch])

    if (loading) return <div>loading</div>;
    if (error) return <div>error</div>;
    if (!data) return <div>data null</div>;

    const { topData, immiData, themeData, newData, potenData, comData } = data;

    const onClick = (id) => {
       dispatch(viewRaise(id));
    }
    const onMove = (e)=>{
        dispatch(sideSwipe(e));
    }
    return (
        <>
            <MainSlide />
            <TopRanking topData={topData} onClick={onClick} onMove={onMove} currentIndex={currentIndex}/>
            <Imminent immiData={immiData} onClick={onClick} />
            <Theme themeData={themeData} onClick={onClick} />
            <NewProject newData={newData} onClick={onClick} />
            <PotentUp potenData={potenData} onClick={onClick} />
            <CommingSoon comData={comData} onClick={onClick} />
        </>
    );
};

export default MainIndex;