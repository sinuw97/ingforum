import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <div className="loading">
      <LoadingBar style={{
        backgroundColor: '#1a329c'
      }}/>
    </div>
  );
}

export default Loading;