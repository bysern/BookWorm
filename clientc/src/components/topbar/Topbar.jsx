import "./topbar.css"
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import SearchArea from '../books/SearchArea';



export default function Topbar(props) {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">SocialApp
                    </span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchBar">

                    <SearchArea />
                    {/* <form onSubmit={props.searchBook} action="">
                        <input onChange={props.handleSearch} type="text" placeholder="look for a book" />
                        <button type="submit">Search</button>
                        <select defaultValue="Sort" onChange={props.handleSort}>
                            <option disabled value="Sort">Sort</option>
                            <option value="Newest">Newest</option>
                            <option value="Oldest">Oldest</option>

                        </select>
                    </form> */}

                    {/* <Search className="searchIcon" />
                    <input type="text" placeholder="Search for friend, post or video"
                        className="searchInput" /> */}
                </div>
            </div>
            <div className="topbarRight">
                <span className="topbarLink">Homepage</span>
                <span className="topbarLink">TimeLine</span>
                <div className="topbarLinks">

                    <div className="topbarIcons">
                        <div className="topbarIconItem">
                            <Person />
                            <span className="topbarIconBadge">1</span>
                        </div>
                        <div className="topbarIconItem">
                            <Chat />
                            <span className="topbarIconBadge">2</span>
                        </div>
                        <div className="topbarIconItem">
                            <Notifications />
                            <span className="topbarIconBadge">1</span>
                        </div>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.jpg"} alt="" className="topbarProfilePicture" />
                </Link>
            </div>

        </div >
    )
}