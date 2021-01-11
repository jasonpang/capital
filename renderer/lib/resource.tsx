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
    let rawIconEl: JSX.Element = parse(rawResource);
    if (Array.isArray(rawIconEl)) {
      rawIconEl = rawIconEl.find((x) => x?.type === "svg");
    }
    svgIconCache[filename] = rawIconEl;
  }

  const cachedIcon = svgIconCache[filename];

  if (styles.size) {
    styles.width = styles.size;
    styles.height = styles.size;
    delete styles.size;
  }
  return cloneElement(cachedIcon, styles);
}
