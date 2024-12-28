import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, globalStyles } from '../styles';

export default function ConfigScreen({ route, navigation }) {
	const [workHours, setWorkHours] = useState(0);
	const [workMinutes, setWorkMinutes] = useState(0);
	const [workSeconds, setWorkSeconds] = useState(30);
	const [restHours, setRestHours] = useState(0);
	const [restMinutes, setRestMinutes] = useState(0);
	const [restSeconds, setRestSeconds] = useState(10);
	const [cycles, setCycles] = useState(5);
	const [programName, setProgramName] = useState('');
	const [editingProgram, setEditingProgram] = useState(null);
	const [error, setError] = useState('');

	useEffect(() => {
		if (route.params?.program) {
			const { name, workTime, restTime, cycles } = route.params.program;

			setProgramName(name);
			setWorkHours(Math.floor(workTime / 3600));
			setWorkMinutes(Math.floor((workTime % 3600) / 60));
			setWorkSeconds(workTime % 60);
			setRestHours(Math.floor(restTime / 3600));
			setRestMinutes(Math.floor((restTime % 3600) / 60));
			setRestSeconds(restTime % 60);
			setCycles(cycles);
			setEditingProgram(route.params.program);
		}
	}, [route.params]);

	const calculateTotalSeconds = (hours, minutes, seconds) => {
		return hours * 3600 + minutes * 60 + seconds;
	};

	const saveProgram = async () => {
		if (!programName.trim()) {
			setError('Veuillez entrer un nom pour le programme.');
			return;
		}

		setError('');

		const workTime = calculateTotalSeconds(workHours, workMinutes, workSeconds);
		const restTime = calculateTotalSeconds(restHours, restMinutes, restSeconds);

		const newProgram = { name: programName.trim(), workTime, restTime, cycles };

		try {
			const currentPrograms = await AsyncStorage.getItem('programs');
			let programs = currentPrograms ? JSON.parse(currentPrograms) : [];

			if (editingProgram) {
				programs = programs.map((p) => (p.name === editingProgram.name ? newProgram : p));
				setEditingProgram(null);
			} else {
				programs.push(newProgram);
			}

			await AsyncStorage.setItem('programs', JSON.stringify(programs));
			setProgramName('');
			setWorkHours(0);
			setWorkMinutes(0);
			setWorkSeconds(30);
			setRestHours(0);
			setRestMinutes(0);
			setRestSeconds(10);
			setCycles(5);

			navigation.navigate('Home', { updated: true });
		} catch (error) {
			console.error('Erreur lors de la sauvegarde :', error);
		}
	};

	const handleStart = () => {
		const workTime = calculateTotalSeconds(workHours, workMinutes, workSeconds);
		const restTime = calculateTotalSeconds(restHours, restMinutes, restSeconds);

		navigation.navigate('Timer', { workTime, restTime, cycles });
	};

	return (
		<View style={globalStyles.container}>
			<Text style={globalStyles.title}>Configurer votre Timer</Text>

			<View>
				<TextInput
					label="Nom du Programme"
					mode="outlined"
					value={programName}
					onChangeText={(text) => {
						setProgramName(text);
						if (error) setError('');
					}}
					error={!!error}
					outlineStyle={globalStyles.outlineStyle}
					style={globalStyles.input}
				/>
				{error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

				<Text style={globalStyles.label}>Durée de Travail</Text>
				<View style={globalStyles.durationContainer}>
					<TextInput
						label="Heures"
						mode="outlined"
						keyboardType="numeric"
						value={String(workHours)}
						onChangeText={(text) => setWorkHours(Number(text))}
						style={globalStyles.durationInput}
					/>
					<TextInput
						label="Minutes"
						mode="outlined"
						keyboardType="numeric"
						value={String(workMinutes)}
						onChangeText={(text) => setWorkMinutes(Number(text))}
						style={globalStyles.durationInput}
					/>
					<TextInput
						label="Secondes"
						mode="outlined"
						keyboardType="numeric"
						value={String(workSeconds)}
						onChangeText={(text) => setWorkSeconds(Number(text))}
						style={globalStyles.durationInput}
					/>
				</View>

				<Text style={globalStyles.label}>Durée de Pause</Text>
				<View style={globalStyles.durationContainer}>
					<TextInput
						label="Heures"
						mode="outlined"
						keyboardType="numeric"
						value={String(restHours)}
						onChangeText={(text) => setRestHours(Number(text))}
						style={globalStyles.durationInput}
					/>
					<TextInput
						label="Minutes"
						mode="outlined"
						keyboardType="numeric"
						value={String(restMinutes)}
						onChangeText={(text) => setRestMinutes(Number(text))}
						style={globalStyles.durationInput}
					/>
					<TextInput
						label="Secondes"
						mode="outlined"
						keyboardType="numeric"
						value={String(restSeconds)}
						onChangeText={(text) => setRestSeconds(Number(text))}
						style={globalStyles.durationInput}
					/>
				</View>

				<TextInput
					label="Nombre de Cycles"
					mode="outlined"
					keyboardType="numeric"
					value={String(cycles)}
					onChangeText={(text) => setCycles(Number(text))}
					outlineStyle={globalStyles.outlineStyle}
					style={globalStyles.input}
				/>

				<View style={globalStyles.buttonContainer}>
					<Button
						mode="outlined"
						icon="content-save"
						onPress={saveProgram}
						style={globalStyles.button}
						labelStyle={globalStyles.buttonText}
					>
						Sauvegarder
					</Button>
					<Button
						mode="outlined"
						icon="play-circle-outline"
						onPress={handleStart}
						style={globalStyles.button}
						labelStyle={globalStyles.buttonText}
					>
						Démarrer
					</Button>
				</View>
			</View>
		</View>
	);
}
