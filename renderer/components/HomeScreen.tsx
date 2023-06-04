import { Box } from "@material-ui/core";
import React from "react";
import { AppConfig } from "../lib/models";
import { getResource, getSvgIcon } from "../lib/resource";
import { useStore } from "../lib/store";
import BankCard from "./BankCard";
import BudgetCard from "./BudgetCard";
import LeftPane from "./LeftPane";

export default function HomeScreen() {
  const appConfig: AppConfig = useStore((state) => state.appConfig);

  return (
    <Box id="home-screen-container">
      <LeftPane />
      {/* <Box position="fixed" left={0} right={0} top={0} bottom={0}>
        {getSvgIcon("winter-landscape.svg", {
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "100%",
        })}
      </Box> */}
      <Box marginLeft={appConfig.leftbar.width}>
        <Box marginX={5} marginY={6}>
          <BankCard />
        </Box>
      </Box>
    </Box>
  );
}
