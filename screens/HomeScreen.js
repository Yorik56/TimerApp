import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles, colors } from '../styles';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
	const [savedPrograms, setSavedPrograms] = useState([]);

	useFocusEffect(
		React.useCallback(() => {
			loadPrograms();
		}, [])
	);

	const loadPrograms = async () => {
		try {
			const currentPrograms = await AsyncStorage.getItem('programs');
			setSavedPrograms(currentPrograms ? JSON.parse(currentPrograms) : []);
		} catch (error) {
			console.error('Erreur lors du chargement :', error);
		}
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

	return (
		<View style={globalStyles.container}>
			<FlatList
				data={[{ isAddNew: true }, ...savedPrograms]}
				keyExtractor={(item, index) => (item.isAddNew ? 'add-new' : index.toString())}
				renderItem={({ item }) =>
					item.isAddNew ? (
						<View style={globalStyles.listItem}>
							<Text style={globalStyles.programText}>Créer</Text>
							<View style={globalStyles.listActions}>
								<IconButton
									icon="plus"
									onPress={() => navigation.navigate('Config')}
									color={colors.prussianBlue}
								/>
							</View>
						</View>
					) : (
						<View style={globalStyles.listItem}>
							<Text style={globalStyles.programText}>{item.name}</Text>
							<View style={globalStyles.listActions}>
								<IconButton
									icon="pencil"
									onPress={() =>
										navigation.navigate('Config', {
											program: item,
										})
									}
									color={colors.prussianBlue}
								/>
								<IconButton
									icon="delete"
									onPress={() => deleteProgram(item.name)}
									color={colors.errorText}
								/>
								<IconButton
									icon="play-circle"
									onPress={() =>
										navigation.navigate('Timer', {
											workTime: item.workTime,
											restTime: item.restTime,
											cycles: item.cycles,
										})
									}
									color={colors.prussianBlue}
								/>
							</View>
						</View>
					)
				}
			/>
		</View>
	);
}
