import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TimerScreen({ route, navigation }) {
	const { workTime, restTime, cycles } = route.params;
	const [currentCycle, setCurrentCycle] = useState(1);
	const [timeLeft, setTimeLeft] = useState(workTime);
	const [isWorking, setIsWorking] = useState(true);

	useEffect(() => {
		if (currentCycle > cycles) {
			navigation.goBack();
			return;
		}

		const timer = setInterval(() => {
			setTimeLeft(prev => {
				if (prev > 1) return prev - 1;

				// Passer à la phase suivante
				if (isWorking) {
					setIsWorking(false);
					return restTime;
				} else {
					setIsWorking(true);
					setCurrentCycle(c => c + 1);
					return workTime;
				}
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [timeLeft, isWorking]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				{isWorking ? 'Travail' : 'Repos'} (Cycle {currentCycle}/{cycles})
			</Text>
			<Text style={styles.timer}>{timeLeft}s</Text>
			<Button title="Stop" onPress={() => navigation.goBack()} />
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
});
