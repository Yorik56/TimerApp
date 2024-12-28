import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text, RadioButton } from 'react-native-paper';
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
	const [startWorkSound, setStartWorkSound] = useState('default');
	const [startRestSound, setStartRestSound] = useState('default');
	const [startProgramSound, setStartProgramSound] = useState('default');
	const [endProgramSound, setEndProgramSound] = useState('default');
	const [editingProgram, setEditingProgram] = useState(null);
	const [error, setError] = useState('');

	const soundOptions = [
		{ label: 'Pas de son', value: 'default' },
		{ label: 'Bip', value: 'beep' },
		{ label: 'Cloche', value: 'bell' },
		{ label: 'Sifflet', value: 'whistle' },
	];

	useEffect(() => {
		if (route.params?.program) {
			const { name, workTime, restTime, cycles, sounds } = route.params.program;

			setProgramName(name);
			setWorkHours(Math.floor(workTime / 3600));
			setWorkMinutes(Math.floor((workTime % 3600) / 60));
			setWorkSeconds(workTime % 60);
			setRestHours(Math.floor(restTime / 3600));
			setRestMinutes(Math.floor((restTime % 3600) / 60));
			setRestSeconds(restTime % 60);
			setCycles(cycles);

			if (sounds) {
				setStartWorkSound(sounds.startWork || 'default');
				setStartRestSound(sounds.startRest || 'default');
				setStartProgramSound(sounds.startProgram || 'default');
				setEndProgramSound(sounds.endProgram || 'default');
			}

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

		const newProgram = {
			name: programName.trim(),
			workTime,
			restTime,
			cycles,
			sounds: {
				startWork: startWorkSound,
				startRest: startRestSound,
				startProgram: startProgramSound,
				endProgram: endProgramSound,
			},
		};

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
			resetForm();
			navigation.navigate('Home', { updated: true });
		} catch (error) {
			console.error('Erreur lors de la sauvegarde :', error);
		}
	};

	const resetForm = () => {
		setProgramName('');
		setWorkHours(0);
		setWorkMinutes(0);
		setWorkSeconds(30);
		setRestHours(0);
		setRestMinutes(0);
		setRestSeconds(10);
		setCycles(5);
		setStartWorkSound('default');
		setStartRestSound('default');
		setStartProgramSound('default');
		setEndProgramSound('default');
	};

	return (
		<View style={globalStyles.container}>
			<ScrollView contentContainerStyle={globalStyles.scrollContainer}>
				<Text style={globalStyles.title}>Configurer votre Timer</Text>

				{/* Nom du programme */}
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

				{/* Durée de Travail */}
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

				{/* Durée de Pause */}
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

				{/* Nombre de Cycles */}
				<TextInput
					label="Nombre de Cycles"
					mode="outlined"
					keyboardType="numeric"
					value={String(cycles)}
					onChangeText={(text) => setCycles(Number(text))}
					outlineStyle={globalStyles.outlineStyle}
					style={globalStyles.input}
				/>

				{/* Gérer les Sons */}
				<Text style={globalStyles.label}>Gérer les Sons</Text>
				<View style={globalStyles.fieldset}>
					{[
						{ label: 'Début de Travail', state: startWorkSound, setState: setStartWorkSound },
						{ label: 'Début de Repos', state: startRestSound, setState: setStartRestSound },
						{ label: 'Début du Programme', state: startProgramSound, setState: setStartProgramSound },
						{ label: 'Fin du Programme', state: endProgramSound, setState: setEndProgramSound },
					].map(({ label, state, setState }) => (
						<View key={label} style={{ marginBottom: 10 }}>
							<Text style={globalStyles.label}>{label}</Text>
							<RadioButton.Group
								onValueChange={(value) => setState(value)}
								value={state}
							>
								{soundOptions.map(({ label, value }) => (
									<RadioButton.Item key={value} label={label} value={value} />
								))}
							</RadioButton.Group>
						</View>
					))}
				</View>

			</ScrollView>

			{/* Boutons flottants */}
			<View style={globalStyles.floatingButtons}>
				<Button
					mode="contained"
					icon="content-save"
					onPress={saveProgram}
					style={globalStyles.button}
				>
					Sauvegarder
				</Button>
				<Button
					mode="contained"
					icon="play-circle-outline"
					onPress={() => {
						const workTime = calculateTotalSeconds(workHours, workMinutes, workSeconds);
						const restTime = calculateTotalSeconds(restHours, restMinutes, restSeconds);
						navigation.navigate('Timer', {
							workTime,
							restTime,
							cycles,
							sounds: {
								startWork: startWorkSound,
								startRest: startRestSound,
								startProgram: startProgramSound,
								endProgram: endProgramSound,
							},
						});
					}}
					style={globalStyles.button}
				>
					Démarrer
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	scrollContainer: {
		paddingBottom: 100, // Espace pour les boutons flottants
	},
	floatingButtons: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button: {
		flex: 1,
		marginHorizontal: 5,
	},
});
