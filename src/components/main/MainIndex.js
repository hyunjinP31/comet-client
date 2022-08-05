import React, { useEffect } from 'react';
import CommingSoon from './CommingSoon';
import Imminent from './Imminent';
import MainSlide from './MainSlide';
import NewProject from './NewProject';
import PotentUp from './PotentUp';
import Theme from './Theme';
import TopRanking from './TopRanking';
import { useSelector, useDispatch } from 'react-redux';
import { printMain } from '../module/project';

const MainIndex = () => {
    const dispatch = useDispatch();
    const project = useSelector(state=>state.project.project);
    const { loading, data, error} = project;
    useEffect(()=>{
        dispatch(printMain());
    },[dispatch])
    if(loading) return <div>loading</div>;
    if(error) return <div>error</div>;
    if(!data) return <div>data null</div>;
    
    const {topData,immiData,themeData,newData,potenData,comData} = data;
    
    return (
        <>
            <MainSlide />
            <TopRanking topData={topData}/>
            <Imminent immiData={immiData} />
            <Theme themeData={themeData} />
            <NewProject newData={newData} />
            <PotentUp potenData={potenData} />
            <CommingSoon comData={comData} />
        </>
    );
};

export default MainIndex;