import React from 'react';

const Imminent = () => {
    return (
        <section className='imminent inner'>
            <div className='immiWrap'>
                <h2>마감임박</h2>
                <div className='immiProjectView'>
                    <div className='immiProjects'>
                        <div className='immiProject'>
                            <div className='immiImg'></div>
                            <div className='immiText'></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='immiNav'>
                <span className='immiPrev immiNavBtn'></span>
                <span className='immiNext immiNavBtn'></span>
            </div>
        </section>
    );
};

export default Imminent;