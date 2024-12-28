import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TimerScreen({ route, navigation }) {
	const { workTime, restTime, cycles } = route.params;
	const [currentCycle, setCurrentCycle] = useState(1);
	const [timeLeft, setTimeLeft] = useState(workTime);
	const [isWorking, setIsWorking] = useState(true);
	const [isPaused, setIsPaused] = useState(false);

	const timerRef = useRef(null);

	useEffect(() => {
		if (currentCycle > cycles) {
			navigation.goBack();
			return;
		}

		if (!isPaused) {
			timerRef.current = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev > 1) return prev - 1;

					// Passer à la phase suivante
					if (isWorking) {
						setIsWorking(false);
						return restTime;
					} else {
						setIsWorking(true);
						setCurrentCycle((c) => c + 1);
						return workTime;
					}
				});
			}, 1000);
		}

		return () => clearInterval(timerRef.current);
	}, [timeLeft, isPaused, isWorking]);

	const handlePauseResume = () => {
		setIsPaused((prev) => !prev);
	};

	const resetStep = () => {
		// Réinitialise le temps de l'étape actuelle (travail ou repos)
		setTimeLeft(isWorking ? workTime : restTime);
	};

	const resetProgram = () => {
		// Réinitialise le programme complet
		setCurrentCycle(1);
		setIsWorking(true);
		setTimeLeft(workTime);
		setIsPaused(true); // Mettre en pause après le reset
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				{isWorking ? 'Travail' : 'Repos'} (Cycle {currentCycle}/{cycles})
			</Text>
			<Text style={styles.timer}>{timeLeft}s</Text>

			<View style={styles.buttonContainer}>
				<Button title={isPaused ? 'Reprendre' : 'Pause'} onPress={handlePauseResume} />
				<Button title="Reset Étape" onPress={resetStep} />
				<Button title="Reset Programme" onPress={resetProgram} />
				<Button title="Stop" onPress={() => navigation.goBack()} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
	},
	timer: {
		fontSize: 48,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '80%',
	},
});
