import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";

import "./style.css";

const StatsCard = ({ data }) => {
  return (
    <>
      <div class="col-md-4 my-3" bis_skin_checked="1">
        <div
          class="d-flex justify-content-between shadow align-items-end p-3 flex-wrap h-100"
          bis_skin_checked="1"
        >
          <div class="totalUser" bis_skin_checked="1">
            <p class="mb-2">{data.text}</p>
            <p class="mb-0 font-weight-bold">{data.value}</p>
          </div>
          <div class="userStats" bis_skin_checked="1">
            <img
              src="https://custom3.mystagingserver.site/gowri_vemuri/public/asset/admin/images/data-analysis.png"
              class="mw-100"
              alt="Total Users"
              width="86px"
              height="86px"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsCard;
