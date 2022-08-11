import React, { useEffect } from 'react';
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
    const currentIndex = useSelector(state=>state.project.projectSideSwipe);
    const { loading, data, error } = project;

    useEffect(() => {
        dispatch(printMain());
    }, [dispatch])
    useEffect(()=>{

    },[currentIndex])

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
            <Imminent immiData={immiData} />
            <Theme themeData={themeData} onClick={onClick} onMove={onMove} currentIndex={currentIndex} />
            <NewProject newData={newData} onClick={onClick} onMove={onMove} currentIndex={currentIndex} />
            <PotentUp potenData={potenData} onClick={onClick} onMove={onMove} currentIndex={currentIndex} />
            <CommingSoon comData={comData} onClick={onClick} onMove={onMove} currentIndex={currentIndex} />
        </>
    );
};

export default MainIndex;