import * as React from 'react';
import { styled } from '@mui/material/styles';

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

// const CustomWidthTooltip = styled(({ className, ...props }) => (
//   <Tooltip {...props} classes={{ popper: className }} />
// ))({
//   [`& .${tooltipClasses.tooltip}`]: {
//     maxWidth: 500,
//   },
// });

// const NoMaxWidthTooltip = styled(({ className, ...props }) => (
//   <Tooltip {...props} classes={{ popper: className }} />
// ))({
//   [`& .${tooltipClasses.tooltip}`]: {
//     maxWidth: 'none',
//   },
// });

export default function TooltipText(props) {
  return (
    <div className={props.className}>
      <Tooltip title={props?.title}  placement="top">
        {props.children}
      </Tooltip>
    </div>
  );
}
