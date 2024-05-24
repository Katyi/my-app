import { Alert, IconButton, Snackbar, Stack } from "@mui/material";
import React, { useState } from "react";
import LinkIcon from "@mui/icons-material/Link";
import MoreIcon from "./MoreIcon"

function IconsBlock({ fullView, setFullView, postId, pageView = false }) {
  const [open, setOpen] = useState(false);
  const handleShare = async () => {
    navigator.clipboard
      .writeText(window.location.href + "/" + postId)
      .then(() => {
        setOpen(true);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Stack direction={"row"} display={'flex'} alignItems={'center'} gap={2}>
        {!pageView && (
          <MoreIcon fullView={fullView} setFullView={setFullView}/>
        )}

        <IconButton
          disableFocusRipple
          sx={{
            borderRadius: 0,
            p: 0,
          }}
          onClick={handleShare}
        >
          <LinkIcon />
        </IconButton>
      </Stack>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Ссылка на запись скопирована в буфер обмена
        </Alert>
      </Snackbar>
    </>
  );
}

export default IconsBlock;
