const Folder: React.FC = () => {
    return (
        <div className="conatiner row">
            <div className="col-4">
                <img src="https://mern-memory.s3.ap-south-1.amazonaws.com/hackathon1.png" alt="pic" width="300px" height="300px" />
            </div>
            <div className="col-4">
                <img src="https://mern-memory.s3.ap-south-1.amazonaws.com/Edu-teck.jpg" alt="pic" width="300px" height="300px" />
            </div>
            <div className="col-4">
                <img src="https://mern-memory.s3.ap-south-1.amazonaws.com/Screenshot+(3).png" alt="pic" width="300px" height="300px" />
            </div>
            <div className="col-4">
                <video controls width="300">
                    <source src="https://mern-memory.s3.ap-south-1.amazonaws.com/Pexels+Videos+1448735.mp4" />
                </video>
            </div>
        </div>
    )
}

export default Folder
