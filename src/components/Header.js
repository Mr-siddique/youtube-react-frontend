import { TextField, IconButton, Button, Avatar } from "@mui/material";
import mainLogo from "../YouTube.svg";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  return (
    <header style={headerStyle}>
      <img src={mainLogo} style={imageStyle} onClick={() => navigate("/")} />
      <TextField
        type="search"
        name="searchInput"
        autoFocus
        style={inputStyles}
        placeholder="Search..."
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      {user.name ? (
        <>
          <Button href="http://localhost:5000/api/logout">Log out</Button>
          <Button onClick={() => navigate("/addvideo")} varient="contained">
            Add Video
          </Button>
          <div style={{ display: "flex", alignItems: "center", color: "gray" }}>
            <Avatar src={user.avatar} />
            <small>{user.name?.split(" ")[0]}</small>
          </div>
        </>
      ) : (
        <Button variant="outlined" href="http://localhost:5000/auth/google">
          <AccountCircleIcon />
          SIGN IN
        </Button>
      )}
    </header>
  );
};

export default Header;

const headerStyle = {
  width: "100%",
  cursor: "pointer",
  display: "flex",
  flexWrap: "wrap",
  aligItems: "center",
  justifyContent: "space-between",
  padding: "5px",
};

const imageStyle = {
  width: "150px",
  height: "50px",
};

const inputStyles = {
  width: "40%",
};
