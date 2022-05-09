import React from "react";
import "./HeaderD.css";

const HeaderD = () => {
  return (
    <div className="headerD">
      <div class="wrapper">
        <h1>Our Drivers</h1>
        <div class="team">
          <div class="team_member">
            <div class="team_img">
              <img
                src="https://pngimg.com/uploads/motorcycle/motorcycle_PNG3178.png"
                alt="Team_image"
              />
            </div>
            <h3>Paul Til Kima</h3>
            <p class="role">Driver001</p>
            <p>Type: Standard</p>
            <p>Driver ID: Ewrt99er</p>
            <p>Contacts: 0714562224</p>
          </div>
          <div class="team_member">
            <div class="team_img">
              <img
                src="https://pngimg.com/uploads/motorcycle/motorcycle_PNG5344.png"
                alt="Team_image"
              />
            </div>
            <h3>Rose Tikiki</h3>
            <p class="role">Driver002</p>
            <p>Type: Cruiser</p>
            <p>Driver ID: Wr2312QR</p>
            <p>Contacts: 0724561223</p>
          </div>
          <div class="team_member">
            <div class="team_img">
              <img
                src="https://pngimg.com/uploads/motorcycle/motorcycle_PNG5340.png"
                alt="Team_image"
              />
            </div>
            <h3>Alex Wikiwi</h3>
            <p class="role">Driver003</p>
            <p>Type: Captain</p>
            <p>Driver ID: Q078rD</p>
            <p>Contacts: 0734561234</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderD;
