import { ListItemProps } from "@mui/material";
import { ElementType } from "react";

export interface StyledListItemProps extends ListItemProps {
    component?: ElementType;
    to?: string;
    isActive?: boolean;
}