/* eslint-disable arrow-body-style */
import React from 'react';
import DashboardToggle from './dashboard/DashboardToggle';

const SideBar = () => {
  return (
    <div className="h-100 pt-2">
      <div>
        <DashboardToggle />
      </div>
    </div>
  );
};

export default SideBar;
