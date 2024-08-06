'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import styles from './BarChart.module.css';
import cookie from 'cookie';

const chartSetting = {
  yAxis: [
    {
      label: '',
    },
  ],
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

const valueFormatter = (value: number | null) => `${value}mm`;

const fetchData = async (userId: string) => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const response = await axios.get(`http://localhost:3001/api/v1/users/${userId}/daily/chart`, {
      withCredentials : true,
      timeout: 5000
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

interface DataPoint {
  water: number;
  steps: number;
  Calories: number;
  month: string;
}

// interface DecodedToken {
//   userId: string;
// }

// const getUserIdFromToken = () => {
//   if (typeof window !== 'undefined') {
//     const cookies = cookie.parse(document.cookie);
//     const token = cookies.token;
//     if (token) {
//       try {
//         const decoded: DecodedToken = jwtDecode(token);
//         return decoded.userId;
//       } catch (error) {
//         console.error('Error decoding token:', error);
//         return null;
//       }
//     }
//   }
//   return null;
// };

const defaultDataset = [
  { month: 'Jan', water: 5, steps: 5, Calories: 5 },
  { month: 'Feb', water: 5, steps: 5, Calories: 5 },
  { month: 'Mar', water: 5, steps: 5, Calories: 5 },
  { month: 'Apr', water: 5, steps: 5, Calories: 5 },
  { month: 'May', water: 5, steps: 5, Calories: 5 },
  { month: 'Jun', water: 5, steps: 5, Calories: 5 },
  { month: 'Jul', water: 5, steps: 5, Calories: 5 },
  { month: 'Aug', water: 5, steps: 5, Calories: 5 },
  { month: 'Sep', water: 5, steps: 5, Calories: 5 },
  { month: 'Oct', water: 5, steps: 5, Calories: 5 },
  { month: 'Nov', water: 5, steps: 5, Calories: 5 },
  { month: 'Dec', water: 5, steps: 5, Calories: 5 },
];

const BarsDataset: React.FC = () => {
  const [dataset, setDataset] = useState<any[]>(defaultDataset);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getId = async () => {
      const userRes = await axios.get(`http://localhost:3001/api/v1/auth/me` , {
        withCredentials: true,
      });

      const id = userRes.data.userId;

      if (id) {
        setUserId(id);
      } else {
        // If we can't get the userId, load default values
        setDataset(defaultDataset);
        setIsLoading(false);
      }
    };

    if (typeof window !== 'undefined') {
      getId();
    } else {
      // If we're not in the browser, load default values
      setDataset(defaultDataset);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (userId) {
        try {
          const data = await Promise.race([
            fetchData(userId),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
          ]);

          if (data && Array.isArray(data) && data.length > 0) {
            setDataset(data);
          } else {
            console.log('Using default dataset');
            setDataset(defaultDataset);
          }
        } catch (error) {
          console.error('Error or timeout occurred:', error);
          setDataset(defaultDataset);
        } finally {
          setIsLoading(false);
        }
      } else {
        // If there's no userId, we've already loaded default values in the first useEffect
        setIsLoading(false);
      }
    };

    getData();
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.chartContainer}>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[
          { dataKey: 'water', label: 'Water', valueFormatter, color: 'green' },
          { dataKey: 'steps', label: 'Steps', valueFormatter, color: 'blue' },
          { dataKey: 'Calories', label: 'Calories', valueFormatter, color: 'purple' },
        ]}
        {...chartSetting}
      />
    </div>
  );
};

export default BarsDataset;