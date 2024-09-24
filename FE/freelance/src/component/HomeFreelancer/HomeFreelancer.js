import React from "react";
import Banner from "./Layout/Banner";
import RightCard from "./Layout/RightCard";
import SearchInput from "./Layout/SearchInput";
import ListJobs from "./Layout/ListJobs";
function HomeFreelancer() {
  return (
    <div className="my-container">
      <div className="row">
        <div className="col-12 col-md-9 ">
          <div style={{ height: "250px" }}>
            <Banner />
          </div>
          <div className="row">
            <SearchInput />
          </div>
          <div className="row">
            <ListJobs/>
          </div>
        </div>

        <div className="col-12 col-md-3 d-none d-md-block">
          <RightCard />
        </div>
      </div>
    </div>
  );
}

export default HomeFreelancer;
