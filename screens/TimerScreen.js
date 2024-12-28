import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, IconButton, Card } from 'react-native-paper';

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
			<Card style={styles.card}>
				<Card.Content>
					<Text style={styles.title}>
						{isWorking ? 'Travail' : 'Repos'} (Cycle {currentCycle}/{cycles})
					</Text>
					<Text style={styles.timer}>{timeLeft}s</Text>
				</Card.Content>
			</Card>

			<View style={styles.buttonContainer}>
				<IconButton
					icon={isPaused ? 'play' : 'pause'}
					size={36}
					onPress={handlePauseResume}
					style={styles.iconButton}
				/>
				<IconButton
					icon="refresh"
					size={36}
					onPress={resetStep}
					style={styles.iconButton}
				/>
				<IconButton
					icon="restart"
					size={36}
					onPress={resetProgram}
					style={styles.iconButton}
				/>
				<IconButton
					icon="stop"
					size={36}
					onPress={() => navigation.goBack()}
					style={styles.iconButtonStop}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
	},
	card: {
		width: '90%',
		marginBottom: 20,
		elevation: 4,
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
		marginBottom: 10,
	},
	timer: {
		fontSize: 48,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '90%',
		marginTop: 20,
	},
	iconButton: {
		backgroundColor: '#6200ee',
	},
	iconButtonStop: {
		backgroundColor: '#d32f2f',
	},
});
