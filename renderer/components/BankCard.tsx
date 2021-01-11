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

export default function BankCard({}) {
  const leftbarColor: string = useStore(
    (state) => state.appConfig.leftbar.color
  );
  const avatar: LeftBarAvatarAppConfig = useStore(
    (state) => state.appConfig.leftbar.avatar
  );

  const useStyles = makeStyles(() =>
    createStyles({
      card: {
        width: 450,
        height: 270,
        borderRadius: 25,
        background:
          "linear-gradient(to right, rgba(1, 76, 219, 1), rgba(2, 155, 216, 1))",
        backdropFilter: "blur(16px)",
        overflow: "hidden",
        boxShadow: "0 8px 30px rgba(14,21,47,0.6)",
      },
      /* The two rings on the card background */
      ringA: {
        position: "absolute",
        height: "200%",
        width: "200%",
        borderRadius: "50%",
        background: "transparent",
        border: "45px solid rgba(255, 255, 255, 0.1)",
        top: "0%",
        left: "33%",
        boxSizing: "border-box",
      },
      ringB: {
        position: "absolute",
        height: "233%",
        width: "200%",
        borderRadius: "50%",
        background: "transparent",
        border: "30px solid rgba(255, 255, 255, 0.1)",
        top: "-17%",
        left: "22%",
        boxSizing: "border-box",
      },
      text: {
        color: "rgba(255, 255, 255, 0.8)",
        fontWeight: 400,
        letterSpacing: "2px",
        textShadow: "0 1.25px 2px rgba(0, 0, 0, 0.65)",
        lineHeight: 1.5,
      },
      miscText: {
        fontFamily: "Josefin Sans",
        fontSize: "75%",
        letterSpacing: "2px",
        textTransform: "uppercase",
      },
      miscSubtext: {
        fontFamily: "Josefin Sans",
        fontSize: "60%",
        letterSpacing: "2px",
        textTransform: "uppercase",
      },
      maskNumberText: {
        fontFamily: "Nunito",
        fontSize: "100%",
      },
      amountText: {
        fontFamily: "Nunito",
        fontSize: "250%",
      },
      numberText: {
        fontFamily: "Nunito",
        fontSize: "125%",
      },
      shine: {
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        borderRadius: "10px",
        background:
          "linear-gradient(135deg, rgba(255,255,255,.25) 0%,rgba(255,255,255,0) 60%)",
      },
      logo: {
        position: "absolute",
        top: 0,
        right: 0,
      },
      chipContainer: {
        position: "absolute",
        top: "50%",
        right: 0,
        transform: "translateY(-50%)",
      },
      chip: {
        position: "relative",
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50px",
        height: "40px",
        borderRadius: "5px",
        backgroundImage: "linear-gradient(to bottom left, #ffecc7, #d0b978)",
        overflow: "hidden",
      },
      chipLine: {
        position: "absolute",
        width: "100%",
        height: "0.5px",
        backgroundColor: "#333",
      },
      chipLineChild1: {
        top: "13px",
      },
      chipLineChild2: {
        top: "20px",
      },
      chipLineChild3: {
        top: "28px",
      },
      chipLineChild4: {
        left: "25px",
        width: "1px",
        height: "50px",
      },
      chipMain: {
        width: "20px",
        height: "25px",
        border: "1px solid #333",
        borderRadius: "3px",
        backgroundImage: "linear-gradient(to bottom left, #efdbab, #e1cb94)",
        zIndex: 1,
      },
    })
  );

  const classes = useStyles();

  return (
    <Box id="bank-card" className={classes.card}>
      <Box id="bank-card/shine" className={classes.shine} />
      <Box id="bank-card/ring-a" className={classes.ringA} />
      <Box id="bank-card/ring-b" className={classes.ringB} />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        height="100%"
        width="100%"
        paddingX={4}
        paddingY={4}
      >
        <Box
          id="bank-card/amount"
          className={`${classes.text} ${classes.amountText}`}
        >
          <Box display="flex" alignItems="center">
            <Box
              style={{ fontWeight: 300, fontSize: "82.5%" }}
              marginRight={0.25}
            >
              $
            </Box>
            465.32
          </Box>
        </Box>
        <Box
          id="bank-card/name"
          className={`${classes.text} ${classes.miscText}`}
        >
          Sapphire Reserve
        </Box>
        <Box
          display="flex"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <Box
            id="bank-card/type"
            className={`${classes.text} ${classes.miscSubtext}`}
          >
            Credit Card
          </Box>

          <Box
            id="bank-card/mask"
            className={`${classes.text} ${classes.maskNumberText}`}
          >
            9629
          </Box>
        </Box>
      </Box>
      <Box className={classes.logo} marginX={4} marginY={2.5}>
        {getSvgIcon("chase-bank.svg")}
      </Box>
      <Box className={classes.chipContainer} marginX={4}>
        <Box className={classes.chip}>
          <Box className={`${classes.chipLine} ${classes.chipLineChild1}`} />
          <Box className={`${classes.chipLine} ${classes.chipLineChild2}`} />
          <Box className={`${classes.chipLine} ${classes.chipLineChild3}`} />
          <Box className={`${classes.chipLine} ${classes.chipLineChild4}`} />
          <Box className={`${classes.chipMain}`} />
        </Box>
      </Box>
    </Box>
  );
}
