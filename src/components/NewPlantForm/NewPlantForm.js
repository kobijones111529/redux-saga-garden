import React, {useState}from 'react';
import { useDispatch } from 'react-redux';

const NewPlantForm = () => {
    const dispatch = useDispatch();
    
    //Initial state is an OBJECT, with keys id and name
    let [newPlant, setPlant] = useState('');

    const handleNameChange = (event) => {
        setPlant(event.target.value);
    }

    const addNewPlant = event => {
        event.preventDefault();
        dispatch({ type: 'ADD_PLANT', payload: newPlant });
        setPlant('');
    }
    return (
        <div>
            <h3>This is the form</h3>
            <form onSubmit={addNewPlant}>
                <input type='text' value={newPlant} onChange={handleNameChange} />
                <input type='submit' value='Add New Plant' />
            </form>
        </div>
    );
}


export default NewPlantForm;
