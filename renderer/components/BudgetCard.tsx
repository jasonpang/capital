import {
  makeStyles,
  Theme,
  createStyles,
  Avatar,
  Box,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
} from "@material-ui/core";
import React from "react";
import { LeftBarAvatarAppConfig } from "../lib/models";
import { getSvgIcon } from "../lib/resource";
import { useStore } from "../lib/store";

export default function BudetCard() {
  const leftbarColor: string = useStore(
    (state) => state.appConfig.leftbar.color
  );
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
    <Card
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.12) 0px 2px 7px, rgba(0, 0, 0, 0.24) 0px 0px 7px",
        position: "relative",
        overflow: "visible",
      }}
    >
      <CardActionArea>
        <Box display="flex">
          <Box
            id="left"
            display="flex"
            alignItems="center"
            justifyContent="center"
            minWidth="75px"
            maxWidth="75px"
            marginX={2}
          >
            {getSvgIcon("lotus.svg", { size: "100%" })}
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box id="right">
            <CardContent
              style={{
                paddingBottom: 0,
              }}
            >
              <Box display="flex" marginBottom={1}>
                <Typography
                  style={{
                    fontWeight: 425,
                    letterSpacing: "0.5px",
                    textShadow: "0px -1px 1px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  Health & Wellness
                </Typography>
              </Box>
            </CardContent>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
