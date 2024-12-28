import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, TextInput, Button, Card, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfigScreen({ navigation }) {
	const [workTime, setWorkTime] = useState(30);
	const [restTime, setRestTime] = useState(10);
	const [cycles, setCycles] = useState(5);
	const [programName, setProgramName] = useState('');
	const [savedPrograms, setSavedPrograms] = useState([]);
	const [editingProgram, setEditingProgram] = useState(null);
	const [error, setError] = useState('');

	useEffect(() => {
		loadPrograms();
	}, []);

	const loadPrograms = async () => {
		try {
			const currentPrograms = await AsyncStorage.getItem('programs');
			setSavedPrograms(currentPrograms ? JSON.parse(currentPrograms) : []);
		} catch (error) {
			console.error('Erreur lors du chargement :', error);
		}
	};

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
			setSavedPrograms(programs);
			setProgramName('');
		} catch (error) {
			console.error('Erreur lors de la sauvegarde :', error);
		}
	};

	const editProgram = (program) => {
		setProgramName(program.name);
		setWorkTime(program.workTime);
		setRestTime(program.restTime);
		setCycles(program.cycles);
		setEditingProgram(program);
	};

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

	const handleStart = () => {
		navigation.navigate('Timer', { workTime, restTime, cycles });
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Nom du Programme</Text>
			<TextInput
				label="Nom du Programme"
				mode="outlined"
				value={programName}
				onChangeText={setProgramName}
				error={!!error}
			/>
			{error ? <Text style={styles.errorText}>{error}</Text> : null}

			<TextInput
				label="Durée de Travail (sec)"
				mode="outlined"
				keyboardType="numeric"
				value={String(workTime)}
				onChangeText={(text) => setWorkTime(Number(text))}
			/>
			<TextInput
				label="Durée de Pause (sec)"
				mode="outlined"
				keyboardType="numeric"
				value={String(restTime)}
				onChangeText={(text) => setRestTime(Number(text))}
			/>
			<TextInput
				label="Nombre de Cycles"
				mode="outlined"
				keyboardType="numeric"
				value={String(cycles)}
				onChangeText={(text) => setCycles(Number(text))}
			/>

			<Button mode="contained" onPress={saveProgram} icon="content-save">
				{editingProgram ? 'Modifier le Programme' : 'Sauvegarder le Programme'}
			</Button>
			<Button mode="contained" onPress={handleStart} style={styles.button} icon="play-circle">
				Démarrer le Timer
			</Button>

			<FlatList
				data={savedPrograms}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<Card style={styles.card}>
						<Card.Title
							title={item.name}
							right={() => (
								<>
									<IconButton icon="pencil" onPress={() => editProgram(item)} />
									<IconButton icon="delete" onPress={() => deleteProgram(item.name)} />
								</>
							)}
						/>
					</Card>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	label: {
		fontSize: 16,
		marginVertical: 10,
	},
	button: {
		marginTop: 20,
	},
	card: {
		marginVertical: 10,
	},
	errorText: {
		color: 'red',
		marginBottom: 10,
	},
});
