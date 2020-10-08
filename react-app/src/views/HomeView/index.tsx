import React from "react";
import "./HomeView.scss";
import form_img from '../../assets/form-icon.png'

const HomeView: React.FC = () => {
  return (
    <>
      <div className="home-view">
        <h1>Give an answer. Get your reward!</h1>
        <h2>Form builder with rewards for Minter</h2>
        <img className="form-icon" src={form_img} alt="" />
      </div>
    </>
  );
};

export default HomeView;
