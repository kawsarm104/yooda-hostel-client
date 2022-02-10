import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const ShowFood = (props) => {
    const [show, setShow] = useState(false);
    const [food, setFood] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const { register, handleSubmit, reset } = useForm();

    const [foods, setFoods] = useState([])
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(0)

    useEffect(() => {
        fetch(`https://sheltered-dusk-87467.herokuapp.com/foods?page=${page}&&size=5`)
            .then(res => res.json())
            .then(data => {
                setFoods(data.payload)
                const count = data.count
                const pageNumber = Math.ceil(count / 4)
                setPageSize(pageNumber);
            })

    }, [page, props.flag])

    const handleEdit = id => {
        fetch(`https://sheltered-dusk-87467.herokuapp.com/foods/${id}`)
            .then(res => res.json())
            .then(data => setFood(data))
        setShow(true)
    }

    const onSubmit = data => {
        fetch(`https://sheltered-dusk-87467.herokuapp.com/foods/${data._id}`, {
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

    const handleDelete = id => {
        Swal.fire({
            title: 'Do you want to Delete the food?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://sheltered-dusk-87467.herokuapp.com/foods/${id}`, {
                    method: "delete"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            Swal.fire('Saved!', '', 'success')
                        }
                    })
            }
        })

    }
    return (
        <div className='container'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Food Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        foods.map((pd, index) => <tr>
                            <td>{pd?.name}</td>
                            <td>{pd?.price}</td>
                            <td>
                                <button className='btn btn-outline-info me-1' onClick={() => handleEdit(pd?._id)}>EDIT</button>

                                <button className='btn btn-outline-danger' onClick={() => handleDelete(pd?._id)}>DELETE</button>
                            </td>
                        </tr>)
                    }

                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose} centered>

                <form style={{ padding: "20px" }} onSubmit={handleSubmit(onSubmit)}>
                    <input style={{ display: "block", height: "50px", width: "100%", marginBottom: "5px" }}
                        defaultValue={food?.name} {...register("name")} />

                    <input style={{ display: "block", height: "50px", width: "100%", marginBottom: "5px" }} type="number"
                        defaultValue={food?.price} {...register("price")} />

                    <input style={{ display: "block", height: "50px", width: "100%" }} className="btn btn-outline-info" type="submit" value="SAVE" />
                </form>
            </Modal>
            {
                [...Array(pageSize).keys()].map(pageNum => <Button className='me-1 btn btn-primary' onClick={() => setPage(pageNum)}>{pageNum + 1}</Button>)
            }
        </div>
    );
};

export default ShowFood;