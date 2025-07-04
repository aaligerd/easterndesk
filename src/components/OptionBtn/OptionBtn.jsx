import React, { useEffect, useRef, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import './OptionBtnstyle.css';

function OptionBtn({ category, subcategory, seourl, masterRef, index }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const dropdownRef = useRef(null);

  const showDropdown = () => {
    const currentDiv = masterRef.current[index];
    if (currentDiv) {
      currentDiv.classList.add('dropdown-visible');
    }
    document.addEventListener('mousedown', handleClickOutside);
  };

  const hideDropdown = () => {
    const currentDiv = masterRef.current[index];
    if (currentDiv) {
      currentDiv.classList.remove('dropdown-visible');
    }
    document.removeEventListener('mousedown', handleClickOutside);
  };

  const handleClickOutside = (event) => {
    const currentDiv = masterRef.current[index];
    if (currentDiv && !currentDiv.contains(event.target)) {
      hideDropdown();
    }
  };

  const handleCopyLink = () => {
    const url = `${process.env.REACT_APP_CONSUMER_STORY_URL}/${category}/${subcategory}/${seourl}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        setMessage('Link copied to clipboard!');
        setOpenSnackbar(true);
        hideDropdown();
      })
      .catch(() => {
        setMessage('Failed to copy link.');
        setOpenSnackbar(true);
        hideDropdown();
      });
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason !== 'clickaway') {
      setOpenSnackbar(false);
    }
  };

  return (
    <div className="action-container">
      <div className="action-btn" onClick={showDropdown}>
        <div className="circle-dot"></div>
        <div className="circle-dot"></div>
        <div className="circle-dot"></div>
      </div>

      <div
        className="dropdown-content"
        ref={(el) => {
          masterRef.current[index] = el;
          dropdownRef.current = el;
        }}
      >
        <div onClick={handleCopyLink}>Copy link</div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={message}
      />
    </div>
  );
}

export default OptionBtn;
