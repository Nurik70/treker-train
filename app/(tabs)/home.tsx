import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";

interface Workout {
  id: string;
  name: string;
  date: string;
  duration: number; // in minutes
  completed: boolean; // Add a 'completed' property to track the status
}

const HomeScreen: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([
    { id: "1", name: "Силовая тренировка", date: "2024-12-21", duration: 45, completed: false },
    { id: "2", name: "Бег", date: "2024-12-20", duration: 30, completed: false },
    { id: "3", name: "Йога", date: "2024-12-19", duration: 60, completed: false },
  ]);
  const [stats, setStats] = useState<Workout[]>([]); // Track completed workouts
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [newWorkoutDate, setNewWorkoutDate] = useState("");
  const [newWorkoutDuration, setNewWorkoutDuration] = useState("");

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleAddWorkout = () => {
    if (!newWorkoutName || !newWorkoutDate || !newWorkoutDuration) {
      Alert.alert("Ошибка", "Пожалуйста, заполните все поля.");
      return;
    }

    const newWorkout: Workout = {
      id: (workouts.length + 1).toString(),
      name: newWorkoutName,
      date: newWorkoutDate,
      duration: parseInt(newWorkoutDuration),
      completed: false,
    };

    setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
    setNewWorkoutName("");
    setNewWorkoutDate("");
    setNewWorkoutDuration("");
    closeModal();
  };

  const handleMarkAsCompleted = (id: string) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout.id === id
          ? { ...workout, completed: true }
          : workout
      )
    );

    const completedWorkout = workouts.find((workout) => workout.id === id);
    if (completedWorkout) {
      setStats((prevStats) => [...prevStats, completedWorkout]); // Move to stats
    }
  };

  const renderWorkoutItem = ({ item }: { item: Workout }) => (
    <View style={styles.workoutItem}>
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutName}>{item.name}</Text>
        <Text style={styles.workoutDetails}>
          {item.date} - {item.duration} минут
        </Text>
        {item.completed && (
          <Text style={styles.completedText}>Выполнено</Text> // Show "Completed" text if the workout is marked as completed
        )}
      </View>
      {!item.completed && ( // Only show the "Выполнено" button if the workout is not completed
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => handleMarkAsCompleted(item.id)}
        >
          <Text style={styles.completeButtonText}>Выполнено</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Добро пожаловать в Трекер Тренировок!</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Последние тренировки:</Text>
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id}
          renderItem={renderWorkoutItem}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>Добавить тренировку</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Добавить тренировку</Text>

            <TextInput
              style={styles.input}
              placeholder="Название тренировки"
              value={newWorkoutName}
              onChangeText={setNewWorkoutName}
            />
            <TextInput
              style={styles.input}
              placeholder="Дата (например, 2024-12-23)"
              value={newWorkoutDate}
              onChangeText={setNewWorkoutDate}
            />
            <TextInput
              style={styles.input}
              placeholder="Продолжительность (в минутах)"
              keyboardType="numeric"
              value={newWorkoutDuration}
              onChangeText={setNewWorkoutDuration}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddWorkout}>
                <Text style={styles.modalButtonText}>Сохранить</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Отмена</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  workoutItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: "600",
  },
  workoutDetails: {
    fontSize: 14,
    color: "#666",
  },
  completedText: {
    fontSize: 14,
    color: "#28a745", // Green color for completed workouts
    fontWeight: "600",
  },
  completeButton: {
    backgroundColor: "#28a745",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  buttonsContainer: {
    marginTop: 16,
  },
  button: {
    backgroundColor: "#5a2a8e",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#5a2a8e",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#ff4d4d",
  },
});

export default HomeScreen;
