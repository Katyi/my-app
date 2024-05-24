import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@apollo/client";
import { SEND_FEEDBACK_TO_API } from "../../apollo/feedback";

const color = "#d0c7b6";
function FeedbackDialog({ open, handleClose }) {
  const initialValues = { personName: "", contact: "", message: "" };
  const [sendToApi, { called, loading, data, reset }] =
    useMutation(SEND_FEEDBACK_TO_API);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  function onClose() {
    reset();
    handleClose();
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      maxWidth="lg"
      sx={{}}
      PaperProps={{
        sx: {
          bgcolor: color,
          display: "flex",
          justifyContent: "center",
          zIndex: 10000,
        },
      }}
    >
      <IconButton
        onClick={onClose}
        disableRipple
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          borderRadius: 0,
          "&:hover": {
            color: "red",
          },
        }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          const { personName, contact, message } = values;
          if (message.length > 0) {
            sendToApi({
              variables: {
                input: {
                  name: personName || "",
                  contacts: contact || "",
                  comment: message,
                },
              },
            });
          } else {
            alert("Поле сообщения пустое! Заполните и повторите попытку!");
          }
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <DialogTitle>
              <Typography variant="person_label">Обратная связь</Typography>
            </DialogTitle>
            {!data && loading && (
              <DialogContent>
                <DialogContentText>
                  Отправляем данные... <CircularProgress />
                </DialogContentText>
              </DialogContent>
            )}
            {!data && !loading && (
              <>
                <DialogContent>
                  <DialogContentText py={2}>
                    Заполните поля контактной информации, чтобы получить ответ
                  </DialogContentText>
                  <Box
                    sx={{
                      bgcolor: "whitesmoke",
                      px: 2,
                    }}
                  >
                    <TextField
                      autoComplete={false}
                      autoFocus
                      margin="dense"
                      id="personName"
                      label="Имя"
                      fullWidth
                      variant="standard"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      type="text"
                      value={props.values.personName}
                      name="personName"
                    />

                    {props.errors.personName && (
                      <div id="feedback">{props.errors.personName}</div>
                    )}
                  </Box>
                  <Box
                    sx={{
                      my: 2,
                      bgcolor: "whitesmoke",
                      px: 2,
                    }}
                  >
                    <TextField
                      autoComplete={false}
                      autoFocus
                      margin="dense"
                      id="contact"
                      label="Контактная информация"
                      fullWidth
                      variant="standard"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      type="text"
                      value={props.values.contact}
                      name="contact"
                    />
                    {props.errors.contact && (
                      <div id="feedback">{props.errors.contact}</div>
                    )}
                  </Box>
                  <TextField
                    autoComplete={false}
                    autoFocus
                    margin="dense"
                    id="message"
                    label={null}
                    fullWidth
                    required
                    multiline
                    rows={6}
                    placeholder={'Введите ваше сообщение*'}
                    variant="outlined"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    type="message"
                    value={props.values.message}
                    name="message"
                    sx={{
                      bgcolor: "whitesmoke",
                    }}
                  />
                  {props.errors.message && (
                    <div id="feedback">{props.errors.message}</div>
                  )}
                  <DialogActions>
                    <Stack
                      direction="row"
                      width={"100%"}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Button
                        onClick={() => props.handleReset(initialValues)}
                        type="reset"
                        variant="text"
                        sx={{
                          "&:hover": {
                            bgcolor: "rgba(255,255,255,0)",
                            color: "white",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        очистить
                      </Button>
                      <Button type="submit" variant="contained">
                        Отправить
                      </Button>
                    </Stack>
                  </DialogActions>
                </DialogContent>
              </>
            )}
            {data && !loading && (
              <>
                <DialogContent>
                  <DialogContentText>
                    Сообщение отправлено успешно!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={onClose} type="reset" variant="contained">
                    Закрыть
                  </Button>
                </DialogActions>
              </>
            )}
          </form>
        )}
      </Formik>
    </Dialog>
  );
}

export default FeedbackDialog;
