import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';
import { colors, globalStyles } from '../styles';

export default function TimerScreen({ route, navigation }) {
	const { workTime, restTime, cycles } = route.params;
	const [currentCycle, setCurrentCycle] = useState(1);
	const [timeLeft, setTimeLeft] = useState(workTime);
	const [isWorking, setIsWorking] = useState(true);
	const [isPaused, setIsPaused] = useState(false);

	const timerRef = useRef(null);

	// Calcul de la progression pour le cercle
	const totalTime = isWorking ? workTime : restTime;
	const progress = ((totalTime - timeLeft) / totalTime) * 100;

	useEffect(() => {
		if (currentCycle > cycles) {
			navigation.goBack();
			return;
		}

		if (!isPaused) {
			timerRef.current = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev > 1) return prev - 1;

					// Passer au prochain état
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
		setTimeLeft(isWorking ? workTime : restTime);
	};

	const resetProgram = () => {
		setCurrentCycle(1);
		setIsWorking(true);
		setTimeLeft(workTime);
		setIsPaused(true);
	};

	return (
		<View style={globalStyles.container}>
			<View style={styles.progressContainer}>
				<Svg width={200} height={200} viewBox="0 0 100 100">
					<Circle
						cx="50"
						cy="50"
						r="45"
						stroke={colors.cerulean}
						strokeWidth="8"
						fill="none"
					/>
					<Circle
						cx="50"
						cy="50"
						r="45"
						stroke={colors.prussianBlue}
						strokeWidth="8"
						fill="none"
						strokeDasharray="283"
						strokeDashoffset={283 - (progress / 100) * 283}
						strokeLinecap="round"
					/>
				</Svg>
				<Text style={styles.timerText}>{timeLeft}s</Text>
			</View>

			<Text style={styles.stageText}>
				{isWorking ? 'Travail' : 'Repos'} (Cycle {currentCycle}/{cycles})
			</Text>

			<View style={styles.stageProgress}>
				{Array.from({ length: cycles }).map((_, index) => (
					<View
						key={index}
						style={[
							styles.stageDot,
							index < currentCycle - 1 ? styles.stageDotCompleted : null,
						]}
					/>
				))}
			</View>

			<View style={globalStyles.buttonContainer}>
				<IconButton
					icon={isPaused ? 'play' : 'pause'}
					size={35}
					onPress={handlePauseResume}
					style={globalStyles.iconButton}
					iconColor={colors.prussianBlue}
				/>
				<IconButton
					icon="refresh"
					size={35}
					onPress={resetStep}
					style={globalStyles.iconButton}
					iconColor={colors.prussianBlue}
				/>
				<IconButton
					icon="restart"
					size={35}
					onPress={resetProgram}
					style={globalStyles.iconButton}
					iconColor={colors.prussianBlue}
				/>
				<IconButton
					icon="stop"
					size={35}
					onPress={() => navigation.goBack()}
					style={globalStyles.iconButton}
					iconColor={colors.errorText}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	progressContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 30,
	},
	timerText: {
		position: 'absolute',
		fontSize: 48,
		fontWeight: 'bold',
		color: colors.darkIcon,
	},
	stageText: {
		textAlign: 'center',
		color: colors.darkIcon,
		fontSize: 18,
		marginBottom: 20,
	},
	stageProgress: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 30,
	},
	stageDot: {
		width: 15,
		height: 15,
		borderRadius: 15 / 2,
		backgroundColor: colors.cerulean,
		marginHorizontal: 5,
	},
	stageDotCompleted: {
		backgroundColor: colors.prussianBlue,
	},
});
