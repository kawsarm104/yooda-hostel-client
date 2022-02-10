import React from "react";
import { Link } from "react-router-dom";
// material ui card start 
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// material ui card end 

const UserExperienceChild = ({ blog }) => {
    const { _id, name, email, comment, rating } = blog;

    return (
        <>
            <div className="col-sm-12 col-md-4 mt-3 h-100">
                <Card className="" >

                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            {name}
                        </Typography>
                        {/* <Typography gutterBottom variant="p" component="div">
              Name: {name}
            </Typography> */}
                        <Typography gutterBottom variant="p" component="div">
                            {email}
                        </Typography>
                        <Typography gutterBottom variant="p" component="div">
                            {comment}
                        </Typography>

                    </CardContent>

                </Card>
            </div>
        </ >
    );
};

export default UserExperienceChild;