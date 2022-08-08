import React from 'react';
import { AiOutlineCamera } from 'react-icons/ai'
import { API_URL } from '../../config/contansts';

const CreateProject = ({ addProject, onChange, onSubmit, onImageChange }) => {
    return (
        <>
            <div className='createWrap inner'>
                <h1>꼬리별</h1>
                <form onSubmit={onSubmit}>
                    <ul>
                        <li>
                            <div>
                                <p>프로젝트 제목</p>
                                <input type='text' name='projectTitle' onChange={onChange} value={addProject.projectTitle} />
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>프로젝트 사진</p>
                                <div className='cameraInit'>
                                    <input type='file' name='projectImg' onChange={onImageChange} value={addProject.projectImg} />
                                    <div className='cameraIcon'>
                                        { addProject.projectImg && <img src={`${API_URL}/upload/${addProject.projectImg}`} alt='사용자가 올린 사진' className='imgView'/> }
                                        <AiOutlineCamera />
                                        <span>이미지 업로드</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>프로젝트 가격</p>
                                <input type='text' name='projectPrice' onChange={onChange} value={addProject.projectPrice} />
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>프로젝트 목표금액</p>
                                <input type='text' name='projectGoal' onChange={onChange} value={addProject.projectGoal} />
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>프로젝트 마감일</p>
                                <input type='text' name='projectEndDate' onChange={onChange} value={addProject.projectEndDate} />
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>프로젝트 분류</p>
                                <input type='text' name='projectType' onChange={onChange} value={addProject.projectType} />
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>프로젝트 키워드</p>
                                <input type='text' name='projectKeyword' onChange={onChange} value={addProject.projectKeyword} />
                            </div>
                        </li>
                        <li>
                            <button type='submit'>등록하기</button>
                        </li>
                    </ul>
                </form>
            </div>
        </>
    );
};

export default CreateProject;