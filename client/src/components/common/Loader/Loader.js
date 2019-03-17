import React from 'react';
import ReactDOM from 'react-dom';
import './Loader.css';
import { ScaleLoader } from 'react-spinners';

export default () =>
  ReactDOM.createPortal(
    <div className="loader">
      <ScaleLoader color="#ffffff" height={60} width={10} />
    </div>,
    document.getElementById('loader')
  );
