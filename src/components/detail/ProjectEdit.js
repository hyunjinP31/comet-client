import React, { forwardRef } from 'react';
import { AiOutlineCamera } from 'react-icons/ai'
import { IMG_URL } from '../../config/contansts';

const ProjectEdit = forwardRef(({onChange, onSubmit,addProject,onImageChange,numberOnly},editInput) => {
    return (
        <>
            <div className='createWrap inner'>
                <h1>꼬리별</h1>
                <form onSubmit={onSubmit}>
                    <ul>
                        <li>
                            <div>
                                <p>프로젝트 제목</p>
                                <div>
                                    <input className='projectEditInput' ref={el => editInput.current[0] = el} type='text' name='projectTitle' onChange={onChange} value={addProject.projectTitle} />
                                    <p className='projectTitleAlert formAlert'></p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>프로젝트 사진</p>
                                <div className='cameraInit'>
                                    <input type='file' name='projectImg' onChange={onImageChange} />
                                    <div className='cameraIcon'>
                                        {addProject.projectImg && <img src={`${IMG_URL}/${addProject.projectImg}`} alt='사용자가 올린 사진' className='imgView' />}
                                        <AiOutlineCamera />
                                        <span>이미지 업로드</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>프로젝트 가격</p>
                                <div>
                                    <input className='projectEditInput' ref={el => editInput.current[1] = el} type='text' name='projectPrice' onChange={numberOnly} value={addProject.projectPrice} />
                                    <p className='projectPriceAlert formAlert'></p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>프로젝트 목표금액</p>
                                <div>
                                    <input className='projectEditInput' ref={el => editInput.current[2] = el} type='text' name='projectGoal' onChange={numberOnly} value={addProject.projectGoal} />
                                    <p className='projectGoalAlert formAlert'></p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>프로젝트 마감일</p>
                                <div>
                                    <input className='projectEditInput' ref={el => editInput.current[3] = el} type='date' name='projectEndDate' onChange={onChange} value={addProject.projectEndDate} />
                                    <p className='EndDateAlert formAlert'></p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>프로젝트 분류</p>
                                <div>
                                    <span className='createRadioInput'><input ref={el => editInput.current[4] = el} type='radio' name='projectType' onChange={onChange} value='의류' defaultChecked={addProject.projectType === "의류" ? true : false} />의류</span>
                                    <span className='createRadioInput'><input ref={el => editInput.current[4] = el} type='radio' name='projectType' onChange={onChange} value='식음료' defaultChecked={addProject.projectType === "식음료" ? true : false} />식음료</span>
                                    <span className='createRadioInput'><input ref={el => editInput.current[4] = el} type='radio' name='projectType' onChange={onChange} value='취미' defaultChecked={addProject.projectType === "취미" ? true : false} />취미</span>
                                    <span className='createRadioInput'><input ref={el => editInput.current[4] = el} type='radio' name='projectType' onChange={onChange} value='도서' defaultChecked={addProject.projectType === "도서" ? true : false} />도서</span>
                                    <span className='createRadioInput'><input ref={el => editInput.current[4] = el} type='radio' name='projectType' onChange={onChange} value='화장품' defaultChecked={addProject.projectType === "화장품" ? true : false} />화장품</span>
                                    <p className='projectTypeAlert formAlert'></p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <button type='submit'>수정하기</button>
                        </li>
                    </ul>
                </form>
            </div>
        </>
    );
});

export default ProjectEdit;