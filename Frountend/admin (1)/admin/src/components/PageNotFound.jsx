import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img
          src="https://media.istockphoto.com/id/1278808623/vector/cat-sits-in-a-box-with-a-404-sign-page-or-file-not-found-connection-error.jpg?s=612x612&w=0&k=20&c=oQLypQ5q2p6-5o3-jvZzbPMxS2XPVt8_dCCnvBVL8R4=" // Replace with your comedy image URL
          alt="Comedy"
          style={styles.image}
        />
      </div>
      <div style={styles.messageContainer}>
        <h1 style={styles.title}>Page Not Found</h1>
        <p style={styles.message}>
          Oops! The page you are looking for does not exist.
        </p>
        <button onClick={handleRedirect} style={styles.button}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  imageContainer: {
    flex: 1,
    textAlign: 'center',
  },
  image: {
    maxWidth: '80%',
    borderRadius:'50%',
    height: 'auto',
  },
  messageContainer: {
    flex: 1,
    padding: '20px',
    textAlign: 'left',
  },
  title: {
    fontSize: '36px',
    margin: '0 0 20px',
  },
  message: {
    fontSize: '18px',
    margin: '0 0 20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#5085a5',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default PageNotFound;
