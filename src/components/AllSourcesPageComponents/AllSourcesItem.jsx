import { Box, Divider, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function AllSourcesItem({ node }) {
  const navigate = useNavigate();

  return (
    <Box
      id={node.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "10px",
        p: 2,
        mb: 1,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        {node?.author && (
          <Typography variant="caption" color={"grey"}>
            автор
          </Typography>
        )}
        <Typography
          variant="simple_result_text"
          color={"grey"}
          sx={{
            fontWeight: 700,
            fontSize: "16px",
            color: "black",
          }}
        >
          {node?.author ? `${node.author}` : " "}
        </Typography>
        <Typography
          variant="caption"
          color={"grey"}
          sx={{
            "& > span": {
              fontSize: "16px",
              color: "black",
              fontWeight: 700,
            },
          }}
        >
          создан{" "}
          <span>
            {node?.creationDateStart} - {node?.creationDateEnd}
          </span>
        </Typography>
      </Box>{" "}
      {/* */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tooltip
          title="название памятника"
          placement="top"
          componentsProps={{
            tooltip: {
              sx: {
                minHeight: "auto",
                minWidth: "auto",
                bgcolor: "white",
                display: "flex",
                justifyContent: "center",
                p: 1,
                alignItems: "center",
                border: "1px solid #e0e0e0",
                fontSize: "13px",
              },
            },
          }}
        >
          <Typography
            variant="simple_result_text"
            sx={{
              textAlign: "flex-start",
            }}
          >
            {node?.fullName} ({node?.encoding})
          </Typography>
        </Tooltip>
      </Box>
      <Tooltip
        title="связанный источник"
        placement="bottom-start"
        componentsProps={{
          tooltip: {
            sx: {
              minHeight: "auto",
              minWidth: "auto",
              bgcolor: "white",
              display: "flex",
              justifyContent: "center",
              p: 1,
              alignItems: "center",
              border: "1px solid #e0e0e0",
              fontSize: "13px",
            },
          },
        }}
      >
        <Box
          component={"ul"}
          sx={{ width: "100%", ml: 2, borderLeft: "2px solid #d0c7b6" }}
        >
          {node.copyOfOriginal.map((item, index) => {
            const fullCitation = item.publication.reduce((a, el, i) => {
              if (el && Object(el).hasOwnProperty("fullCitation"))
                return (a = el.fullCitation);
              else return a;
            }, "");
            return (
              <Typography
                component={"li"}
                key={item.id + index}
                variant="simple_result_text"
                sx={{
                  textDecoration: "none",
                  textAlign: "flex-start",
                  py: 1,
                  px: 2,
                  fontSize: "16px",
                  color: "black",
                  fontWeight: 100,
                  "& > span": {
                    textDecoration: "underline",
                    fontWeight: 700,
                  },
                  ":hover": {
                    cursor: "pointer",
                    color: "#d0c7b6",
                  },
                }}
                onClick={() => navigate(`/source/${item.id}`)}
              >
                <span> {item.encoding} </span>
                {" " + fullCitation}
              </Typography>
            );
          })}
        </Box>
      </Tooltip>
      <Divider
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "#e0e0e0",
        }}
      />
    </Box>
  );
}

export default AllSourcesItem;
