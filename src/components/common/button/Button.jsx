import { styled } from "../../../styles/globalStyles";

const Button = styled("button", {
  backgroundColor: "$button",
  color: "$font",
  padding: "$medium",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s ease",

  "&:hover": {
    backgroundColor: "$buttonHover",
  },
});

export default Button;
