import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
const UserData = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8000/api/users");
      setData(res.data);
      console.log("user data", data);
    };
    fetchData();
  }, []);

  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-3">
      {data?.slice().reverse().map((val) => (
        
        <UserCard key={val._id} user={val} />
      ))}
      </div>
    </>
  );
};

export default UserData;
