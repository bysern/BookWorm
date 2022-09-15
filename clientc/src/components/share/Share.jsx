import './share.css';
import { PermMedia, Label, Room, EmojiEmotions } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useRef } from 'react';
import axios from 'axios';

export default function Share() {

    const { user } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: desc.current.value
        };

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("file", file);
            data.append("name", fileName);
            newPost.img = fileName;
            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err);
            }
        }

        try {
            await axios.post("/posts/", newPost);
            window.location.reload();

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.jpg"} alt="" />
                    <input placeholder={"What's in your mind " + user.username + "?"} className="shareInput"
                        ref={desc} />
                </div>
                <hr className="shareHr" />
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input style={{ display: "none" }} type="file" id="file" accept=".png,.jpg,.jpeg" onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Locations</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="orange" className="shareIcon" />
                            <span className="shareOptionText">Emoticons</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>

                </form>
            </div>
        </div>
    )
}
