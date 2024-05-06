import React from 'react';
import './Support.css'; // Import CSS file for styling

function Support() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card support_card">
            <div className="support_card-img1">
              <h5 className="card-title support_card-title">Save People</h5>
              <div className="card-text support_card-text">
                <p>As a volunteer, you can help save people affected by emergencies or disasters by providing assistance, first aid, or transportation to safety.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card support_card">
            <div className="support_card-img2">
              <h5 className="card-title support_card-title">Donate Money</h5>
              <div className="card-text support_card-text">
                <p>You can make a difference by donating money to support relief efforts, provide essential supplies, or help rebuild communities affected by disasters.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card support_card">
            <div className="support_card-img3">
              <h5 className="card-title support_card-title">Contact Emergency Services</h5>
              <div className="card-text support_card-text">
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
