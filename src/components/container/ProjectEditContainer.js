import React, { useEffect, useRef } from 'react';
import ProjectEdit from '../detail/ProjectEdit';
import { useSelector, useDispatch } from 'react-redux';
import { editDefaultValue, editProject, imageChange, resetProjectInput, setProjectInput } from '../module/project';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectEditContainer = () => {
    const addProject = useSelector(state=>state.project.addProject);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        dispatch(editDefaultValue(id))
        return ()=>{
            dispatch(resetProjectInput());
        }
        //eslint-disable-next-line
    },[])
    const onChange = (e) => {

    }
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(editProject(id));
    }
    const onImageChange = (e) => {
        dispatch(imageChange(e));
    }
    const numberOnly = (e) =>{
        let { name, value } = e.target;
        if(name === 'projectPrice' && isNaN(value)){
            value = "";
            return document.querySelector('.projectPriceAlert').innerHTML = "숫자만 입력가능합니다.";
        }
        if(name === 'projectGoal' && isNaN(value)){
            value = "";
            return document.querySelector('.projectGoalAlert').innerHTML = "숫자만 입력가능합니다.";
        }
        if ( name === 'projectPrice') document.querySelector('.projectPriceAlert').innerHTML = "";
        else document.querySelector('.projectGoalAlert').innerHTML = "";
        dispatch(setProjectInput(e));
    }
    const editInput = useRef([]);
    return (
        <div>
            <ProjectEdit
            addProject={addProject}
            onSubmit={onSubmit}
            onChange={onChange}
            ref={editInput}
            onImageChange={onImageChange}
            numberOnly={numberOnly}
            />
        </div>
    );
};

export default ProjectEditContainer;