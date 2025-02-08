"use client"; // Ensure this is a client component for MUI usage

import { SyntheticEvent, useState } from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { clearToken } from "../../store/reducers";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);

  const { token } = useSelector((state: RootState) => state.user);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push("/");
        break;
      case 1:
        router.push("/login");
        break;
      case 2:
        router.push("/register");
        break;
      case 3:
        dispatch(clearToken());
        router.push("/login");
        break;
      default:
        break;
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          eBuddy
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
        >
          {token && <Tab value={0} tabIndex={0} label="Data" />}
          {!token && <Tab value={1} tabIndex={1} label="Login" />}
          {!token && <Tab value={2} tabIndex={2} label="Register" />}
          {token && <Tab value={3} tabIndex={3} label="Logout" />}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
