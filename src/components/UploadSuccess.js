import { Link } from "react-router-dom";
import "../styles/UploadSuccess.css";

function UploadSuccess() {
    return (
        <div className="success-message">
            <h1>Upload Success!</h1>
            <p>Check out your NFT on the Own Page.</p>
            <Link to="/owned-nfts">Go to Own Page</Link>
        </div>
    );
}

export default UploadSuccess;