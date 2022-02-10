import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import ShowStudents from '../ShowStudents/ShowStudents';

const AddNewStudent = () => {
    const { register, handleSubmit, watch, reset } = useForm();
    const [flag, setFlag] = useState(false)

    const onSubmit = data => {
        fetch(`https://sheltered-dusk-87467.herokuapp.com/students`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Student Added',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    reset()
                    if (flag) {
                        setFlag(false)
                    }
                    else {
                        setFlag(true)
                    }
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Roll already exit',
                    })
                }
            })
    }
    return (
        <>
            <div className=' '>
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)} className=''>
                        <input type="text" {...register("fullName")} placeholder="Full Name" />
                        <input type="number" {...register("roll")} placeholder="Student Roll" />
                        <input type="number" {...register("age")} placeholder="Student Age" />
                        <input type="number" {...register("class")} placeholder="Student Class" />
                        <input type="text" {...register("hall")} placeholder="Student Hall Name" />
                        <select type="text" {...register("status")}>
                            <option value="active">Active</option>
                            <option value="inActive">Inactive</option>
                        </select>
                        <input type="submit" className='btn btn-outline-info' value="ADD NEW STUDENT" />
                    </form>
                </div>
            </div>
            <ShowStudents flag={flag}></ShowStudents>
        </>
    );
};

export default AddNewStudent;