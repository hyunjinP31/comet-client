import React, {useRef} from 'react';
import CreateProject from '../detail/CreateProject';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { createProject,  setProjectInput, imageChange, figureSeller} from '../module/project';
import { goToHome } from '../module/utility';
import { useNavigate } from 'react-router-dom';

const CreateProjectContainer = () => {
    const addProject = useSelector(state=>state.project.addProject);
    const projectInputs = useRef([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e) => {
        dispatch(setProjectInput(e));
        let inputs = projectInputs.current;
        for (let i = 0; i < inputs.length ; i++){
            inputs[i].classList.remove('inValid');
            document.querySelector(`.${inputs[i].name}Alert`).innerHTML = "";
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(figureSeller());
        let inputs = projectInputs.current;
        for (let i = 0; i < inputs.length ; i++){
            if(inputs[i].value === ""){
                inputs[i].classList.add('inValid');
                document.querySelector(`.${inputs[i].name}Alert`).innerHTML = "필수입력사항 입니다.";
                return inputs[i].focus();
            }else{
                document.querySelector(`.${inputs[i].name}Alert`).innerHTML = "";
                inputs[i].classList.remove('inValid');
            }
        }
        dispatch(createProject());
        dispatch(goToHome(navigate));
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
    return (
        <div>
            <CreateProject
            addProject={addProject}
            onChange={onChange}
            onSubmit={onSubmit}
            onImageChange={onImageChange}
            numberOnly={numberOnly}
            ref={projectInputs}
             />
        </div>
    );
};

export default CreateProjectContainer;