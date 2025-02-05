import { Avatar } from "@mui/material";

const getColorByLetter = (letter) => {
  const colors = {
    A: "#f44336",
    B: "#e91e63",
    C: "#9c27b0",
    D: "#673ab7",
    E: "#3f51b5",
    F: "#2196f3",
    G: "#03a9f4",
    H: "#00bcd4",
    I: "#009688",
    J: "#4caf50",
    K: "#8bc34a",
    L: "#cddc39",
    M: "#ffeb3b",
    N: "#ffc107",
    O: "#ff9800",
    P: "#ff5722",
    Q: "#795548",
    R: "#607d8b",
    S: "#9e9e9e",
    T: "#000000",
    U: "#00bcd4",
    V: "#3f51b5",
    W: "#2196f3",
    X: "#9c27b0",
    Y: "#ff5722",
    Z: "#e91e63",
    default: "#607d8b",
  };

  return colors[letter] || colors.default;
};

const DynamicAvatar = ({ text, ...props }) => {
  let displayLetter = text;

  if (typeof text === "object") {
    if (text.name) {
      displayLetter = text.name.charAt(0).toUpperCase();
    } else {
      displayLetter = "?";
    }
  }

  const backgroundColor = getColorByLetter(displayLetter);

  return (
    <>
      {text.image ? (
        <Avatar src={text.image} sx={stylesProfile.avatar} />
      ) : (
        <Avatar sx={{ ...styles.avatar, backgroundColor }} {...props}>
          {displayLetter}
        </Avatar>
      )}
    </>
  );
};

// Styles for the Avatar
const styles = {
  avatar: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    fontSize: "1rem",
  },
};

const stylesProfile = {
  avatar: {
    width: 150,
    height: 150,
    borderRadius: "10%",
    fontSize: "1rem",
  },
};

export default DynamicAvatar;
