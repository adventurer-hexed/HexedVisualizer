import React from 'react';

const NoResult = ({ userInput }) => (
  <div className="no_result">
    <h1>There are no reslts for</h1>
    <h1>{userInput}</h1>
  </div>
);
export default NoResult;
