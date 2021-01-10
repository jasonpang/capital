import {
  makeStyles,
  Theme,
  createStyles,
  Avatar,
  Box,
  Typography,
} from "@material-ui/core";
import React from "react";
import { LeftBarAvatarAppConfig } from "../lib/models";
import { getSvgIcon } from "../lib/resource";
import { useStore } from "../lib/store";

export default function LeftPaneAvatar() {
  const avatar: LeftBarAvatarAppConfig = useStore(
    (state) => state.appConfig.leftbar.avatar
  );

  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        width: avatar.size,
        height: avatar.size,
      },
    })
  );

  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        padding={0.33}
        style={{
          background: "transparent",
          border: avatar.border,
          borderRadius: "50%",
        }}
      >
        <Avatar className={classes.root}>
          {getSvgIcon(avatar.image, {
            size: "100%",
          })}
        </Avatar>
      </Box>
      <Box marginY={0.25} />
      <Typography
        style={{
          color: avatar.nameColor,
          fontWeight: 250,
          letterSpacing: "0.5px",
        }}
      >
        {avatar.name}
      </Typography>
    </Box>
  );
}
