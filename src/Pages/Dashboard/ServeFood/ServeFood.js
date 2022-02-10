import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const ServeFood = () => {
    let today = new Date().toLocaleDateString()
    const { register, handleSubmit, watch, reset } = useForm();


    const [student, setStudent] = useState({})
    const [students, setStudents] = useState([])
    const [foods, setFoods] = useState([])
    const [selectItems, setSelectItems] = useState([])
    const [roll, setRoll] = useState([])

    let rollRef = useRef(null)

    useEffect(() => {
        fetch(`https://sheltered-dusk-87467.herokuapp.com/students`)
            .then(res => res.json())
            .then(data => setStudents(data.payload))

        fetch(`https://sheltered-dusk-87467.herokuapp.com/foods`)
            .then(res => res.json())
            .then(data => setFoods(data.payload))
    }, [])

    const handleStudentRoll = (e) => {
        const id = e.target.value
        const selectStudent = students.find(std => std.roll === id)

        if (selectStudent) {
            setStudent(selectStudent)
        }

    }


    const onSubmit = data => {
        const studentMeal = { ...data, status: "served", foodItemList: selectItems, studentId: student.roll }
        const api = `https://sheltered-dusk-87467.herokuapp.com/foodserve`
        fetch(api, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(studentMeal)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Food served',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    reset()
                    setStudent("")
                    setSelectItems([])
                    rollRef.current.value = ""
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sorry...',
                        text: `${data.message}`,

                    })
                }
            })
    }

    return (
        <div className=''>

            <form>

            </form>

            <div className=" w-100">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className='form-control w-100' type="number" onChange={handleStudentRoll} placeholder="Enter student roll" ref={rollRef} />

                    <input className='form-control' type="number" value={student ? student?.roll : "Student Not Found"} placeholder="Student roll" {...register("studentId")} />
                    <input className='form-control mt-2' type="text" {...register("date")} value={today} />
                    <select className='form-control mt-2 mb-2 ' {...register("shift")} >
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                    <input className='form-control mt-2 btn-outline-info' type="submit" value="SERVE" />
                </form>
            </div>
        </div>
    );
};

export default ServeFood;