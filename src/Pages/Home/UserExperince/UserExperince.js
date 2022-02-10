import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import UserExperienceChild from './UserExperienceChild';

// react spinner 
import { css } from "@emotion/react";
import { HashLoader } from "react-spinners";
// react spinner 

const UserExperience = () => {
    const [blogs, setBlogs] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 3;

    useEffect(() => {
        const url = `https://sheltered-dusk-87467.herokuapp.com/yourexperience?page=${page}&&size=${size}`
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data.blogs);
                console.log(data.blogs)
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber);
            });
    }, []);
    // calling api to get advocate details  
    // react spinner 
    let [spinner, setSpinner] = useState(true);
    let [color, setColor] = useState("#36D7B7");
    const override = css`
  display: block;
  margin: 125px auto;
  border-color: red;
`;
    // react spinner 


    if (blogs.length === 0) {
        return <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            {" "}
            <HashLoader color={color} spinner={spinner} css={override} size={65} />
        </div>
    }
    return (
        <>
            <div className=" d-flex justify-content-center">
                <h3 className="text-primary my-4">User Experience</h3>
            </div>

            <Row className="mx-auto blogs-class">
                {blogs?.map((blog) => (
                    <UserExperienceChild key={blog._id}
                        blog={blog}>
                    </UserExperienceChild>


                ))}
                <div className="pagination d-flex align-items-center justify-content-center ">
                    {[...Array(pageCount).keys()].map((number) => (
                        <button
                            className={number === page ? "selected" : ""}
                            key={number}
                            onClick={() => setPage(number)}
                        >
                            {number + 1}
                        </button>
                    ))}
                </div>
            </Row>
        </>
    );
};

export default UserExperience;