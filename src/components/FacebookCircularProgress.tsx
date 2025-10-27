import {
    Box,
    CircularProgress,
    circularProgressClasses,
    type CircularProgressProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Wrapper = styled(Box)({
    position: 'relative',
});

const DeterminateProgress = styled(CircularProgress)(({ theme }) => ({
    color: theme.palette.grey[200],
    ...theme.applyStyles?.('dark', {
        color: theme.palette.grey[800],
    }),
}));

const IndeterminateProgress = styled(CircularProgress)(({ theme }) => ({
    color: '#1a90ff',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
    [`& .${circularProgressClasses.circle}`]: {
        strokeLinecap: 'round',
    },
    ...theme.applyStyles?.('dark', {
        color: theme.palette.primary.main,
    }),
}));

function FacebookCircularProgress(props: CircularProgressProps) {
    return (
        <Wrapper>
            <DeterminateProgress
                variant="determinate"
                size={40}
                thickness={4}
                value={100}
                {...props}
            />
            <IndeterminateProgress
                variant="indeterminate"
                disableShrink
                size={40}
                thickness={4}
                {...props}
            />
        </Wrapper>
    );
}

export default FacebookCircularProgress;