import React from 'react';
import CreateProject from '../detail/CreateProject';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { createProject, setImageUrl, setProjectInput } from '../module/project';
import axios from 'axios';
import { API_URL } from '../../config/contansts';

const CreateProjectContainer = () => {
    const addProject = useSelector(state=>state.project.addProject);
    const dispatch = useDispatch();
    const onChange = (e) => {
        dispatch(setProjectInput(e));
    }
    const onSubmit = (e) => {
        e.preventDefault();
        // createProject();
        console.log(addProject)
    }
    const onImageChange = (e)=>{
        const { name } = e.target;
        const imageFormData = new FormData();
        imageFormData.append(name, e.target.files[0]);
        axios.post(`${API_URL}/upload`, imageFormData, {
            Headers: { 'content-type': 'multipart/form-data' },
        }).then(res=>{
            dispatch(setImageUrl(e, res.data.projectImg))
        }).catch(e=> console.log(e))
        
    }
    return (
        <div>
            <CreateProject
            addProject={addProject}
            onChange={onChange}
            onSubmit={onSubmit}
            onImageChange={onImageChange}
             />
        </div>
    );
};

export default CreateProjectContainer;