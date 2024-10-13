// Filename - App.js
// It contains the Form, its Structure
// and Basic Form Functionalities

import './App.css';
import { useState } from 'react';
import Header from './Header.tsx';

function App() {
  const [familyEnrolled, setFamilyEnrolled] = useState(0);
  const [familyDonation, setFamilyDonation] = useState(0);
  const [donationPeriod, setDonationPeriod] = useState('month');

  const handleFamilyEnrolled = (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) {
      setFamilyEnrolled(0);
    } else {
      setFamilyEnrolled(value);
    }
  };

  const handleFamilyDonation = (e) => {
    const value = parseFloat(e.target.value);

    if (isNaN(value)) {
      setFamilyDonation(0);
    } else {
      setFamilyDonation(value);
    }
  };

  const handleDonationPeriodChange = (e) => {
    setDonationPeriod(e.target.value);
  };

  const calculateYearlyDonation = () => {
    console.log(familyDonation);
    if (donationPeriod === 'year') {
      return familyDonation;
    }
    return familyDonation * 12;
  };

  const calculatePerKidYearlyDonation = () => {
    const yearlyDonation = calculateYearlyDonation();
    if (familyEnrolled === 0) {
      return yearlyDonation;
    }
    return yearlyDonation / familyEnrolled;
  };

  const calculateMonthlyDonation = () => {
    if (donationPeriod === 'month') {
      return familyDonation;
    }
    return familyDonation * 12;
  };

  const calculatePerKidMonthlyDonation = () => {
    const monthlyDonation = calculateMonthlyDonation();
    if (familyEnrolled === 0) {
      return monthlyDonation;
    }
    return monthlyDonation / familyEnrolled;
  };

  return (
    <div className="App">
      <Header />
      <h2>Donation Calculator</h2>
      <fieldset className="styled-fieldset">
        <form action="#" method="get">
          <label htmlFor="familyEnrolled">Number of kids enrolled</label>
          <input
            type="number"
            name="familyEnrolled"
            id="familyEnrolled"
            value={familyEnrolled}
            onChange={handleFamilyEnrolled}
            placeholder="Total family kids enrolled"
            required
          />
          <label htmlFor="familyDonation">Total family donation</label>
          <input
            type="number"
            name="familyDonation"
            id="familyDonation"
            value={familyDonation}
            onChange={handleFamilyDonation}
            placeholder="total donation"
            required
          />
          <label htmlFor="donationPeriod">Donation Period</label>
          <select
            name="donationPeriod"
            id="donationPeriod"
            value={donationPeriod}
            onChange={handleDonationPeriodChange}
          >
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </form>
      </fieldset>
      <div className="yearly-donation">
        <table className="styled-table">
          <tbody>
            <tr>
              <td>Total Donation amount per Year</td>
              <td>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(calculateYearlyDonation())}
              </td>
            </tr>
            <tr>
              <td>Per kid per year</td>
              <td>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(calculatePerKidYearlyDonation())}
              </td>
            </tr>
            <tr>
              <td>Per kid per month</td>
              <td>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(calculatePerKidMonthlyDonation())}
              </td>
            </tr>
            <tr>
              <td>Total Monthtly Watershed Amount</td>
              <td>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(calculateMonthlyDonation())}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
