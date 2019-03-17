import React from 'react';
import { Link } from 'react-router-dom';
// import { IoIosArrowBack } from "react-icons/io"
import './BackBtn.css';

const backBtn = ({ artist, song }) => (
  <Link to="/" className="back_btn">
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <span className="back_btn_text">{artist}</span>
      <span className="back_btn_text">
        <i>{song}</i>
      </span>
    </div>
  </Link>
);

export default backBtn;
