// Filename - App.js
// It contains the Form, its Structure
// and Basic Form Functionalities

import './App.css';
import { useState } from 'react';
import Header from './Header.tsx';

function App() {
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

    console.log(familyEnrolled);
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

  return (
    <div className="App">
      <Header />
      <h2>Donation Calculator</h2>
      <fieldset className="styled-fieldset">
        <form action="#" method="get">
          <label htmlFor="familyEnrolled">Number of kids enrolled</label>
          <input
            type="text"
            name="familyEnrolled"
            id="familyEnrolled"
            value={familyEnrolled}
            onChange={handleFamilyEnrolled}
            placeholder="Total family kids enrolled"
            required
          />
          <label htmlFor="familyDonation">Total family donation</label>
          <input
            type="text"
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
                }).format(parseFloat(calculateYearlyDonation().toString()))}
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
                }).format(parseFloat(calculateMonthlyDonation().toString()))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
