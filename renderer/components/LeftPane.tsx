import {
  makeStyles,
  Theme,
  createStyles,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@material-ui/core";
import React from "react";
import { AppConfig } from "../lib/models";
import { useStore } from "../lib/store";
import LeftPaneAvatar from "./LeftPaneAvatar";
import Nav from "./Nav";

export default function LeftPane() {
  const appConfig: AppConfig = useStore((state) => state.appConfig);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
      },
      appBar: {
        width: `calc(100% - ${appConfig.leftbar.width}px)`,
        marginLeft: appConfig.leftbar.width,
      },
      drawer: {
        width: appConfig.leftbar.width,
        flexShrink: 0,
      },
      drawerPaper: {
        width: appConfig.leftbar.width,
        background: appConfig.leftbar.background,
        backdropFilter: appConfig.leftbar.backdropFilter,
        boxShadow: appConfig.leftbar.boxShadow,
        top: appConfig.titlebar.height,
      },
      // necessary for content to be below app bar
      toolbar: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
      },
    })
  );

  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <Box
        marginX={2}
        marginY={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <LeftPaneAvatar />
      </Box>
      <Nav />
    </Drawer>
  );
}
