import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const CustomPopover = ({id, open, anchorEl, handleClose, message}) => {
    return (
        <React.Fragment>
            { message && <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>{message}</Typography>
            </Popover> }
        </React.Fragment>        
    );
}

export default CustomPopover;