import { StyleSheet } from 'react-native';


export const colors = {
	platinum: '#011220', // Fond principal
	cerulean: '#0b2942', // Couleur secondaire pour les éléments de liste
	prussianBlue: '#1d71ae', // Bordures ou éléments actifs (highlight) - corrigé
	darkIcon: '#e8f1ff', // Texte principal et icônes
	placeholder: '#5f7e97', // Texte d'espace réservé
	buttonBackground: '#0b253a', // Fond des boutons
	buttonText: '#ffffff', // Texte des boutons
	errorText: '#697098', // Couleur pour les erreurs ou désactivé
};

export const globalStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.platinum,
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: colors.darkIcon,
		marginBottom: 20,
		textAlign: 'center',
	},
	inputText: {
		color: colors.darkIcon,
	},
	iconButton: {
		backgroundColor: 'transparent',
		borderWidth: 1.5,
		borderColor: colors.prussianBlue,
		borderRadius: 30,
		padding: 10,
		width: 57,
		height: 57,
	},
	listItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 15,
		backgroundColor: colors.cerulean,
		borderRadius: 8,
		marginBottom: 10,
	},
	listActions: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	programText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: colors.darkIcon,
		flex: 1,
	},
	fieldset: {
		marginVertical: 20,
	},
	input: {
		marginBottom: 15,
	},
	outlineStyle: {
		borderColor: colors.prussianBlue, // Bordure personnalisée
		borderWidth: 1.5, // Largeur de la bordure
		borderRadius: 8, // Coins arrondis
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
	},
	button: {
		borderColor: colors.prussianBlue,
	},
	buttonText: {
		color: colors.prussianBlue,
		fontWeight: 'bold',
	},
	errorText: {
		color: 'red',
		marginBottom: 10,
	},
});
