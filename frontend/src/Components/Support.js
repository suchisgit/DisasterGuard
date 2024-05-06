import React from 'react';
import './Support.css'; // Import CSS file for styling

function Support() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-img1">
              <h5 className="card-title">Save People</h5>
              <div className="card-text">
                <p>As a volunteer, you can help save people affected by emergencies or disasters by providing assistance, first aid, or transportation to safety.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-img2">
              <h5 className="card-title">Donate Money</h5>
              <div className="card-text">
                <p>You can make a difference by donating money to support relief efforts, provide essential supplies, or help rebuild communities affected by disasters.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-img3">
              <h5 className="card-title">Contact Emergency Services</h5>
              <div className="card-text">
                <p>In case of emergencies, you can contact emergency services such as police, fire department, or medical services to provide timely assistance to those in need.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
