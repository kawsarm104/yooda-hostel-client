import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Blog from './Blog';
import './Blogs.css';
// react spinner 
import { css } from "@emotion/react";
import { HashLoader } from "react-spinners";
import TopBlogs from "./TopBlogs";
// react spinner 

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const size = 10;

  useEffect(() => {
    fetch(`https://sheltered-dusk-87467.herokuapp.com/blogs?page=${page}&&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs);
        console.log(data.blogs)
        const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
      });
  }, [page]);
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

      <Row className="mx-auto">
        <Col sm={12} md={3}>
          <div className=" d-flex justify-content-center">
            <h3 className="text-primary my-4">Top Blogs</h3>
          </div>
          <Row className="mx-auto blogs-class">
            {blogs?.slice(3, 6).map((blog) => (
              <TopBlogs key={blog._id}
                blog={blog}>
              </TopBlogs>


            ))}
          </Row>
        </Col>

        <Col sm={12} md={9}>
          <div className=" d-flex justify-content-center">
            <h3 className="text-primary my-4">Our Blogs</h3>
          </div>
          <Row className="mx-auto blogs-class ">
            {blogs?.map((blog) => (
              <Blog key={blog._id}
                blog={blog}>
              </Blog>


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
        </Col>
      </Row>

    </>
  );
};

export default Blogs;