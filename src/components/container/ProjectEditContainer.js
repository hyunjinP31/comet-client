import React, { useEffect, useRef } from 'react';
import ProjectEdit from '../detail/ProjectEdit';
import { useSelector, useDispatch } from 'react-redux';
import { editDefaultValue, editProject, imageChange, resetProjectInput, setProjectInput } from '../module/project';
import { useNavigate, useParams } from 'react-router-dom';
import { goToHome } from '../module/utility';
import HashLoader from 'react-spinners/HashLoader';

const override = {
    display: "block",
    margin: "0 auto",
    width: "100%",
    height: "700px",
};
const ProjectEditContainer = () => {
    const addProject = useSelector(state=>state.project.addProject);
    const projectData = useSelector(state=> state.project.projectData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const editInput = useRef([]);
    const { loading, data, error } = projectData;
    let inputs = editInput.current;
    useEffect(()=>{
        dispatch(editDefaultValue(id))
        return ()=>{
            dispatch(resetProjectInput());
        }
        //eslint-disable-next-line
    },[])
    const onChange = (e) => {
        dispatch(setProjectInput(e));
        for (let i = 0; i < inputs.length ; i++){
            if(document.querySelector(`.${inputs[i].name}Alert`)){
                inputs[i].classList.remove('inValid');
                document.querySelector(`.${inputs[i].name}Alert`).innerHTML = "";
            }
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        for (let i = 0; i < inputs.length ; i++){
            if(document.querySelector(`.${inputs[i].name}Alert`)){
                if(inputs[i].value === "" || Number(inputs[i].value) === 0 || Boolean(inputs[i].value) === false){
                    inputs[i].classList.add('inValid');
                    document.querySelector(`.${inputs[i].name}Alert`).innerHTML = "필수입력사항 입니다.";
                    return inputs[i].focus();
                }else{
                    document.querySelector(`.${inputs[i].name}Alert`).innerHTML = "";
                    inputs[i].classList.remove('inValid');
                }
            }
        }
        dispatch(editProject(id));
        dispatch(goToHome(navigate));
    }
    const onImageChange = (e) => {
        dispatch(imageChange(e));
    }
    const numberOnly = (e) =>{
        let { name, value } = e.target;
        if(document.querySelector('.projectPriceAlert') && document.querySelector('.projectGoalAlert')) {
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
        }
        dispatch(setProjectInput(e));
    }
    if(loading) return <HashLoader cssOverride={override} color="#838dd2" size={55}/>;
    if(error) return console.log(error);
    if(!data) return;
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