import React from 'react'
import { Container, Typography } from '@mui/material';
import AllSourcesList from '../../components/AllSourcesPageComponents/AllSourcesList';
import CustomHelmet from '../../components/Helmet/CustomHelmet';

function AllSourcesPage() {
    return (
        <Container
            maxWidth="xl"
            sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: 'center',
                gap: '10px',
            }}
        >
        <CustomHelmet title={"Источники"}/>
            <Typography
                variant="about_subtitle"
                sx={{
                    width: "100%",
                    textAlign: "center",
                    mt: 3,
                }}
            >
                Источники
            </Typography>
            <AllSourcesList />
        </Container>
    )
}

export default AllSourcesPage
