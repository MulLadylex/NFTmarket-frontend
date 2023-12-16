import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function UploadImage({ address }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleCancel = () => {
        setTitle("");
        setDescription("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const handleUpload = async (event) => {
        event.preventDefault();

        if (fileInputRef.current.files.length === 0) {
            alert("Please select a file!");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', fileInputRef.current.files[0]);
        formData.append('address', address);

        try {
            const res = await axios.post("http://localhost:3000/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });


            console.log('File uploaded successfully', res.data);
            navigate("/uploadSuccess");
        } catch (err) {
            console.log('Error occured: ',err);
        }
    }

    return (
        <div className="upload-container">
            <h1>Upload Image to IPFS and Mint NFT</h1>
            <form className="upload-form" onSubmit={handleUpload}>
                <label htmlFor="title">Title *</label>
                <input
                    id="title"
                    type="text"
                    placeholder="Enter image title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                    />

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    placeholder="Enter image description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    />

                <label htmlFor="file">Choose File *</label>
                <input
                    id="file"
                    type="file"
                    ref={fileInputRef}
                    required
                    />

                <div className="button">
                    <button type="button" className="cancle-button" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="upload-button">Upload</button>
                </div>
            </form>
        </div>
    );
}

export default UploadImage;