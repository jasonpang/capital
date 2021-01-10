import { Box } from "@material-ui/core";
import React from "react";
import { AppConfig } from "../lib/models";
import { useStore } from "../lib/store";
import LeftPane from "./LeftPane";

export default function HomeScreen() {
  const appConfig: AppConfig = useStore((state) => state.appConfig);

  return (
    <Box id="home-screen-container">
      <LeftPane />
    </Box>
  );
}
