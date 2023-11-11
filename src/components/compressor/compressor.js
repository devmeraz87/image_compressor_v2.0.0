// Modules
import { useState } from "react";
import imageCompression from "browser-image-compression";

// Default_loading_profile_
import profile from "../img/profile.jpg"


//>> Constructor Function_
const Compressor_ = () => {

    const [file, setFile] = useState(null);
    const [size, setSize] = useState(null);
    const [maxMb, setMaxMb] = useState(1);
    const [mbChange, setMbChange] = useState(null);
    const [fullImageSrc, setFullImageSrc] = useState(null);
    const [maxWidthandHeight, setMaxWidthAndHeight] = useState(1920);
    const [ImageAndDownloadLink, setImageAndDownloadLink] = useState(null);
    const [widthAndHeightChange, setWidthAndHeightChange] = useState(null);
const [fileName, setFileName] = useState("compressed__img__mt.jpg)
    // File Mb value change_
    const handleMb = (e) => {
        const value = e.target.value;
        setMaxMb(value);
        setMbChange(value);
    }

    // Width and height value change_
    const handleWidthHeight = (e) => {
        const value = e.target.value;
        setMaxWidthAndHeight(value);
        setWidthAndHeightChange(value);
    }

    // Compress by file change_
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

    // Compress file by_ clicking_ apply_ btn
    const handleSubmit = async(e) => {
        e.preventDefault();
        setImageAndDownloadLink(null);

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
setFileName(file.name)
                setSize((compressFile.size / 1024).toFixed(2) + " kbs")
    
            } catch(err) {
                alert(err.message);
            }
        }

    }


    const handle_full_image = (e) => {
        const item_img_src = e.target.getAttribute("src");
        setFullImageSrc(item_img_src);
    }


    // Reset form_
    const handleFromReset = () => {
        const form = document.querySelector("#form");
        form.reset();
        setFile(null);
        setMbChange(null);
        setImageAndDownloadLink(null);
        setWidthAndHeightChange(null);
        setMaxWidthAndHeight(1920)
    }

    return (
        <>
            <div className="card">
                <div className="card_content">
                    <div className="card_heading">Image Compressor <span>v2.0.0</span></div>
                    <form onSubmit={handleSubmit} id="form">
                        <div className="_form_group">
                            <input className="_file" onChange={handleFileChange} type="file" accept="image/*" />
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
                    {file && (
                        <div className="_image_blob">
                            <div className="_blob_container">
                                {ImageAndDownloadLink ? (
                                <>
                                    <img src={ImageAndDownloadLink} onClick={handle_full_image} alt="Compressed Image_" title="Compressed Image_" className="compressed_image" />
                                </>
                                ) : (
                                <>
                                    <div className="_loading_div">
                                        <img src={profile} alt="Loading..." />
                                    </div>
                                </>
                                )}
                                {ImageAndDownloadLink && (
                                    <span className="_size" >{size}</span>
                                )}
                            </div>
                        </div>  
                    )}
                    {ImageAndDownloadLink && (
                        <div style={{display: "flex", alignItems: "center"}}>
                            <div className="_download_btn">
                                <a className="download_btn_" href={ImageAndDownloadLink} download={fileName}>Download</a>
                            </div>
                            <div className="_reset_btn">
                                <button className="_reset_btn_" onClick={handleFromReset}>Reset</button>
                            </div>                        
                        </div>
                    )}
                </div>
            </div>
            {fullImageSrc && (
                <>
                    <div className="_full_img">
                        <div className="_full_image_container">
                            <img src={fullImageSrc} alt="" />
                        </div>
                        <div className="_full_img_close_btn" onClick={() => {setFullImageSrc(null)}} title="Close">
                            <div className="_close_btn_icon"></div>
                        </div>
                    </div>
                </>
            )}
            <div className="card _meraz">
                <div className="_dev_by">
                    <div className="_profile">
                        <a target={"_blank"} rel={"noreferrer"} href="https://web.facebook.com/profile.php?id=100043143293016">
                            <div className="My_img">
                                <img src={profile} alt="Mevlan Meraj" />
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