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
import { getCookie } from '../../util/cookie';
import { addHeart, getHeart, giveHeart, heartTrick } from '../module/heart';

const MainIndex = () => {
    const dispatch = useDispatch();
    const project = useSelector(state => state.project.project);
    const currentIndex = useSelector(state=>state.project.projectSideSwipe);
    const heart = useSelector(state=> state.heart.heartData);
    const givenHeart = useSelector(state=> state.heart.projectGivenHeart)
    const trickHeart = useSelector(state=> state.heart.trickHeart)
    const list = useSelector(state=> state.utility.list);
    const { loading, data, error } = project;
    const { loading: hLoading, data: hData, error: hError } = heart;
    const userId = getCookie('userId');

    //메인 데이터 받아오기
    useEffect(() => {
        dispatch(printMain());
    }, [dispatch]);
    //하트 기능 데이터 받아오기
    useEffect(()=>{
        if(userId) dispatch(getHeart());
        //eslint-disable-next-line
    },[userId])
    
    //메인 프로젝트들 받아오기
    if (loading) return <div>loading</div>;
    if (error) return <div>error</div>;
    if (!data) return <div>data null</div>;
    //로그인 했을 때 하트 데이터 받아오기
    if(userId) {
        if(hLoading) return <div>loading</div>;
        if(hError) return <div>error</div>;
        if(!hData) return null;
    }
    
    const { topData, immiData, themeData, newData, potenData, comData } = data;

    const onClick = (id) => {
       dispatch(viewRaise(id));
    }
    const onMove = (e)=>{
        dispatch(sideSwipe(e));
    }
    const heartfilling = (data, title) => {
        if(!userId) return alert('로그인을 먼저 해주세요');
        else {
            dispatch(heartTrick(title))
            dispatch(giveHeart(data));
            dispatch(addHeart());
        }
    }
    return (
        <>
            <MainSlide />
            <TopRanking topData={topData} onClick={onClick} onMove={onMove} currentIndex={currentIndex} heartfilling={heartfilling} list={list} heart={hData} trickHeart={trickHeart}/>
            <Imminent immiData={immiData} heartfilling={heartfilling} list={list} />
            <Theme themeData={themeData} onClick={onClick} onMove={onMove} currentIndex={currentIndex} heartfilling={heartfilling} list={list} />
            <NewProject newData={newData} onClick={onClick} onMove={onMove} currentIndex={currentIndex} heartfilling={heartfilling} list={list} />
            <PotentUp potenData={potenData} onClick={onClick} onMove={onMove} currentIndex={currentIndex} heartfilling={heartfilling} list={list} />
            <CommingSoon comData={comData} onClick={onClick} onMove={onMove} currentIndex={currentIndex} heartfilling={heartfilling} list={list} />
        </>
    );
};

export default MainIndex;