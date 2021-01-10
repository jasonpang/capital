import { SvgIcon } from "@material-ui/core";
import fs from "fs";
import parse from "html-react-parser";
import path from "path";
import React, { cloneElement } from "react";
import NotFoundIcon from "../components/NotFoundIcon";

const svgIconCache = {};
const resourceCache = {};

export function getResource(filename) {
  if (!resourceCache[filename]) {
    const pathName = path.join((window as any).resourcePath, filename);
    if (!fs.existsSync(pathName)) {
      resourceCache[filename] = null;
    } else {
      resourceCache[filename] = fs.readFileSync(pathName, "utf8");
    }
  }

  return resourceCache[filename];
}

export function getSvgIcon(filename, styles = {}) {
  if (!svgIconCache[filename]) {
    const rawResource = getResource(filename);

    if (!rawResource) {
      return <NotFoundIcon />;
    }
    const rawIconEl: JSX.Element = parse(rawResource);
    if (styles.size) {
      styles.width = styles.size;
      styles.height = styles.size;
    }
    const svgIcon = cloneElement(rawIconEl, styles);

    svgIconCache[filename] = svgIcon;
  }

  return svgIconCache[filename];
}
