import { FC } from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { setTheme } from "../../../../redux/slices/themeReducer";
import { Theme } from "../../../../theme/theme";
import useWindowSize from "../../../../hooks/useWindowSize";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 98,
  height: 55,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 7,
    padding: 0,
    transform: "translateX(0px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(45px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="24" viewBox="0 0 25 24"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.3999 2C8.3499 2 7.3499 2.16 6.3999 2.46C10.4599 3.73 13.3999 7.52 13.3999 12C13.3999 16.48 10.4599 20.27 6.3999 21.54C7.3499 21.84 8.3499 22 9.3999 22C14.9199 22 19.3999 17.52 19.3999 12C19.3999 6.48 14.9199 2 9.3999 2Z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "white" : "#1F1F1F;",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#FF6720",
    width: 40,
    height: 40,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 25 24"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M7.1599 4.84005L5.3599 3.05005L3.9499 4.46005L5.7399 6.25005L7.1599 4.84005ZM4.3999 10.5H1.3999V12.5H4.3999V10.5ZM13.3999 0.550049H11.3999V3.50005H13.3999V0.550049ZM20.8499 4.46005L19.4399 3.05005L17.6499 4.84005L19.0599 6.25005L20.8499 4.46005ZM17.6399 18.16L19.4299 19.96L20.8399 18.55L19.0399 16.76L17.6399 18.16ZM20.3999 10.5V12.5H23.3999V10.5H20.3999ZM12.3999 5.50005C9.0899 5.50005 6.3999 8.19005 6.3999 11.5C6.3999 14.81 9.0899 17.5 12.3999 17.5C15.7099 17.5 18.3999 14.81 18.3999 11.5C18.3999 8.19005 15.7099 5.50005 12.3999 5.50005ZM11.3999 22.4501H13.3999V19.5H11.3999V22.4501ZM3.9499 18.5401L5.3599 19.9501L7.1499 18.15L5.7399 16.74L3.9499 18.5401Z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "white",
    borderRadius: "36px",
    border: "1px solid #FF6720",
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="25" viewBox="0 0 24 25"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M7.1599 4.84005L5.3599 3.05005L3.9499 4.46005L5.7399 6.25005L7.1599 4.84005ZM4.3999 10.5H1.3999V12.5H4.3999V10.5ZM13.3999 0.550049H11.3999V3.50005H13.3999V0.550049ZM20.8499 4.46005L19.4399 3.05005L17.6499 4.84005L19.0599 6.25005L20.8499 4.46005ZM17.6399 18.16L19.4299 19.96L20.8399 18.55L19.0399 16.76L17.6399 18.16ZM20.3999 10.5V12.5H23.3999V10.5H20.3999ZM12.3999 5.50005C9.0899 5.50005 6.3999 8.19005 6.3999 11.5C6.3999 14.81 9.0899 17.5 12.3999 17.5C15.7099 17.5 18.3999 14.81 18.3999 11.5C18.3999 8.19005 15.7099 5.50005 12.3999 5.50005ZM11.3999 22.4501H13.3999V19.5H11.3999V22.4501ZM3.9499 18.5401L5.3599 19.9501L7.1499 18.15L5.7399 16.74L3.9499 18.5401Z"/></svg>')`,
      left: 15,
      width: "24px",
      height: "24px",
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="24" viewBox="0 0 25 24"><path fill="${encodeURIComponent(
        "#FF6720"
      )}" d="M9.3999 2C8.3499 2 7.3499 2.16 6.3999 2.46C10.4599 3.73 13.3999 7.52 13.3999 12C13.3999 16.48 10.4599 20.27 6.3999 21.54C7.3499 21.84 8.3499 22 9.3999 22C14.9199 22 19.3999 17.52 19.3999 12C19.3999 6.48 14.9199 2 9.3999 2Z"/></svg>')`,
      right: 15,
      width: "24px",
      height: "24px",
    },
  },
}));

const MobileSwitch = styled(Switch)(({ theme }) => ({
  width: 59,
  height: 24,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 24,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(35px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 0,
    "&.Mui-checked": {
      transform: "translateX(34px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "white" : "#1F1F1F",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#FF6720",
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 24,
    height: 24,
    borderRadius: 36,
  },
  "& .MuiSwitch-track": {
    border: "1px solid #FF6720",
    borderRadius: "36px",
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#1F1F1F" : "#ffffff;",
    boxSizing: "border-box",
  },
}));

const SwitchLabel: FC = () => {
  const { isDark } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const { isMobile } = useWindowSize();

  const handleChange = () => {
    if (isDark) {
      dispatch(setTheme(Theme.WHITE));
      localStorage.setItem("theme", Theme.WHITE);
    } else {
      dispatch(setTheme(Theme.DARK));
      localStorage.setItem("theme", Theme.DARK);
    }
  };

  return isMobile ? (
    <MobileSwitch sx={{ m: 1 }} checked={isDark} onChange={handleChange} />
  ) : (
    <CustomSwitch
      sx={{ m: 1 }}
      checked={isDark}
      onChange={handleChange}
      onKeyDown={handleChange}
    />
  );
};

export default SwitchLabel;
