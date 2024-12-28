import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, globalStyles } from '../styles';

export default function ConfigScreen({ route, navigation }) {
	const [workTime, setWorkTime] = useState(30);
	const [restTime, setRestTime] = useState(10);
	const [cycles, setCycles] = useState(5);
	const [programName, setProgramName] = useState('');
	const [editingProgram, setEditingProgram] = useState(null);
	const [error, setError] = useState('');

	useEffect(() => {
		if (route.params?.program) {
			const { name, workTime, restTime, cycles } = route.params.program;
			setProgramName(name);
			setWorkTime(workTime);
			setRestTime(restTime);
			setCycles(cycles);
			setEditingProgram(route.params.program);
		}
	}, [route.params]);

	const saveProgram = async () => {
		if (!programName.trim()) {
			setError('Veuillez entrer un nom pour le programme.');
			return;
		}

		setError('');
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
			setWorkTime(30);
			setRestTime(10);
			setCycles(5);

			navigation.navigate('Home', { updated: true });
		} catch (error) {
			console.error('Erreur lors de la sauvegarde :', error);
		}
	};

	const handleStart = () => {
		navigation.navigate('Timer', { workTime, restTime, cycles });
	};

	return (
		<View style={globalStyles.container}>
			<Text style={globalStyles.title}>Configurer votre Timer</Text>

			<View >
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

				<TextInput
					label="Durée de Travail (sec)"
					mode="outlined"
					keyboardType="numeric"
					value={String(workTime)}
					onChangeText={(text) => setWorkTime(Number(text))}
					outlineStyle={globalStyles.outlineStyle}
					style={globalStyles.input}
				/>
				<TextInput
					label="Durée de Pause (sec)"
					mode="outlined"
					keyboardType="numeric"
					value={String(restTime)}
					onChangeText={(text) => setRestTime(Number(text))}
					outlineStyle={globalStyles.outlineStyle}
					style={globalStyles.input}
				/>
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
