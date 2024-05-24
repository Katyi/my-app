import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function MoreIcon({fullView, setFullView}) {
    return (
      <IconButton
        disableFocusRipple
        component={'span'}
        sx={{
          borderRadius: 0,
          p: 0,
          width:'auto',
            display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          "& > svg":{
              position:'relative',
              top:2,
            transform: fullView ? "rotate(180deg)" : "",
          }
        }}
        onClick={() => setFullView(!fullView)}
      >
        <ExpandMoreIcon />
        {fullView ? "свернуть" : "читать полностью"}
      </IconButton>
    );
  }
  export default MoreIcon