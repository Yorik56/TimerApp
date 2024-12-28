import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
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

	// Fonction pour convertir les secondes en heures, minutes, secondes
	const formatTime = (seconds) => {
		const hrs = Math.floor(seconds / 3600);
		const mins = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		return `${hrs > 0 ? `${hrs}:` : ''}${String(mins).padStart(2, '0')}:${String(secs).padStart(
			2,
			'0'
		)}`;
	};

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
			<View style={globalStyles.progressContainer}>
				<Svg width={200} height={200} viewBox="0 0 100 100">
					{/* Cercle de fond */}
					<Circle
						cx="50"
						cy="50"
						r="45"
						stroke={colors.cerulean}
						strokeWidth="8"
						fill="none"
					/>
					{/* Cercle de progression */}
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
					{/* Temps restant */}
					<SvgText
						x="50%"
						y="50%"
						dy=".3em"
						textAnchor="middle"
						fontSize="10"
						fill={colors.darkIcon}
					>
						{formatTime(timeLeft)}
					</SvgText>
				</Svg>
			</View>

			<Text style={globalStyles.stageText}>
				{isWorking ? 'Travail' : 'Repos'} (Cycle {currentCycle}/{cycles})
			</Text>

			<View style={globalStyles.stageProgress}>
				{Array.from({ length: cycles }).map((_, index) => (
					<View
						key={index}
						style={[
							globalStyles.stageDot,
							index < currentCycle - 1 ? globalStyles.stageDotCompleted : null,
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