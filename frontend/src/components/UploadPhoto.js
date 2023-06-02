import React, { useState } from "react";

const UploadPhoto = () => {

    const [selectedImage, setSelectedImage] = useState(null);

    const handler = (event) => {
        console.log(event.target.files[0]);
        setSelectedImage(event.target.files[0]);
    }

    const handlerNull = (event) => {
        console.log("null ");
        setSelectedImage(null);
        document.getElementById("myImage").value = "";
    }

    return (
        <div>
            <h4>Display Photo</h4>
            {selectedImage && (
                <div>
                    <img
                        className='profile-box'
                        alt="not found"
                        src={URL.createObjectURL(selectedImage)}
                    />
                    <br />
                    <button className="btn-green mt10" onClick={handlerNull}>Remove</button>
                </div>
            )}
            <input type="file" id="myImage"  className="mt20 btn-green" name="myImage" onChange={handler} accept="image/*" />
        </div>
    );
};

export default UploadPhoto;