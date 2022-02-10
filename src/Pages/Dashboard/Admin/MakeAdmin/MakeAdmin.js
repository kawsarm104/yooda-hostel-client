import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
// react hot toast 
import toast, { Toaster } from 'react-hot-toast';
// react hot toast 

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const MakeAdmin = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        data.role = 'admin';
        const email = data.email;
        const api = `https://sheltered-dusk-87467.herokuapp.com/makeadmin/${email}`
        axios.put(api, data)
            .then(result => {
                console.log(result.data);
                if (result.data.modifiedCount || result.data.upsertedCount) {
                    toast.success("Made Admin Successfully")
                } else if (result.data.matchedCount) {
                    toast.error("Already Admin")
                } else {
                    toast.error('Something is wrong, Please try again!')

                }
            })
    }
    return (
        <div className="text-center">
            <h2 className="">Make an Admin</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField id="filled-basic" label="Enter Email" variant="filled" className="w-50" {...register("email")} type="email" />
                <br />
                <Button type="submit" className="my-2" variant="contained">Make Admin</Button>
            </form>
            {/* hot toast  */}
            <Toaster position="top-right" />
            {/* hot toast  */}

        </div>
    );
};

export default MakeAdmin;