import Banner from "./Banner/Banner.js";
import TalentSkillItem from "./TalentSkillItem/TalentSkillItem.js";
import FindTalentComponent from "./FindTalentComponent/FindTalentComponent.js";
import SplitScreenComponent from "./SplitScreenComponent/SplitScreenComponent.js";
import "./styles.css";  

function Home() {
  const items = [
    { title: "Developkit", rating: "4.8/5", skills: "1888" },
    { title: "DesignPro", rating: "4.6/5", skills: "1500" },
    { title: "CodeMaster", rating: "4.9/5", skills: "2000" },
    { title: "TechGuru", rating: "4.7/5", skills: "1700" },
    { title: "Developkit", rating: "4.8/5", skills: "1888" },
    { title: "DesignPro", rating: "4.6/5", skills: "1500" },
    { title: "CodeMaster", rating: "4.9/5", skills: "2000" },
    { title: "TechGuru", rating: "4.7/5", skills: "1700" },
  ];

  return (
    <div className="my-container"> {/* Sử dụng lớp .my-container */}
      <Banner />
      <div className="row mb-4">
        {items.map((item, index) => (
          <div key={index} className="col-md-3 mb-4">
            <TalentSkillItem
              title={item.title}
              rating={item.rating}
              skills={item.skills}
            />
          </div>
        ))}
      </div>
      <FindTalentComponent />
      <SplitScreenComponent />
    </div>
  );
}

export default Home;
