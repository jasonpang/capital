import React from "react";

export default function NotFoundIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 48}
      height={props.size || 48}
      viewBox="0 0 48 48"
    >
      <path
        fill="#199be2"
        d="M35.983 32.448l-3.536 3.536 7.87 7.87a.5.5 0 00.707 0l2.828-2.828a.5.5 0 000-.707l-7.869-7.871z"
      ></path>
      <radialGradient
        id="eRNmcsAyqJzyQtK0oJ_Tda"
        cx="20.024"
        cy="233.904"
        r="19.604"
        gradientTransform="matrix(1 0 0 -1 0 254)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.693" stopColor="#006185"></stop>
        <stop offset="0.921" stopColor="#35c1f1"></stop>
      </radialGradient>
      <path
        fill="url(#eRNmcsAyqJzyQtK0oJ_Tda)"
        d="M31.601 28.065L28.065 31.601 32.448 35.983 35.983 32.448z"
      ></path>
      <linearGradient
        id="eRNmcsAyqJzyQtK0oJ_Tdb"
        x1="8.911"
        x2="31.339"
        y1="245.089"
        y2="222.661"
        gradientTransform="matrix(1 0 0 -1 0 254)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#a3ffff"></stop>
        <stop offset="0.223" stopColor="#9dfbff"></stop>
        <stop offset="0.53" stopColor="#8bf1ff"></stop>
        <stop offset="0.885" stopColor="#6ee0ff"></stop>
        <stop offset="1" stopColor="#63daff"></stop>
      </linearGradient>
      <circle
        cx="20"
        cy="20"
        r="16"
        fill="url(#eRNmcsAyqJzyQtK0oJ_Tdb)"
      ></circle>
      <path
        fill="#1b9de2"
        d="M12.5 26.75c0-.414 3-3.75 7.5-3.75s7.5 3.336 7.5 3.75-.336.75-.75.75c-.067 0-3.408-1.75-6.75-1.75-3.338 0-6.677 1.75-6.75 1.75a.75.75 0 01-.75-.75zm12.358-8.108a2.928 2.928 0 004.142 0L24.858 14.5a2.928 2.928 0 000 4.142zm-9.716 0a2.928 2.928 0 000-4.142L11 18.642a2.928 2.928 0 004.142 0z"
      ></path>
    </svg>
  );
}
