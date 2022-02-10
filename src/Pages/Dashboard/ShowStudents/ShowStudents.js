import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import './ShowStudents.css'

const ShowStudents = (props) => {
    const [show, setShow] = useState(false);
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState({});
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(0)
    const [isActive, setIsActive] = useState(false)

    const handleClose = () => setShow(false);


    const { register, handleSubmit, reset } = useForm();

    let checkId = [];

    useEffect(() => {
        fetch(`https://sheltered-dusk-87467.herokuapp.com/students?page=${page}&&size=5`)
            .then(res => res.json())
            .then(data => {
                setStudents(data.payload)
                const count = data.count
                const pageNumber = Math.ceil(count / 5)
                setPageSize(pageNumber);
            })

    }, [page, props.flag, isActive])

    const handleEdit = id => {
        fetch(`https://sheltered-dusk-87467.herokuapp.com/students/${id}`)
            .then(res => res.json())
            .then(data => setStudent(data))
        setShow(true)
    }

    const handleDelete = id => {
        Swal.fire({
            title: 'Do you want to Delete the food?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://sheltered-dusk-87467.herokuapp.com/students/${id}`, {
                    method: "delete"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            Swal.fire('Delete!', '', 'success')
                        }
                    })
            }
        })

    }

    const handleCheckbox = id => {
        const checkBox = document.getElementById(`${id}`)
        if (checkBox.checked) {
            checkId.push(id)
        }
        else {
            for (let i = 0; i < checkId.length; i++) {
                if (checkId[i] === id) {
                    checkId.splice(i, 1)
                }
            }
        }
    }

    const onSubmit = data => {
        console.log(data);
        fetch(`https://sheltered-dusk-87467.herokuapp.com/students/${data._id}`, {
            method: "put",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Your food has been updated',
                    showConfirmButton: false,
                    timer: 1500
                })
                setShow(false)
            })
    }

    const handleActiveStatus = () => {

        checkId.forEach(id => {
            fetch(`https://sheltered-dusk-87467.herokuapp.com/student/${id}?status=active`, {
                method: "put"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Your food has been updated',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        checkId.forEach(id => {
                            document.getElementById(`${id}`).checked = false;
                        });
                        if (isActive) {
                            setIsActive(false)
                        }
                        else {
                            setIsActive(true)
                        }
                    }
                })
        });
    }

    const handleInActiveStatus = () => {
        checkId.forEach(id => {
            fetch(`https://sheltered-dusk-87467.herokuapp.com/student/${id}?status=inActive`, {
                method: "put"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Your food has been updated',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        checkId.forEach(id => {
                            document.getElementById(`${id}`).checked = false;
                        });
                        if (isActive) {
                            setIsActive(false)
                        }
                        else {
                            setIsActive(true)
                        }
                    }

                })
        });
    }

    return (
        <div className='container'>
            <button className='btn btn-outline-primary mb-3 me-2' onClick={handleActiveStatus}>Active</button>
            <button className='btn btn-outline-info mb-3 me-2' onClick={handleInActiveStatus}>In Active</button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Checkbox</th>
                        <th>Student Name</th>
                        <th>Roll</th>
                        <th>Age</th>
                        <th>Class</th>
                        <th>Hall</th>
                        <th>Status</th>

                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((stdnt, index) => <tr>

                            <td> <input id={stdnt?._id} type="checkbox" onChange={() => handleCheckbox(stdnt?._id)} /> </td>
                            <td>{stdnt?.fullName}</td>
                            <td>{stdnt?.roll}</td>
                            <td>{stdnt?.age}</td>
                            <td>{stdnt?.class}</td>
                            <td>{stdnt?.hall}</td>
                            <td>{stdnt?.status}</td>
                            <td>
                                <button className='btn btn-outline-info me-1' onClick={() => handleEdit(stdnt?._id)}>EDIT</button>

                                <button className='btn btn-outline-danger' onClick={() => handleDelete(stdnt?._id)}>DELETE</button>
                            </td>
                        </tr>)
                    }

                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose} centered>

                <form style={{ padding: "20px" }} onSubmit={handleSubmit(onSubmit)}>
                    <input style={{ display: "block", height: "50px", width: "100%", marginBottom: "5px" }}
                        defaultValue={student?.fullName} {...register("fullName")} />

                    <input type="number" style={{ display: "block", height: "50px", width: "100%", marginBottom: "5px" }}
                        defaultValue={student?.roll} {...register("roll")} />

                    <input type="number" style={{ display: "block", height: "50px", width: "100%", marginBottom: "5px" }}
                        defaultValue={student?.age} {...register("age")} />

                    <input type="number" style={{ display: "block", height: "50px", width: "100%", marginBottom: "5px" }}
                        defaultValue={student?.class} {...register("class")} />

                    <input type="text" style={{ display: "block", height: "50px", width: "100%", marginBottom: "5px" }}
                        defaultValue={student?.class} {...register("hall")} />

                    <input style={{ display: "block", height: "50px", width: "100%", marginBottom: "5px" }} className="btn btn-outline-info" type="submit" value="Update Student Info" />
                </form>
            </Modal>
            {
                [...Array(pageSize).keys()].map(pageNum => <Button className='me-1 ' onClick={() => setPage(pageNum)}>{pageNum + 1}</Button>)
            }
        </div>
    );
};

export default ShowStudents;