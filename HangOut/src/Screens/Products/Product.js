import React, { Component } from 'react'
import Navbar from '../../Components/Navbar';
//import ProductPage from '../../Components/ProductPage';
import {ProductDetailsPage} from '../../Screens/Products/ProductDetailsPage';
import {EventDetailsPage} from '../../Screens/Products/EventDetailsPage';
import {TripDetailsPage} from '../../Screens/Products/TripDetailsPage';
import {AdventureDetailsPage} from '../../Screens/Products/AdventureDetailsPage';

export default class Home extends Component {
    render() {
      return (
          <div>
              <Navbar />
              <ProductDetailsPage/>
              <EventDetailsPage/>
              <TripDetailsPage/>
              <AdventureDetailsPage/>
              
          </div>
      )
    }
  }