import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, ProgressBar, Button, IconButton } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg'; // Импортируйте Svg и Circle

const CircularProgress = ({ progress }: { progress: number }) => {
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Svg height={120} width={120}>
      <Circle
        cx="60"
        cy="60"
        r={radius}
        stroke="#e6e6e6"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        cx="60"
        cy="60"
        r={radius}
        stroke="#6200ee"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        rotation="-90"
      />
    </Svg>
  );
};

const StatsScreen = () => {
  const progress = 75; // Прогресс в тренировках (например, 75%)
  const totalWorkouts = 30;
  const completedWorkouts = 20;
  const totalCalories = 1500;
  const burnedCalories = 1200;
  const totalDuration = 2000; // Общее время тренировок в минутах
  const completedDuration = 1500; // Прошедшее время в минутах

  const workoutCompletionPercentage = (completedWorkouts / totalWorkouts) * 100;
  const calorieBurnPercentage = (burnedCalories / totalCalories) * 100;
  const durationProgress = completedDuration / totalDuration;

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Статистика тренировок</Title>

      {/* Прогресс тренировок */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Прогресс тренировок</Title>
          <CircularProgress progress={workoutCompletionPercentage} />
          <Paragraph style={styles.progressText}>
            {completedWorkouts} из {totalWorkouts} тренировок завершено
          </Paragraph>
        </Card.Content>
      </Card>

      {/* Сожженные калории */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Сожженные калории</Title>
          <ProgressBar progress={calorieBurnPercentage / 100} color="#ff5722" />
          <Paragraph style={styles.progressText}>
            {burnedCalories} из {totalCalories} калорий сожжено
          </Paragraph>
        </Card.Content>
      </Card>

      {/* Время тренировок */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Общее время тренировок</Title>
          <ProgressBar progress={durationProgress} color="#03a9f4" />
          <Paragraph style={styles.progressText}>
            {completedDuration} из {totalDuration} минут тренировки завершено
          </Paragraph>
        </Card.Content>
      </Card>

      {/* Ближайшая тренировка */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Ближайшая тренировка</Title>
          <Paragraph>Ваша следующая тренировка: Кардио (40 мин)</Paragraph>
          <Button mode="contained" onPress={() => console.log('Start Workout')}>
            Начать тренировку
          </Button>
        </Card.Content>
      </Card>

      {/* Дополнительные иконки для наглядности */}
      <View style={styles.iconContainer}>
        <IconButton
          icon="chart-line"
          size={30}
          onPress={() => console.log('View Detailed Stats')}
        />
        <IconButton
          icon="alarm"
          size={30}
          onPress={() => console.log('Set Next Workout Alarm')}
        />
      </View>
    </ScrollView>
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
  card: {
    marginBottom: 16,
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default StatsScreen;
