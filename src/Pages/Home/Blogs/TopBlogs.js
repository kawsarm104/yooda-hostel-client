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

const TopBlogs = ({ blog }) => {
const { _id, name, day, image, writer, writerImg, desc1, desc2, facility, accommodation, date, category } = blog;

  return (
    <>
      <div className="col-12 mt-3 h-100">
        <Card className="" >
          <CardMedia
            component="img"
            style={{ width: "100%" }}
            image={image}
            alt="blog pic"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <Typography gutterBottom variant="p" component="div">
              location: {category}
            </Typography>
            <Typography gutterBottom variant="p" component="div">
              Price: {blog?.price} BDT
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {accommodation?.split(' ').slice(0, 8).toString().replace(/,/g, ' space')}
            </Typography>
          </CardContent>
          <CardActions className="d-flex justify-content-end">
            <Link to={`/blogs/${_id}`} style={{ textDecoration: "none" }}>
              <Button size="small" className="">View Details</Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    </ >
  );
};

export default TopBlogs;