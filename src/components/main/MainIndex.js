import React from 'react';
import CommingSoon from './CommingSoon';
import Imminent from './Imminent';
import MainSlide from './MainSlide';
import NewProject from './NewProject';
import PotentUp from './PotentUp';
import Theme from './Theme';
import TopRanking from './TopRanking';

const MainIndex = () => {
    return (
        <>
            <MainSlide />
            <TopRanking />
            <Imminent />
            <Theme />
            <NewProject />
            <PotentUp />
            <CommingSoon />
        </>
    );
};

export default MainIndex;