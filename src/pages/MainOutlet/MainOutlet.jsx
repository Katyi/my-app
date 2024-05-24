import { Box, Container } from "@mui/material";
import React, { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppFooterBar from "../../components/AppFooterBar/AppFooterBar";
import AppHeaderBar from "../../components/AppHeaderBar/AppHeaderBar";
import { ErrorFallback } from "../../components/fallback/ErrorFallback";
import ProgressBlock from "../../components/ProgressBlock/ProgressBlock";

function MainOutlet() {
  const location = useLocation()
  const navigate = useNavigate()
  // useEffect(() => {
  //   window.scrollTo(0,0)
  // },[location])
  
  return (
    <Box
      sx={{
        minHeight: "100%",
        boxSizing: "content-box",
        display:'flex',
        flexDirection:'column',
        
      }}
    >
        <AppHeaderBar />
          
        <Container maxWidth="xl" component={'main'} sx={{
          flexGrow:1,
          px:{xs:1,sm:0}}}>
      <ErrorBoundary 
        FallbackComponent={({error})=><ErrorFallback error={error}/>}
        onReset={()=>navigate('/')}
      >
        <Suspense fallback={<ProgressBlock label="поисковик"/>}>
        <Outlet /> 
        </Suspense>
        </ErrorBoundary>
        </Container> 
        <AppFooterBar />
    </Box>
  );
}

export default MainOutlet;
