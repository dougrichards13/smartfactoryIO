import React from 'react';

const Thumbnail = ({imgSrc,classes}) => {
    return (

        <figure className={classes}>
            <img src={imgSrc} alt="Smart Factory"/>
        </figure>
    );
};

export default Thumbnail;