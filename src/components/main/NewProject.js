import React from 'react';

const NewProject = () => {
    return (
        <section className='newProject'>
            <div className='newWrap'>
                <h2>신규공개</h2>
                <div className='newProjectView'>
                    <div className='newProjects'>
                        <div className='newProject'>
                            <div className='newImg'></div>
                            <div className='newText'></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='newNav'>
                <span className='newPrev newNavBtn'></span>
                <span className='newNext newNavBtn'></span>
            </div>
        </section>
    );
};

export default NewProject;