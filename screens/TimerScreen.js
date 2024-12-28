import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Audio} from 'expo-av';
import {Text, IconButton} from 'react-native-paper';
import Svg, {Circle, Text as SvgText} from 'react-native-svg';
import {colors, globalStyles} from '../styles';

export default function TimerScreen({route, navigation}) {
	const {workTime, restTime, cycles, sounds} = route.params;
	const [currentCycle, setCurrentCycle] = useState(1);
	const [timeLeft, setTimeLeft] = useState(workTime);
	const [isWorking, setIsWorking] = useState(true);
	const [isPaused, setIsPaused] = useState(false);
	const timerRef = useRef(null);
	// Mapper les sons définis dans la configuration aux fichiers correspondants
	const soundMap = {
		default: require('../assets/sounds/default.mp3'),
		beep: require('../assets/sounds/beep.mp3'),
		bell: require('../assets/sounds/bell.mp3'),
		whistle: require('../assets/sounds/whistle.mp3'),
	};
	const playSound = async (soundKey) => {
		if (soundKey === 'default') {
			return; // Ignore la lecture
		}
		console.log(`Lecture du son : ${soundKey}`); // Debug
		const soundFile = soundMap[soundKey] || soundMap['default']; // Utilise 'default' si le son n'existe pas
		const sound = new Audio.Sound();
		try {
			await sound.loadAsync(soundFile);
			await sound.playAsync();
			sound.setOnPlaybackStatusUpdate((status) => {
				if (status.didJustFinish) {
					sound.unloadAsync();
				}
			});
		} catch (error) {
			console.error('Erreur lors de la lecture du son :', error);
		}
	};

	useEffect(() => {
		(async () => {
			await playSound(sounds?.startProgram || 'default'); // Joue le son de début de programme
		})();
		return () => {
			clearInterval(timerRef.current); // Nettoyage
		};
	}, []);

	useEffect(() => {
		if (currentCycle > cycles) {
			(async () => {
				await playSound(sounds?.endProgram || 'default'); // Son à la fin du programme
				navigation.goBack();
			})();
			return;
		}

		if (!isPaused) {
			timerRef.current = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev > 1) return prev - 1;

					(async () => {
						// Joue le son au début de chaque transition
						if (isWorking) {
							await playSound(sounds?.startRest || 'default');
							setIsWorking(false);
							setTimeLeft(restTime);
						} else {
							await playSound(sounds?.startWork || 'default');
							setIsWorking(true);
							setCurrentCycle((c) => c + 1);
							setTimeLeft(workTime);
						}
					})();

					return 0; // Évite les erreurs de retour inattendues
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
						strokeDashoffset={283 - ((workTime - timeLeft) / workTime) * 283}
						strokeLinecap="round"
					/>
					<SvgText
						x="50%"
						y="50%"
						dy=".3em"
						textAnchor="middle"
						fontSize="10"
						fill={colors.darkIcon}
					>
						{`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}
					</SvgText>
				</Svg>
			</View>

			<Text style={globalStyles.stageText}>
				{isWorking ? 'Travail' : 'Repos'} (Cycle {currentCycle}/{cycles})
			</Text>

			<View style={globalStyles.stageProgress}>
				{Array.from({length: cycles}).map((_, index) => (
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
const styles = StyleSheet.create({});
