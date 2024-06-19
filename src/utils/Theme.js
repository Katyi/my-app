import { createTheme } from "@mui/material";

const color="#d0c7b6"
const fontColor= "#1f1c15"
export const theme = createTheme({
    palette: {
      primary: {
        main: color,
        dark: "#1976d2",
        light: "#1976d2",
      },
    },
    typography: {
      fontFamily: [
        "'Noto Serif', serif",
        // '"Helvetica Neue"',
        // 'Arial',
        // 'sans-serif',
      ].join(","),
      nav_button: {
        fontFamily: "'Noto Serif', serif",
        lineHeight: "100%",
        fontSize: "16px",
        textTransform: "uppercase",
        fontWeight: 500,
        opacity: 1,
        letterSpacing: "0.12rem",
        minWidth: "160px",
        maxWidth: "160px",
        cursor: "pointer",
        color: fontColor,
        "&:visited": {
          color: "inherit",
        },
        "&:hover": {
          color: color,
          textDecoration:'underline'
        },
        "&.footer_nav":{
        minWidth: "280px",
        maxWidth: "280px",
        },
        "&.active_nav":{
          color:color
        }
      },
      main_title: {
        fontFamily: "'Noto Serif', serif",
        fontSize: "calc(42px + (12 + 12 * 0.7) * ((100vw - 1500px) / 1920))",
        fontWeight: "500",
        // lineHeight: "113%",
        "@media (max-width:1550px)": {
          lineHeight: "60px",
          fontSize: "calc(38px + (12 + 12 * 0.7) * ((100vw - 1500px) / 1920))",
        },
        "@media (max-height:900px)": {
          lineHeight: "40px",
          fontSize: "calc(36px + (12 + 12 * 0.7) * ((100vw - 1500px) / 1920))",
        },
        "@media (max-height:800px)": {
          lineHeight: "36px",
          fontSize: "calc(34px + (12 + 12 * 0.7) * ((100vw - 1500px) / 1920))",
        },
        "@media (max-width:768px)": {
          lineHeight: "40px",
          maxWidth: "90dvw",
          fontSize: "calc(40px + (12 + 12 * 0.7) * ((100vw - 768px) / 800))",
        },
        "&>span":{
        fontWeight: "700",
  
          fontSize:'1.6em'
        }
      },
      main_subtitle: {
        fontFamily: "'Noto Serif', serif",
        fontSize: "calc(20px + (8 + 8 * 0.7) * ((100vw - 1500px) / 1920))",
        // fontSize: "36px",
        fontWeight: "400",
        lineHeight: "150%",
        letterSpacing: "0.03em",
        "@media (max-width:1550px)": {
          maxWidth: "1000px",
          lineHeight: "30px",
          fontSize: "calc(20px + (8 + 8 * 0.7) * ((100vw - 1500px) / 1920))",
        },
        "@media (max-height:900px)": {
          lineHeight: "26px",
          fontSize: "calc(20px + (8 + 8 * 0.7) * ((100vw - 1500px) / 1920))",
        },
        "@media (max-height:800px)": {
          lineHeight: "20px",
          fontSize: "calc(20px + (8 + 8 * 0.7) * ((100vw - 1500px) / 1920))",
        },
        "@media (max-width:768px)": {
          lineHeight: "14px",
          maxWidth: "690px",
          fontSize: "calc(20px + (8 + 8 * 0.7) * ((100vw - 768px) / 800))",
        },
      },
      simple_search_caption: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: "calc(12px + (4 + 4 * 0.7) * ((100vw - 1500px) / 1920))",
        fontWeight: "300",
        lineHeight: "100%",
        letterSpacing: "0.07em",
        whiteSpace:'nowrap',
        "@media (max-width:768px)": {
          lineHeight: "14px",
          maxWidth: "690px",
          fontSize: "calc(12px + (2 + 2 * 0.7) * ((100vw - 768px) / 800))",
        },
      },
      wordusage_chip_title: {
        fontFamily: "'Noto Serif', serif",
        fontSize: "18px",
        fontWeight: "700",
        lineHeight: "120%",
        letterSpacing: "0.03em",
        "@media (max-width:768px)": {
          fontSize: "14px",
        },
      },
      wordusage_chip_title_rus: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: "14px",
        fontWeight: "300",
        lineHeight: "100%",
        letterSpacing: "0.03em",
        "@media (max-width:768px)": {
          fontSize: "12px",
        },
      },
      flora_page: {
        "&.header":{
          fontFamily: "'Noto Serif', serif",
          fontSize: "36px",
          fontWeight: "300",
          letterSpacing: "0.07em",
          lineHeight: "150%",
        },
        "&.post_title":{
          fontFamily: "'Noto Serif', serif",
          fontSize: "24px",
          fontWeight: "300",
          letterSpacing: "0.07em",
          lineHeight: "120%",
          textAlign: "right",
        },
        "&.post_content":{
          fontFamily: "'Noto Serif', serif",
          fontSize: "18px",
          fontWeight: "400",
          letterSpacing: "0.04em",
          lineHeight: "140%",
          textAlign: "right",
          // paddingBottom: "10px",
          "&>p":{
            fontFamily: "'Noto Serif', serif",
            fontSize: "18px",
            fontWeight: "400",
            letterSpacing: "0.04em",
            lineHeight: "140%",
            textAlign: "justify",
            paddingBottom: "10px",
          },
          "&>a":{
            color:'black',
            textDecoration:'underline',
          },
          "&>a:hover":{
            color:color,
            textDecoration:'none',
          }
        },
        "&.post_caption":{
          fontFamily: "'Noto Serif', serif",
          fontSize: "18px",
          fontWeight: "400",
          letterSpacing: "0.04em",
          opacity:0.5,
        },

      },
      chip_title: {
        cursor:'pointer',
        fontFamily: "'Noto Serif', serif",
        fontSize: "18px",
        fontWeight: "700",
        lineHeight: "100%",
        letterSpacing: "0.07em",
        "&:hover": {
          color: color,
        },
      },
      chip_title_rus: {
        cursor:'pointer',
        fontFamily: "'Roboto', sans-serif",
        fontSize: "16px",
        fontWeight: "300",
        lineHeight: "100%",
        letterSpacing: "0.07em",
        "&:hover": {
          color: color,
        },
      },
      button_caption: {
        fontFamily: "'Noto Serif', serif",
        textTransform: "uppercase",
        fontSize: "24px",
        fontWeight: "700",
        letterSpacing: "0.13em",
        lineHeight: "30px",
        color: "white",
      },
      source_link: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: "22px",
        fontWeight: "300",
        lineHeight: "100%",
        letterSpacing: "0.07em",
        cursor: "pointer",
        "&:hover": {
          textDecoration: "underline",
          color: color,
        },
        "@media (max-width:768px)": {
          fontSize: "14px",
        },
      },
      lexema_label_simple: {
        fontFamily: "'Noto Serif', serif",
        fontSize: "32px",
        fontWeight: "300",
        lineHeight: "34px",
        letterSpacing: "0.07em",
        "@media (max-width:768px)": {
          lineHeight: "100%",
          fontSize: "22px",
        },
      },
      simple_result_text: {
        fontFamily: "'Noto Serif', serif",
        fontSize: "24px",
        fontWeight: "400",
        lineHeight: "120%",
        "@media (max-width:768px)": {
          lineHeight: "100%",
          fontSize: "16px",
        },
      },
      usage_lexema_label:{
        fontFamily: "'Noto Serif', serif",
        fontSize: "34px",
        fontWeight: "700",
        letterSpacing: "0.07em",
        lineHeight: "100%",
      },
      usage_plant_label:{
        fontFamily: "'Noto Serif', serif",
        fontSize: "34px",
        fontWeight: "700",
        letterSpacing: "0.07em",
        lineHeight: "150%",
      },
      usage_plant_label_sub:{
        fontFamily: "'Noto Serif', serif",
        fontSize: "24px",
        fontWeight: "500",
        letterSpacing: "0.07em",
        lineHeight: "125%",
      },
      usage_caption:{
        fontFamily: "'Roboto', sans-serif",
        fontSize: "12px",
        fontWeight: "300",
        // letterSpacing: "0.07em",
        lineHeight: "100%",
      },
      // usage_caption_click: {
      //   fontFamily: "'Roboto', sans-serif",
      //   fontSize: "12px",
      //   fontWeight: "300",
      //   lineHeight: "100%",
      //   cursor: "pointer",
      //   fontSize: "16px",
      //   "&:hover": {
      //     textDecoration: "underline",
      //     color: "#d0c7b6",
      //   }
      // },
      usage_title:{
        // color:'rgba(0, 0, 0, 0.87)',
        width:'80%',
        fontFamily: "'Roboto', sans-serif",
        whiteSpace:'nowrap',
        fontSize: "20px",
        fontWeight: "300",
        "&.sourceName ":{
        fontSize: "20px",
        wordBreak:'break-all',
        // letterSpacing: "0.07em",
        },
        "&.sourceName span":{
        textDecoration:'underline',
        },
        "& span":{
          cursor:'pointer',
        fontWeight: "700",
        textDecoration:'none',
        letterSpacing: "0.04em",
        fontSize: "20px",
        },
        "& span:hover": {
          color: color,
          textDecoration:'underline'
        },
        
      },
      usage_quote_text:{
        fontFamily: "'Noto Serif', serif",
        fontSize: "22px",
        // cursor:'pointer',
        "&:hover":{
          // color:color,
        },
        "@media (max-width:768px)": {
          fontSize: "16px",
        },
      },
      source_summary_encoding:{
        fontFamily: "'Roboto', sans-serif",
        letterSpacing: "0.01em",
        fontSize: "18px",
        fontWeight: "700",
        lineHeight: "100%",
        cursor:'pointer',
        textDecoration:'underline',
        "&:hover":{
          color:color,
          textDecoration:'none',
        },
      },
      one_source_summary_encoding:{
        fontFamily: "'Roboto', sans-serif",
        letterSpacing: "0.01em",
        fontSize: "18px",
        fontWeight: "700",
        lineHeight: "100%",
        cursor:'pointer',
        textDecoration:'underline',
        "&:hover":{
          color:color,
          textDecoration:'none',
        },
        "&.sourceName:hover":{   
          cursor:'text',
        textDecoration:'underline',
          color:'inherit',
        }
      },
      source_summary_label:{
        fontFamily: "'Roboto', sans-serif",
        letterSpacing: "0.07em",
        fontSize: "12px",
        fontWeight: "300",
        maxWidth:'160px',
      },
      source_summary_fullCitation:{
        fontFamily: "'Roboto', sans-serif",
        letterSpacing: "0.07em",
        fontSize: "14px",
        fontWeight: "300",
        "&.sourceName>span":{   
          fontWeight:600,
          display:'block',
          opacity:0.8
        }
      },
      source_summary_mixed_info:{
        fontFamily: "'Roboto', sans-serif",
        fontSize: "16px",
        fontWeight: "400",
        "&.link":{
          color:'black',
        outline: 'none',
        textDecoration: 'none',
        },
        "&.link:hover":{
          color:color,
        textDecoration: 'underline',
        },
      },
      source_summary_text:{
        fontFamily: "'Noto Serif', serif",
        fontSize: "18px",
        fontWeight: "400",
      },
      plant_name:{
        fontFamily: "'Roboto', sans-serif",
        whiteSpace:'wrap',
        fontSize: "20px",
        fontWeight: "300",
        cursor:'pointer',
        "&.sourceName ":{
        fontSize: "20px",
        // letterSpacing: "0.07em",
        },
        "&.picture_plant_name ":{
        fontSize: "1rem",
        // letterSpacing: "0.07em",
        },
        "&.picture_plant_name:first-letter": {
          textTransform: "uppercase",
        } ,
        "&.sourceName span":{
          textDecoration:'underline',
        },
        "& span":{
          fontWeight: "700",
          textDecoration:'none',
          letterSpacing: "0.04em",
          fontSize: "20px",
        },
        "&:hover":{
          color: color,
          textDecoration:'underline'
        },
      },
      plant_name_rus:{
        fontFamily: "'Roboto', sans-serif",
        whiteSpace:'nowrap',
        fontSize: "20px",
        fontWeight: "300",
      },
      picture_btn_label:{
        fontFamily: "'Roboto', sans-serif",
        fontSize: "12px",
        fontWeight: "300",
        lineHeight: "100%",
        textDecoration: "none!important",
        "&span":{
        color:'red'
        },
      },
      usage_plant_lexeme_caption:{
        fontFamily: "'Roboto', sans-serif",
        whiteSpace:'nowrap',
        fontSize: "20px",
        fontWeight: "300",
      },
      usage_plant_lexeme_name:{
        fontFamily: "'Roboto', sans-serif",
        whiteSpace:'wrap',
        fontSize: "20px",
        fontWeight: "500",
        cursor:'pointer',
        "&:hover":{
          color: color,
          textDecoration:'underline'
        },
        "& span":{
          textDecoration:'none',
          fontWeight: "300",
          fontSize: "16px",
  
        },
      },
      usage_lexeme_citation_caption:{
        fontFamily: "'Roboto', sans-serif",
        whiteSpace:'nowrap',
        fontSize: "20px",
        fontWeight: "300",
      },
      usage_lexeme_citation_name:{
        fontFamily: "'Noto Serif', serif",
        whiteSpace:'wrap',
        fontSize: "20px",
        fontWeight: "500",
        cursor:'pointer',
        "&:hover":{
          color: color,
          textDecoration:'underline'
        },
        "& span":{
          textDecoration:'none',
          fontWeight: "300",
          fontSize: "16px",
        },
        "@media (max-width:768px)": {
          fontSize: "16px",
        },
      },
      about_title:{
        fontFamily: "'Noto Serif', serif",
        fontSize: "64px",
        fontWeight: "400",
        letterSpacing: "0.07em",
        lineHeight: "113%",
        "@media (max-width:900px)": {
          fontSize: "46px",
        },
        "@media (max-width:768px)": {
          fontSize: "32px",
        },
      },
      about_subtitle: {
        fontFamily: "'Noto Serif', serif",
        fontSize: "36px",
        fontWeight: "300",
        letterSpacing: "0.07em",
        lineHeight: "150%",
      },
      about_text: {
        fontFamily: "'Noto Serif', serif",
        fontSize: "24px",
        fontWeight: "400",
        letterSpacing: "0.04em",
        lineHeight: "180%",
        "&::first-letter": {
          fontSize: "260%",
        },
        "&>div>a": {
          color: "black",
          textDecoration: 'underline',
        },
        "&>a":{
          color:'black',
          textDecoration:'underline',
        },
        "&>a:hover":{
          color:color,
          textDecoration:'none',
        }
      },
      news_subtitle: {
        fontFamily: "'Noto Serif', serif",
        fontSize: "36px",
        fontWeight: "300",
        letterSpacing: "0.07em",
        lineHeight: "150%",
      },
      news_text: {
        fontFamily: "'Noto Serif', serif",
        fontSize: "18px",
        fontWeight: "400",
        // letterSpacing: "0.04em",
        //lineHeight: "180%",
        "&>a":{
          color:fontColor,
          textDecoration:'underline',
          fontWeight: "500",
          letterSpacing: "0.04em",
          textUnderlineOffset: "6px"
        },
        "&>a:hover":{
          color:color,
          textDecoration:'none'
        },
        "&>span":{
            fontSize: "260%",
        }
      },
      news_date: {
        fontFamily: "'Noto Serif', serif",
        fontSize: "18px",
        fontWeight: "400",
        letterSpacing: "0.04em",
        //lineHeight: "180%",
        opacity:0.5,
      },
      footer_text: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: "18px",
        fontWeight: "300",
        letterSpacing: "0.07em",
        lineHeight: "110%",
        "&>a":{
          textDecoration:'none'
        }
      },
      footer_nav: {
        fontFamily: "'Noto Serif', serif",
        textTransform: "uppercase",
        cursor: "pointer",
        fontSize: "20px",
        fontWeight: "700",
        letterSpacing: "0.08em",
        lineHeight: "100%",
        whiteSpace: 'nowrap',
        "&:visited": {
          color: fontColor,
        },
        "&:hover": {
          color: color,
        },
      },
      exact_two_line_with_dot: {
        fontFamily: "'Noto Serif', serif",
        fontSize: "20px",
        fontWeight: "400",
        letterSpacing: "0.07em",
        lineHeight: "100%",
      },
      footer_copyrigth_text: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: "12px",
        fontWeight: "300",
        letterSpacing: "0.1em",
        lineHeight: "1.3em",
      },
      advanced_result_table_header_text: {
        color: "rgb(135, 109, 59)",
        textTransform: "uppercase",
        fontFamily: "'Roboto', sans-serif",
        letterSpacing: "0.07em",
        fontWeight: "400",
        fontSize: "18px",
      },
      error_text:{
        fontFamily: "'Roboto', sans-serif",
        fontSize: "20px",
        color:color
      },
      pagination_text:{
        fontFamily: "'Roboto', sans-serif",
        fontSize: "20px",
        opacity:0.8,
        "&>span":{
          opacity:"1 !important"
        },
        "@media (max-width:768px)": {
          fontSize: "14px",
        },
      },
    },
    components: {
      MuiTooltip:{
        styleOverrides: {
          tooltip: {
            // backgroundColor: 'rgba(0,0,0,0)',
            color:'rgba(0, 0, 0, 0.87)',
            padding:0,
            backgroundColor:'lavenderblush',
            minWidth:'300px',
            minHeight:'10vh',
            "&.text":{
              color:'rgba(0, 0, 0, 0.87)',
              padding:0,
              backgroundColor:'red',
              minWidth:'auto',
              minHeight:'auto',
            },
          },
          popper:{
            overflow:'hidden'
  
          }
        }
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "outlined" },
            style: {
              textTransform: "uppercase",
              fontFamily: "'Roboto', sans-serif",
              border: "1px solid #d0c7b6",
              fontSize: { xs: "14px", md: "20px" },
              backgroundColor: "rgba(135,2,3,0)",
              color: "#d0c7b6",
              "&:hover": {
                backgroundColor: "#d0c7b6",
                color: "white",
                border: "1px solid #d0c7b6",
              },
            },
          },
          {
            props: { variant: "contained" },
            style: {
              textTransform: "uppercase",
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 400,
              padding: "8px 16px",
              boxSizing:'content-box',
                boxShadow: "none",
              // letterSpacing: "0.1em",
              fontSize: "20px",
              backgroundColor: "rgba(75,174,96,1)",
              color: "white",
                border: "1px solid rgba(75,174,96,0)",
              "&:hover": {
                boxShadow: "none",
                color: "rgba(75,174,96,1)",
                backgroundColor: "white",
                border: "1px solid rgba(75,174,96,1)",
              },
              "&.search_submit": {
                height: "100%",
                borderRadius: 0,
                width: "100%",
                boxShadow: "none",
                borderBottomRightRadius: "8px",
                borderTopRightRadius: "8px",
              },
              // "&.search_submit:hover": {
              //   backgroundColor: "white",
              //   border: "1px solid rgba(75,174,96,1)",
              //   borderLeft: "none",
              //   color: "rgba(75,174,96,1)",
              //   boxShadow: "none",
              // },
            },
          },
          {
            props: { variant: "text" },
            style: {
              fontSize: "14px",
              fontFamily: "'Roboto', sans-serif",
              letterSpacing: "0.07em",
              textTransform: "none",
              fontWeight: 300,
              color: "rgba(0,0,0,0.8)",
              "&:hover": {
                color: color,
                backgroundColor: "white",
              },
              "& .MuiButton-startIcon path": {
                color: "rgba(75,174,96,1)",
              },
            },
          },
        ],
      },
      MuiInputBase: {
        variants: [
          {
            props: { variant: "outlined" },
            style: {
              fontFamily: "'Roboto', sans-serif",
              borderBottom: `2px solid ${color}`,
              fontSize: "20px",
              paddingLeft: "8px",
              height: "100%",
              minWidth: "260px",
              "&.unityType ": {
                minWidth:'auto',
                textTransform: "uppercase",
                // color: "rgba(75,174,96,1)",
              },
              "&.field": {
                minWidth:'auto',
              },
              "&.unityType>svg,  &.contain>svg": {
                color: color,
              },
              "&.contain": {
                minWidth:'auto',
                // color:  color,
              },
            },
          },
          {
            props: { variant: "filled" },
            style: {
              fontFamily: "'Roboto', sans-serif",
              border: "none",
            },
          },
        ],
      },
      MuiDivider: {
        variants: [
          {
            props: { variant: "body2" },
            style: {
              backgroundColor:color,
              height:'2px'
            },
          },
        ],
      },
      MuiSlider: {
        variants: [
          {
            props: { variant: "filled" },
            style: {
              color: "rgba(2, 142, 74, 1)",
              "& .MuiSlider-rail": {
                height: "2px",
                color: "black",
              },
              "& .MuiSlider-track ": {
                height: "2px",
                // border: "none",
  
                color: "rgba(2, 142, 74, 1)",
                "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                  boxShadow: "inherit",
                },
                "&:before": {
                  display: "none",
                },
              },
              "& .MuiSlider-thumb": {
                color: "white",
                border: "1px solid rgba(2, 142, 74, 1)",
                "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                  boxShadow: "inherit",
                },
              },
              "& .MuiSlider-valueLabel": {
                lineHeight: 1.2,
                fontSize: 14,
                background: "unset",
                padding: "0 8px",
                height: 28,
                width: 64,
                color: "rgba(2, 142, 74, 1)",
                border: "1px solid rgba(2, 142, 74, 1)",
                borderRadius: "8px",
                backgroundColor: "white",
                "&:before": {
                  display: "none",
                },
              },
            },
          },
        ],
      },
      MuiChip: {
        variants: [
          {
            props: { variant: "filled" },
            style: {
              borderRadius:'6px',
              "&.MuiChip-root": {
                backgroundColor:'rgba(2, 142, 74, 0)',
                border: `2px solid ${color}`,
              },
              "&.active":{
                backgroundColor:color,
              }
            },
          },
        ],
      },
      MuiSelect: {
        variants: [
          {
            props: { variant: "filled" },
            style: {
              fontFamily: "'Roboto', sans-serif",
              backgroundColor: "white",
              borderRadius: 0,
              fontSize: "18px",
              height: "60px",
              "& *": {
                padding: 0,
                borderColor: "rgba(75,174,96,1) !important",
              },
            },
          },
        ],
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: color,
            "&:hover": {
              color: "gray",
              fontWeight: 700
            }
          }
        }
      }
    },
  });