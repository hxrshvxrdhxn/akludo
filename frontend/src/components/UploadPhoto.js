import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";

const UploadPhoto = ({ blog, picture }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handler = (event) => {
        const blob = URL.createObjectURL(event.target.files[0]);
        console.log("URL.createObjectURL(event.target.files[0])-->", blob)
        console.log("event.target.files[0]-->", event.target.files[0])
        setSelectedImage(blob);
        blog(blob);

    }

    const removePhoto = () => {
        setSelectedImage(null);
        document.getElementById("myImage").value = "";
    }
    console.log("picture========================>>>>>>>>", picture)


    useEffect(() => {

    })

    return (
        <div >
            <h4>Display Photo</h4>
        

            {selectedImage && (
                <div>
                    <img
                        className='profile-box'
                        alt="not found"
                        src={selectedImage}
                    />
                    <br />
                    <button className="btn-green mt10" onClick={removePhoto}>Remove</button>
                </div>
            )}
            <input type="file" id="myImage" className="mt20 btn-green" name="myImage" onChange={handler} accept="image/*" />
        </div>
    );
};

export default UploadPhoto;