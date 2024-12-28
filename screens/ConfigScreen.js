import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function ConfigScreen({ navigation }) {
	const [workTime, setWorkTime] = useState(30); // secondes
	const [restTime, setRestTime] = useState(10); // secondes
	const [cycles, setCycles] = useState(5); // nombre de cycles

	const handleStart = () => {
		navigation.navigate('Timer', { workTime, restTime, cycles });
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Durée de Travail (sec)</Text>
			<TextInput
				style={styles.input}
				keyboardType="numeric"
				value={String(workTime)}
				onChangeText={text => setWorkTime(Number(text))}
			/>
			<Text style={styles.label}>Durée de Pause (sec)</Text>
			<TextInput
				style={styles.input}
				keyboardType="numeric"
				value={String(restTime)}
				onChangeText={text => setRestTime(Number(text))}
			/>
			<Text style={styles.label}>Nombre de Cycles</Text>
			<TextInput
				style={styles.input}
				keyboardType="numeric"
				value={String(cycles)}
				onChangeText={text => setCycles(Number(text))}
			/>
			<Button title="Démarrer le Timer" onPress={handleStart} />
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
});
