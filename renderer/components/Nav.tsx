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
  Typography,
} from "@material-ui/core";
import React from "react";
import { AppConfig } from "../lib/models";
import { getSvgIcon } from "../lib/resource";
import { useStore } from "../lib/store";

const NavItems = [
  {
    icon: "bank-cards.svg",
    iconProps: { filter: "hue-rotate(217deg)" },
    label: "Accounts",
  },
  {
    icon: "loading-bar.svg",
    iconProps: { filter: "hue-rotate(318deg)" },
    label: "Budget",
  },
  {
    icon: "test-tube.svg",
    label: "Fire Lab",
  },
];
export default function Nav() {
  const leftbarColor: string = useStore(
    (state) => state.appConfig.leftbar.color
  );
  const appConfig: AppConfig = useStore((state) => state.appConfig);

  const useStyles = makeStyles((theme: Theme) => createStyles({}));

  const classes = useStyles();

  return (
    <Box
      borderRadius="4px"
      marginX={0.75}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 10px, rgba(0, 0, 0, 0.1) 0px 0px 10px"
      style={{
        background:
          "linear-gradient(rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1))",
      }}
    >
      {NavItems.map(({ icon, label, iconProps = {} }) => (
        <Box flexDirection="column" justifyContent="center" alignItems="center">
          <ListItem button>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              <ListItemIcon>
                {getSvgIcon(icon, { size: 36, ...iconProps })}
              </ListItemIcon>
              <ListItemText
                disableTypography
                style={{
                  color: leftbarColor,
                  textAlign: "left",
                  flex: "unset",
                  width: 135,
                }}
              >
                <Typography
                  style={{
                    color: leftbarColor,
                    fontWeight: 550,
                    letterSpacing: "1px",
                    fontSize: "70%",
                    textTransform: "uppercase",
                    // textShadow: "0px -1px 1px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  {label}
                </Typography>
              </ListItemText>
            </Box>
          </ListItem>
          <Divider />
        </Box>
      ))}
    </Box>
  );
}
