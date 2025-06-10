import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";
import Navbar from "../Navbar";

export default function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "username" });
  const { CurrentUser, setCurrentUser } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3002/userProfile/${userId}`
          );
          setUserDetails(response.data);
        } catch (err) {
          console.error("Cannot fetch user details: ", err);
        }
      }
    };
    fetchUserDetails();
  }, []);
  return (
    <>
      <Navbar />
      <div className="p-5 text-center">
        <UnderlineNav aria-label="Repository" className="m-auto">
          <UnderlineNav.Item
            aria-current="page"
            icon={BookIcon}
            style={{
              backgroundColor: "transparent",
              color: "black",
              "&:hover": {
                textDecoration: "underline",
                color: "black",
              },
            }}
          >
            Overview
          </UnderlineNav.Item>

          <UnderlineNav.Item
            onClick={() => navigate("/repo")}
            icon={RepoIcon}
            style={{
              backgroundColor: "transparent",
              color: "blacksmoke",
              "&:hover": {
                textDecoration: "underline",
                color: "black",
              },
            }}
          >
            Starred Repositories
          </UnderlineNav.Item>
        </UnderlineNav>

        <button
         
          style={{ position: "fixed", bottom: "50px", right: "50px" }}
          id="logout"
        >
          Logout
        </button>

        <div className="profile-page-wrapper m-auto">
          <div className="user-profile-section">
            <div className="profile-image"></div>

            <div className="name">
              <h3>{userDetails.username}</h3>
            </div>

            {CurrentUser && <button className="follow-btn">Follow</button>}
            {!CurrentUser && <button className="follow-btn">Follow</button>}

            <div className="follower">
              <p>10 Follower</p>
              <p>3 Following</p>
            </div>
          </div>

          <div className="heat-map-section">
            <HeatMapProfile />
          </div>
        </div>
      </div>
    </>
  );
}
