import imageCompression from "browser-image-compression";
import { useState } from "react";

import profile from "../img/profile.jpg"

const Compressor_ = () => {

    const [file, setFile] = useState(null);
    const [size, setSize] = useState(null);
    const [maxMb, setMaxMb] = useState(1);
    const [mbChange, setMbChange] = useState(null);
    const [maxWidthandHeight, setMaxWidthAndHeight] = useState(1920);
    const [ImageAndDownloadLink, setImageAndDownloadLink] = useState(null);
    const [widthAndHeightChange, setWidthAndHeightChange] = useState(null);

    const handleMb = (e) => {
        const value = e.target.value;
        setMaxMb(value);
        setMbChange(value);
    }

    const handleWidthHeight = (e) => {
        const value = e.target.value;
        setMaxWidthAndHeight(value);
        setWidthAndHeightChange(value);
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setFile(file)

        const options = {
            maxSizeMB: maxMb,
            maxWidthOrHeight: maxWidthandHeight,
            useWebWorker: true
        }


        if(file) {
            try {
                const compressFile = await imageCompression(file, options);
                const blob = URL.createObjectURL(compressFile);
                setImageAndDownloadLink(blob)
                setSize((compressFile.size / 1024).toFixed(2) + " kbs")
    
            } catch(err) {
                alert(err.message);
            }
    
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const options = {
            maxSizeMB: maxMb,
            maxWidthOrHeight: maxWidthandHeight,
            useWebWorker: true
        }

        if(file) {
            try {
                const compressFile = await imageCompression(file, options);
                const blob = URL.createObjectURL(compressFile);
    
                console.log(blob);
                setImageAndDownloadLink(blob)
                setSize((compressFile.size / 1024).toFixed(2) + " kbs")
    
            } catch(err) {
                alert(err.message);
            }
        }

    }

    return (
        <>
            <div className="card">
                <div className="card_content">
                    <div className="card_heading">Image Compressor <span>v2.0.0</span></div>
                    <form onSubmit={handleSubmit} id="form">
                        <div className="_form_group">
                            <input onChange={handleFileChange} type="file" />
                        </div>
                        {file && (
                            <div className="_form_group">
                                <label className="label" htmlFor="">Max MB</label>
                                <input name="mb" onChange={handleMb} placeholder="Max Mb" defaultValue={1} className="form_control" type={"text"} />
                            </div>
                        )}
                        {file && (
                            <div className="_form_group">
                                <label className="label" htmlFor="">Max width & height</label>
                                <input name="widthheight" onChange={handleWidthHeight} placeholder="Max width & height" defaultValue={1920}  className="form_control" type={"text"} />
                            </div>
                        )}
                        {(mbChange || widthAndHeightChange) && (
                            <div className="_form_group">
                                <button className="apply_btn" type="submit">Apply</button>
                            </div>
                        )}
                    </form>   
                    {ImageAndDownloadLink && (
                        <div className="_image_blob">
                            <div className="_blob_container">
                                <img src={ImageAndDownloadLink} alt="" />
                                {size && (
                                    <span className="_size" >{size}</span>
                                )}
                            </div>
                        </div>  
                    )}
                    {ImageAndDownloadLink && (
                        <div className="_download_btn">
                            <a className="download_btn_" href={ImageAndDownloadLink} download>Download</a>
                        </div>
                    )}
                </div>
            </div>
            <div className="card _meraz">
                <div className="_dev_by">
                    <div className="_profile">
                        <a href="https://web.facebook.com/profile.php?id=100043143293016">
                            <div className="My_img">
                                <img src={profile} alt="" />
                            </div>                            
                            <div className="_name_and_date">
                                <div className="_devlop">Devloped by</div>
                                <div className="_name">Meraz Meraz</div>
                                <div className="_date">Jun 16 2018</div>
                            </div>
                        </a>                        
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Compressor_;