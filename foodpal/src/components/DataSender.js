import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const fetchDataFromBackend = async (dataType) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/get-backend-data?dataType=${dataType}`);
    return response.data.message;
  } catch (error) {
    console.error('Error getting data from backend:', error);
    return null;
  }
};
