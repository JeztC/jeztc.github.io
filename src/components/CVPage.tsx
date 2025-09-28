import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import FacebookCircularProgress from "./FacebookCircularProgress";

export function CVPage() {
    const [loading, setLoading] = useState(true);

    return (
        <Container
            maxWidth="md"
            sx={{
                py: 4,
                backgroundColor: 'background.default',
                minHeight: '100vh',
                position: 'relative',
            }}
        >
            {loading && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1,
                    }}
                >
                    <FacebookCircularProgress />
                </Box>
            )}

            <Box
                sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 3,
                    opacity: loading ? 0 : 1,
                    transition: 'opacity 0.3s ease-in-out',
                }}
            >
                <iframe
                    src="/cv.pdf"
                    title="CV Viewer"
                    width="100%"
                    height="100%"
                    style={{ height: '100vh', border: 'none' }}
                    onLoad={() => setLoading(false)}
                />
            </Box>
        </Container>
    );
}