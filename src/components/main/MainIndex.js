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
import { addHeart, deleteHeart, emptyHeartTrick, emptyHeartTrickDelete, fullHeartTrick, fullHeartTrickDelete, getHeart, giveHeart } from '../module/heart';

const MainIndex = () => {
    const dispatch = useDispatch();
    const project = useSelector(state => state.project.project);
    const currentIndex = useSelector(state=>state.project.projectSideSwipe);
    const heart = useSelector(state=> state.heart.heartData);
    const trickFullHeart = useSelector(state=> state.heart.trickHeart.full);
    const trickEmptyHeart = useSelector(state=>state.heart.trickHeart.empty);
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
    let like;
    if(hData) like = hData.map(like => like.projectTitle);
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
            if(trickFullHeart.includes(title)) {
                dispatch(fullHeartTrickDelete(title));
                dispatch(emptyHeartTrick(title));
                dispatch(deleteHeart(title))
            }else {
                dispatch(emptyHeartTrickDelete(title));
                dispatch(fullHeartTrick(title));
                dispatch(giveHeart(data));
                dispatch(addHeart());
            }
        }
    }
    return (
        <>
            <MainSlide />
            <TopRanking topData={topData} onClick={onClick} onMove={onMove} currentIndex={currentIndex} heartfilling={heartfilling} heart={hData} trickFullHeart={trickFullHeart} like={like} trickEmptyHeart={trickEmptyHeart}/>
            <Imminent immiData={immiData} heartfilling={heartfilling} heart={hData} trickFullHeart={trickFullHeart} like={like} trickEmptyHeart={trickEmptyHeart} />
            <Theme themeData={themeData} onClick={onClick} onMove={onMove} currentIndex={currentIndex} heartfilling={heartfilling} heart={hData} trickFullHeart={trickFullHeart} like={like} trickEmptyHeart={trickEmptyHeart} />
            <NewProject newData={newData} onClick={onClick} onMove={onMove} currentIndex={currentIndex} heartfilling={heartfilling} heart={hData} trickFullHeart={trickFullHeart} like={like} trickEmptyHeart={trickEmptyHeart} />
            <PotentUp potenData={potenData} onClick={onClick} onMove={onMove} currentIndex={currentIndex} heartfilling={heartfilling} heart={hData} trickFullHeart={trickFullHeart} like={like} trickEmptyHeart={trickEmptyHeart} />
            <CommingSoon comData={comData} onClick={onClick} heartfilling={heartfilling} heart={hData} trickFullHeart={trickFullHeart} like={like} trickEmptyHeart={trickEmptyHeart} />
        </>
    );
};

export default MainIndex;