import { Box, CircularProgress, circularProgressClasses, CircularProgressProps } from "@mui/material";
import React from "react";

function FacebookCircularProgress(props: CircularProgressProps) {
    return (
        <Box sx={{ position: 'relative'  }}>
            <CircularProgress
                variant="determinate"
                sx={(theme) => ({
                    color: theme.palette.grey[200],
                    ...theme.applyStyles('dark', {
                        color: theme.palette.grey[800],
                    }),
                })}
                size={40}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={(theme) => ({
                    color: '#1a90ff',
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                    ...theme.applyStyles('dark', {
                        color: theme.palette.primary.main,
                    }),
                })}
                size={40}
                thickness={4}
                {...props}
            />
        </Box>
    );
}

export default FacebookCircularProgress;