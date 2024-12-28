import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfigScreen({ navigation }) {
	const [workTime, setWorkTime] = useState(30);
	const [restTime, setRestTime] = useState(10);
	const [cycles, setCycles] = useState(5);
	const [programName, setProgramName] = useState('');
	const [savedPrograms, setSavedPrograms] = useState([]);
	const [editingProgram, setEditingProgram] = useState(null); // Programme en cours de modification
	const [error, setError] = useState(''); // État pour gérer les erreurs

	useEffect(() => {
		loadPrograms();
	}, []);

	// Charger les programmes sauvegardés
	const loadPrograms = async () => {
		try {
			const currentPrograms = await AsyncStorage.getItem('programs');
			setSavedPrograms(currentPrograms ? JSON.parse(currentPrograms) : []);
		} catch (error) {
			console.error('Erreur lors du chargement :', error);
		}
	};

	// Sauvegarder un nouveau programme ou en modifier un existant
	const saveProgram = async () => {
		if (!programName.trim()) {
			setError('Veuillez entrer un nom pour le programme.');
			return;
		}

		setError(''); // Réinitialise l'erreur si tout est correct

		const newProgram = { name: programName.trim(), workTime, restTime, cycles };

		try {
			const currentPrograms = await AsyncStorage.getItem('programs');
			let programs = currentPrograms ? JSON.parse(currentPrograms) : [];

			if (editingProgram) {
				// Remplacer le programme existant
				programs = programs.map((p) => (p.name === editingProgram.name ? newProgram : p));
				setEditingProgram(null); // Réinitialiser le mode édition
			} else {
				// Ajouter un nouveau programme
				programs.push(newProgram);
			}

			await AsyncStorage.setItem('programs', JSON.stringify(programs));
			setSavedPrograms(programs);
			setProgramName('');
		} catch (error) {
			console.error('Erreur lors de la sauvegarde :', error);
		}
	};

	// Charger un programme dans les champs pour modification
	const editProgram = (program) => {
		setProgramName(program.name);
		setWorkTime(program.workTime);
		setRestTime(program.restTime);
		setCycles(program.cycles);
		setEditingProgram(program);
	};

	// Supprimer un programme
	const deleteProgram = async (programName) => {
		try {
			const currentPrograms = await AsyncStorage.getItem('programs');
			const programs = currentPrograms ? JSON.parse(currentPrograms) : [];
			const updatedPrograms = programs.filter((p) => p.name !== programName);
			await AsyncStorage.setItem('programs', JSON.stringify(updatedPrograms));
			setSavedPrograms(updatedPrograms);
		} catch (error) {
			console.error('Erreur lors de la suppression :', error);
		}
	};

	// Démarrer le timer avec la configuration actuelle
	const handleStart = () => {
		navigation.navigate('Timer', { workTime, restTime, cycles });
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Nom du Programme</Text>
			<TextInput
				style={[styles.input, error ? styles.inputError : null]} // Ajout du style rouge si erreur
				value={programName}
				onChangeText={setProgramName}
				placeholder="Exemple : Cardio Intense"
			/>
			{error ? <Text style={styles.errorText}>{error}</Text> : null} {/* Message d'erreur */}
			<Text style={styles.label}>Durée de Travail (sec)</Text>
			<TextInput
				style={styles.input}
				keyboardType="numeric"
				value={String(workTime)}
				onChangeText={(text) => setWorkTime(Number(text))}
			/>
			<Text style={styles.label}>Durée de Pause (sec)</Text>
			<TextInput
				style={styles.input}
				keyboardType="numeric"
				value={String(restTime)}
				onChangeText={(text) => setRestTime(Number(text))}
			/>
			<Text style={styles.label}>Nombre de Cycles</Text>
			<TextInput
				style={styles.input}
				keyboardType="numeric"
				value={String(cycles)}
				onChangeText={(text) => setCycles(Number(text))}
			/>
			<Button title={editingProgram ? "Modifier le Programme" : "Sauvegarder le Programme"} onPress={saveProgram} />
			<Button title="Démarrer le Timer" onPress={handleStart} />

			<Text style={styles.savedProgramsTitle}>Programmes Sauvegardés</Text>
			<FlatList
				data={savedPrograms}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<View style={styles.programItemContainer}>
						<TouchableOpacity onPress={() => editProgram(item)} style={styles.programItem}>
							<Text>{item.name}</Text>
						</TouchableOpacity>
						<Button title="Supprimer" color="red" onPress={() => deleteProgram(item.name)} />
						<Button title="Démarrer" onPress={() => navigation.navigate('Timer', item)} />
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
	},
	label: {
		fontSize: 16,
		marginVertical: 10,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		fontSize: 16,
		borderRadius: 5,
		marginBottom: 20,
	},
	inputError: {
		borderColor: 'red',
	},
	errorText: {
		color: 'red',
		fontSize: 14,
		marginBottom: 10,
	},
	savedProgramsTitle: {
		fontSize: 18,
		marginTop: 30,
		marginBottom: 10,
		fontWeight: 'bold',
	},
	programItemContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	programItem: {
		flex: 1,
		padding: 10,
		backgroundColor: '#f0f0f0',
		borderRadius: 5,
		marginRight: 10,
	},
});
