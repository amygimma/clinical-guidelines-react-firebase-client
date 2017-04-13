import React from 'react';
import './User.css';

const ProfileComponent = ({profile}) => (
  <div className="profile">
    <h2>Signed in as: {profile.name}</h2>
  </div>
);

export default ProfileComponent;
