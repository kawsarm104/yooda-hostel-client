import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import swal from "sweetalert";
import useAuth from '../../../Hooks/useAuth';
const PendingRequest = (props) => {
    const { admin } = useAuth()
    const [approved, setApproved] = useState(false)

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch(`https://sheltered-dusk-87467.herokuapp.com/allblogs`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setBlogs(data)
            });
    }, [props.flag, props.flags]);
    const handleProductDelete = (id) => {
        const url = `https://sheltered-dusk-87467.herokuapp.com/blog/${id}`;
        axios.delete(url).then((res) => {
            const data = res.data;
            if (data.acknowledged) {
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this Car Details!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        const filterData = blogs.filter((item) => item._id !== id);
                        setBlogs(filterData);
                        swal("Poof! Your Car Product has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
            } else {
                swal(data.message, {
                    icon: "error",
                });
            }
        });
    };
    const handleProductStatus = id => {

        const status = 'approve';
        const api = `https://sheltered-dusk-87467.herokuapp.com/statusupdate/${id}`
        fetch(api, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ status }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.modifiedCount) {
                    setApproved(true)
                    console.log("status changed Successfully")
                }

            });
    };

    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>cost</th>

                    {admin &&
                        <th>Action</th>
                    }
                </tr>
            </thead>
            <tbody>
                {blogs.map((blog, index) => (
                    <tr key={blog._id + "sodsfsfs"}>
                        <td>{index + 1}</td>
                        {/* <td>{blog.image}</td> */}
                        <td>{blog.name}</td>
                        {/* <td>{blog.title}</td> */}
                        {/* <td>{blog.travelarInfo}</td> */}
                        <td >{blog.price}</td>


                        {/* <td>
                            {blog?.status === "pending" && <Button variant="success" onClick={() => handleProductStatus(blog._id)} disabled={approved}>Approve</Button>
                            }</td> */}


                        <td > <> <Button variant="info" className="me-2" onClick={() => handleProductDelete(blog._id)}>Edit</Button>
                            <Button variant="danger" onClick={() => handleProductDelete(blog._id)}>Delete</Button> </></td>


                    </tr>
                ))}



            </tbody>
        </Table>
    );
};

export default PendingRequest;