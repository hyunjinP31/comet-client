import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi'

const CommingSoon = () => {
    return (
        <section className='commingSoon'>
            <div className='comTop'>
                <h2>공개예정</h2>
                <span><span>전체보기</span><HiArrowNarrowRight /></span>
            </div>
            <div className='comBottom'>
                <div className='comProjects'>
                    <div className='comImg'></div>
                    <div className='comText'></div>
                </div>
            </div>
        </section>
    );
};

export default CommingSoon;