import { MD3DarkTheme } from 'react-native-paper';
import { colors } from './styles';

export const darkTheme = {
	...MD3DarkTheme,
	colors: {
		...MD3DarkTheme.colors,
		background: colors.platinum, // Fond principal
		card: colors.cerulean, // Élément de carte ou fond secondaire
		text: colors.darkIcon, // Texte principal
		primary: colors.prussianBlue, // Couleur primaire
		accent: colors.buttonBackground, // Accentuation des boutons
		error: colors.errorText, // Rouge pour les erreurs
		placeholder: colors.placeholder, // Texte d'espace réservé
		notification: colors.buttonBackground, // Notification ou accent secondaire
	},
};
