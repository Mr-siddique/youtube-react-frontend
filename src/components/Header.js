import {
  TextField,
  IconButton,
  FormControl,
  Button,
  Avatar,
} from "@mui/material";
import mainLogo from "../YouTube-Logo.wine.svg";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <header style={headerStyle}>
        <img src={mainLogo} style={imageStyle}/>
      <TextField
        type="search"
        name="searchInput"
        autoFocus
        style={inputStyles}
        placeholder="Search..."
        InputProps={{
          endAdornment: (
            <IconButton>
              {user.avatar ? (
                <Avatar alt="profile" src={user.avatar} />
              ) : (
                <SearchIcon />
              )}
            </IconButton>
          ),
        }}
      />

      <Button variant="outlined" href="http://localhost:5000/auth/google">
        <AccountCircleIcon />
        SIGN IN
      </Button>
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
