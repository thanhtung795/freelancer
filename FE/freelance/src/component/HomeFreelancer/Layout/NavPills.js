import React, { useState } from 'react';
import ListBestJobs from './LIstBestJobs';
import ListNewJobs from './ListNewJobss';
import SaveJobs from './saveJobs';



function NavUnderline() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };function NavLink({ id, isActive, onClick, children }) {
    return (
      <li className="nav-item" role="presentation">
        <button
          className={`nav-link ${isActive ? 'active' : ''}`}
          id={id}
          onClick={onClick}
          role="tab"
        >
          {children}
        </button>
      </li>
    );
  }
  
  function TabContent({ id, isActive, children }) {
    return (
      <div
        className={`tab-pane fade ${isActive ? 'show active' : ''}`}
        id={id}
        role="tabpanel"
        aria-labelledby={`${id}-tab`}
      >
        {children}
      </div>
    );
  }
  

  return (
    <div>
      <ul className="nav nav-underline mb-3" id="underline-tab" role="tablist">
        <NavLink
          id="home-tab"
          isActive={activeTab === 'home'}
          onClick={() => handleTabChange('home')}
        >
         Những trận đấu hay nhất
        </NavLink>
        <NavLink
          id="profile-tab"
          isActive={activeTab === 'profile'}
          onClick={() => handleTabChange('profile')}
        >
          Mới nhất
        </NavLink>
        <NavLink
          id="contact-tab"
          isActive={activeTab === 'contact'}
          onClick={() => handleTabChange('contact')}
        >
         Công việc đã lưu
        </NavLink>
      </ul>

      <div className="tab-content" id="underline-tabContent">
        <TabContent id="home-content" isActive={activeTab === 'home'}>
        {/* fill ra những thông tin của jobs hay  */}
        <ListBestJobs/>

        </TabContent>
        <TabContent id="profile-content" isActive={activeTab === 'profile'}>
        {/* fill ra những thông tin của jobs mới  */}
          <ListNewJobs/>
        </TabContent>
        <TabContent id="contact-content" isActive={activeTab === 'contact'}>
          {/* fill ra những thông tin của job đã luw  */}
          <SaveJobs/>
        </TabContent>
      </div>
    </div>
  );
}

export default NavUnderline;
