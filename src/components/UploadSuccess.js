import { Link } from "react-router-dom";
import "../App.css";

function UploadSuccess() {
    return (
        <div className="success-message">
            <h1>Upload Success!</h1>
            <p>Check out your NFT on the homePage.</p>
            <Link to="/">Go to HomePage</Link>
        </div>
    );
}

export default UploadSuccess;