import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import ShowFood from '../ShowFood/ShowFood';

const AddFood = () => {
    const { register, handleSubmit, watch, reset } = useForm();
    const [flag, setFlag] = useState(false)

    const onSubmit = data => {
        fetch(`https://sheltered-dusk-87467.herokuapp.com/foods`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your food has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    if (flag) {
                        setFlag(false)
                    }
                    else {
                        setFlag(true)
                    }
                    reset()
                }
            })
    }

    return (<>
        <div className=''>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input required type="text" {...register("name")} placeholder="" />
                    <input required type="number" {...register("price")} placeholder="" />
                    <input className='btn btn-outline-info' type="submit" value="ADD FOOD" />
                </form>
            </div>
        </div>
        <ShowFood flag={flag}></ShowFood>
    </>
    );
};

export default AddFood;