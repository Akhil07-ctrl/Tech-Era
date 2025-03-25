import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../Header";
import "./index.css";

const CourseItemDetails = () => {
  const { id } = useParams(); // Extract course ID from URL params
  const [courseDetails, setCourseDetails] = useState({});
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error'

  useEffect(() => {
    fetchCourseDetails();
  }); // Fetch data when component mounts

  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`);
      const data = await response.json();

      if (response.ok) {
        const updatedData = {
          description: data.course_details.description,
          id: data.course_details.id,
          name: data.course_details.name,
          imageUrl: data.course_details.image_url,
        };
        setCourseDetails(updatedData);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
      setStatus("error");
    }
  };

  return (
    <div className="course-item-container">
      <Header />
      <div className="content">
        {status === "loading" && (
          <div className="spinner">
            <p>Loading...</p>
          </div>
        )}

        {status === "success" && (
          <div className="course-details">
            <img src={courseDetails.imageUrl} alt={courseDetails.name} className="course-image" />
            <div className="course-info">
              <h1>{courseDetails.name}</h1>
              <p>{courseDetails.description}</p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="error-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for</p>
            <button className="retry-button" onClick={fetchCourseDetails}>
              Retry
            </button>
          </div>
        )}
      </div>
       
    </div>
  );
};

export default CourseItemDetails;
