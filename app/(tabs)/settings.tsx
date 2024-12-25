import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch, Title, Divider } from 'react-native-paper';

const SettingsScreen = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);
  const [isLocationEnabled, setIsLocationEnabled] = React.useState(false);
  const [isAutoUpdateEnabled, setIsAutoUpdateEnabled] = React.useState(true);

  const toggleDarkTheme = () => setIsDarkTheme(!isDarkTheme);
  const toggleNotifications = () => setIsNotificationsEnabled(!isNotificationsEnabled);
  const toggleLocation = () => setIsLocationEnabled(!isLocationEnabled);
  const toggleAutoUpdate = () => setIsAutoUpdateEnabled(!isAutoUpdateEnabled);

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Настройки</Title>
      <List.Section>
        <List.Item
          title="Тема"
          description={isDarkTheme ? "Тёмная тема включена" : "Светлая тема включена"}
          left={props => <List.Icon {...props} icon="theme-light-dark" />}
          right={props => (
            <Switch value={isDarkTheme} onValueChange={toggleDarkTheme} />
          )}
        />
        <Divider />
        <List.Item
          title="Уведомления"
          description={isNotificationsEnabled ? "Уведомления включены" : "Уведомления отключены"}
          left={props => <List.Icon {...props} icon="bell" />}
          right={props => (
            <Switch value={isNotificationsEnabled} onValueChange={toggleNotifications} />
          )}
        />
        <Divider />
        <List.Item
          title="Геолокация"
          description={isLocationEnabled ? "Геолокация включена" : "Геолокация отключена"}
          left={props => <List.Icon {...props} icon="map-marker" />}
          right={props => (
            <Switch value={isLocationEnabled} onValueChange={toggleLocation} />
          )}
        />
        <Divider />
        <List.Item
          title="Автообновления"
          description={isAutoUpdateEnabled ? "Автообновления включены" : "Автообновления отключены"}
          left={props => <List.Icon {...props} icon="update" />}
          right={props => (
            <Switch value={isAutoUpdateEnabled} onValueChange={toggleAutoUpdate} />
          )}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
});

export default SettingsScreen;
