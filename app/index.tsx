import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './(tabs)/home';
import SettingsScreen from './(tabs)/settings';
import StatsScreen from './(tabs)/stats';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  const [completedWorkouts, setCompletedWorkouts] = useState<any[]>([]);

  const handleCompleteWorkout = (workout: any) => {
    setCompletedWorkouts((prev) => [...prev, workout]);
  };

  return (
    <Tab.Navigator>
  <Tab.Screen name="Home">
    {() => <HomeScreen onCompleteWorkout={handleCompleteWorkout} />}
  </Tab.Screen>
  <Tab.Screen name="Settings" component={SettingsScreen} />
  <Tab.Screen name="Stats">
    {() => <StatsScreen completedWorkouts={completedWorkouts} />}
  </Tab.Screen>
</Tab.Navigator>

  );
};

export default App;
