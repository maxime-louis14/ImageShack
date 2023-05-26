import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "../pages/style/photo.css"

const Photos = () => {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      console.log('coucouuu', acceptedFiles)
    }
  });

  const thumbs = files.map((file) => (
    <div  key={file.name}>
      <div >
        <img
          src={file.preview}
          
        />
      </div>
    </div>
  ));

  
  const [imageSent, setImageSent] = useState([]);
  const handleFile = (e) => {
    console.log('coucou')
    setImageSent(e.target.files[0]);
  };
  const uploadFiles = () => {
    const formData = new FormData();
    console.log(files[0]);
    formData.append('image', files[0]);
    const token = localStorage.getItem("token");
      const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    };
    fetch("http://localhost:3000/images", requestOptions)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="Photo">
      
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps({onChange: handleFile})}  name="image" />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside >
        {thumbs}
      </aside>
      
     
      <button className="upload-btn" onClick={() => uploadFiles()}>Upload Images</button>
    </div>
  );
};

export default Photos;