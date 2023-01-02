import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import NoticePageCp from "../../../components/noticeCp";

const NoticePage = () => {
  return (
    <>
      <NoticePageCp />
    </>
  );
};
export default NoticePage;
