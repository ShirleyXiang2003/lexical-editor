// src/components/Upload.js
import React, { useState } from 'react';
import { uploadFile, getStatus, startProcessing } from '../../api';
import './Upload.css'; // 引入样式文件

const Upload = () => {
    const [file, setFile] = useState(null);
    const [contextId, setContextId] = useState('');
    const [status, setStatus] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (file) {
            const response = await uploadFile(file);
            setContextId(response.context_id);
            setStatus(`File uploaded. Context ID: ${response.context_id}`);
        }
    };

    const handleCheckStatus = async () => {
        if (contextId) {
            const response = await getStatus(contextId);
            setStatus(`Processing status: ${response.message}`);
        }
    };

    const handleStartProcessing = async () => {
        if (contextId) {
            const response = await startProcessing(contextId);
            setStatus(`Processing started: ${response.message}`);
        }
    };

    return (
        <div className="upload-container"> {/* 使用样式类名来设置样式 */}
            <h2>Upload File</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <button onClick={handleStartProcessing}>Start Processing</button>
            <button onClick={handleCheckStatus}>Check Status</button>
            <p>{status}</p>
        </div>
    );
};

export default Upload;
