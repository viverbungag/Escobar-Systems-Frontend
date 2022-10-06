import React, { useState } from 'react';
import styles from './InputFile.module.scss';
import Files from 'react-files';

const InputFile = ({fileNameAdd, handleImageFileAddOnChange}) => {

  return (
    <div className={styles["input-file"]}>
        {/* <Files
          onChange={handleImageFileAddOnChange}
          onError={()=>{}}
          accepts={['image/png', 'image/jpg', 'image/jpeg']}
          multiple={false}
          minFileSize={0}
          clickable
        >
          <span>{fileNameAdd}</span> 
        </Files> */}
        <input type="file" onChange={handleImageFileAddOnChange} />
    </div>
  )
}

export default InputFile