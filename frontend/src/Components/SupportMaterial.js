import React, { useState, useContext, useEffect } from 'react';

function SupportMaterial() {
  useEffect(() => {
    console.log("in the wrong place");
}, []);
  return (
    <div>
      <h2>Support Material</h2>
      {/* Add your support material content here */}
    </div>
  )
}

export default SupportMaterial;