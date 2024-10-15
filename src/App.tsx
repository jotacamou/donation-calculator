// Filename - App.tsx
// It contains the main application component

//import React from 'react';
import './App.css';
import { useState } from 'react';
import Header from './Header.tsx';

const App = () => {
  const [familyEnrolled, setFamilyEnrolled] = useState('');
  const [familyDonation, setFamilyDonation] = useState('');
  const [donationPeriod, setDonationPeriod] = useState('month');

  const handleFamilyEnrolled = (e) => {
    const value = e.target.value;

    if (isNaN(value)) {
      setFamilyEnrolled('');
    } else {
      setFamilyEnrolled(value);
    }
  };

  const handleFamilyDonation = (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) {
      setFamilyDonation('');
    } else {
      setFamilyDonation(value.toString());
    }
  };

  const handleDonationPeriodChange = (e) => {
    setDonationPeriod(e.target.value);
  };

  const calculateYearlyDonation = () => {
    if (parseFloat(familyDonation) === 0 || isNaN(parseFloat(familyDonation))) {
      return 0;
    }
    if (donationPeriod === 'year') {
      return familyDonation;
    }
    return parseFloat(familyDonation) * 12;
  };

  const calculatePerKidYearlyDonation = () => {
    const yearlyDonation = calculateYearlyDonation();
    if (parseFloat(familyEnrolled) === 0 || isNaN(parseFloat(familyEnrolled))) {
      return 0;
    }
    return (
      parseFloat(yearlyDonation.toString()) /
      parseFloat(familyEnrolled.toString())
    );
  };

  const calculateMonthlyDonation = () => {
    let monthly: number;
    if (donationPeriod === 'month') {
      if (
        parseFloat(familyDonation) === 0 ||
        isNaN(parseFloat(familyDonation))
      ) {
        monthly = 0;
      } else {
        monthly = parseFloat(familyDonation);
      }

      return monthly;
    } else {
      if (
        parseFloat(familyDonation) === 0 ||
        isNaN(parseFloat(familyDonation))
      ) {
        monthly = 0;
      } else {
        monthly = parseFloat(familyDonation);
      }

      return monthly / 12;
    }
  };

  const calculatePerKidMonthlyDonation = () => {
    const monthlyDonation = calculateMonthlyDonation();
    if (
      parseFloat(familyEnrolled) === 0 ||
      parseFloat(familyDonation) === 0 ||
      isNaN(parseFloat(familyEnrolled)) ||
      isNaN(parseFloat(familyDonation))
    ) {
      return 0;
    }
    return (
      parseFloat(monthlyDonation.toString()) /
      parseFloat(familyEnrolled.toString())
    );
  };

  // TODO: Replace these hardcoded values with actual data
  //       to be fetched from "source of truth".
  const totalStudents = 300;
  const studentsWithDonations = 70;

  const calculateParticipationRate = () => {
    return ((studentsWithDonations / totalStudents) * 100).toFixed(2);
  };

  const participationRate = calculateParticipationRate();
  const participationRateColor =
    parseFloat(participationRate) >= 50 ? 'green' : 'red';

  return (
    <div className="App">
      <Header />
      <h2>Watershed Donation Calculator</h2>
      <fieldset className="styled-fieldset">
        <form action="#" method="get">
          <label htmlFor="familyEnrolled">Family kids enrolled</label>
          <input
            type="text"
            name="familyEnrolled"
            id="familyEnrolled"
            value={familyEnrolled}
            onChange={handleFamilyEnrolled}
            placeholder="Enter the total number of enrolled children in your family"
            required
          />
          <label htmlFor="familyDonation">Donation amount</label>
          <input
            type="text"
            name="familyDonation"
            id="familyDonation"
            value={familyDonation}
            onChange={handleFamilyDonation}
            placeholder="Enter an amount to donate monthly or yearly based on the selected period"
            required
          />
          <label htmlFor="donationPeriod">Donation Period</label>
          <select
            name="donationPeriod"
            id="donationPeriod"
            value={donationPeriod}
            onChange={handleDonationPeriodChange}
          >
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>
        </form>
      </fieldset>

      <div className="dashboard">
        <div className="dashboard-box">
          <h3>Total Family Donation per Year</h3>
          <p>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(parseFloat(calculateYearlyDonation().toString()))}
          </p>
        </div>
        <div className="dashboard-box">
          <h3>Total Family Watershed per Month</h3>
          <p>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(parseFloat(calculateMonthlyDonation().toString()))}
          </p>
        </div>
      </div>
      <div className="dashboard">
        <div className="dashboard-box">
          <h3>Yearly "Tuition" per child</h3>
          <p>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(calculatePerKidYearlyDonation())}
          </p>
        </div>
        <div className="dashboard-box">
          <h3>Monthly "Tuition" per child</h3>
          <p>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(parseFloat(calculatePerKidMonthlyDonation().toString()))}
          </p>
        </div>
      </div>
      <div className="dashboard">
        <div className="dashboard-box">
          <h3>Total School Students</h3>
          <p>{totalStudents}</p>
        </div>
        <div className="dashboard-box">
          <h3>Students with Watershed Donations</h3>
          <p>{studentsWithDonations}</p>
        </div>
        <div className="dashboard-box">
          <h3>Participation Rate</h3>
          <p
            style={{
              color: participationRateColor,
            }}
          >
            {participationRate}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
