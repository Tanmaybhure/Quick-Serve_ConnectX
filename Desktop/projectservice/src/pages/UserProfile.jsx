import React, { useEffect, useState } from "react";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/session-check", {
          method: "GET",
          credentials: "include", // Ensure cookies are included for session tracking
        });
        const data = await response.json();
        if (data.loggedIn) {
          setUser({
            email: data.username, // Assuming username is the email
            id: data.customerId,  // Assuming customerId is also returned
          });
        } else {
          setErrorMessage("User is not logged in.");
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        {user ? (
          <div>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.id}</p>
          </div>
        ) : (
          <p>No user information available.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
