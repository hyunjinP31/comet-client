import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi'

const CommingSoon = () => {
    return (
        <section className='commingSoon inner'>
            <div className='comTop topTitle'>
                <h2 className='sectionTitle'>공개예정</h2>
                <span><span>전체보기</span><HiArrowNarrowRight /></span>
            </div>
            <ul className='comBottom'>
                <li className='comProject'>
                    <div className='comImg'></div>
                    <div className='comText'></div>
                </li>
            </ul>
        </section>
    );
};

export default CommingSoon;