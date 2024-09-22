import React from "react";
import "./styles.css";
import FindTalentComponentItem from "./FindTalentComponentItem/FindTalentComponentItem";

function FindTalentComponent() {
  const items = [
    {
      title: "Freelancers",
      description: "Work with the best freelancers in any field."
    },
    {
      title: "Agencies",
      description: "Hire top agencies to scale your business."
    },
    {
      title: "Project Managers",
      description: "Get help managing complex projects."
    }
  ];

  return (
    <div className="background-section rounded mb-3">
        <div></div>
      <div className="content">
        <h1>Find talent your way</h1>
        <p>
          Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.
        </p>
      </div>
      <div className="row w-100">
        {items.map((item, index) => (
          <FindTalentComponentItem
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

export default FindTalentComponent;
