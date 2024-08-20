import React from 'react';


const RotatingImage = ({ src, alt }) => {
    return (
        <div>
            <div className="rotating-image-left-container">
                <img src="img/looper.png" className="rotating-image" alt="" />
            </div>
            <div className="rotating-image-right-container">
                <img src="img/looper.png" className="rotating-image" alt="" />
            </div>
        </div>
    );
};

export default RotatingImage;