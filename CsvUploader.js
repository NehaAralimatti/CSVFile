// CsvUploader.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SignalRService from './SignalRService';

const CsvUploader = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadedData, setUploadedData] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [batchId, setBatchId] = useState(1);

  useEffect(() => {
    SignalRService.connection.on('ReceiveProgress', (receivedProgress) => {
      setProgress(parseInt(receivedProgress));
    });

    return () => {
      SignalRService.connection.off('ReceiveProgress');
    };
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('files', file);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await axios.post('http://localhost:5147/CSV/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setTimeout(() => {
        console.log('File uploaded successfully:', response.data);
        // Reset batch id and append the new entities to the existing uploaded data
        setBatchId(batchId + 1);
        setUploadedData([...uploadedData, ...response.data.map((entity) => ({ ...entity, batchId }))]);
      }, 1000);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleViewClick = (entity) => {
    setSelectedEntity(entity);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
<div>
        
        <p>Progress: {progress}%</p>
        <div style={{ width: '30%', backgroundColor: '#e0e0e0', borderRadius: '5px',alignContent:'center' }}>
          <div
            style={{
              align:'center',
              width: `${progress}%`,
              height: '20px',
              backgroundColor: '#4caf50',
              borderRadius: '5px',
            }}
          />
        </div>
      </div>
      <div>
        <h3 align="center">Statistics</h3>
        <table className='table table-bordered table-hover m-3'>
          <thead>
            <tr>
              <th>Batch Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {uploadedData.map((data, index) => (
              <tr key={index + 1}>
                <td>{data.batchId}</td>
                <td>
                  <button onClick={() => handleViewClick(data)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedEntity && (
        <div>
          <h3 align="center">View</h3>
          <table className='table table-bordered table-hover m-3'>
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Entity Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedEntity.batchId}</td>
                <td>{selectedEntity.entityName}</td>
                <td>{selectedEntity.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CsvUploader;
