import { Button, Center, Modal, Text } from 'native-base';
import { styles } from './InternetWarning.css';
interface IPropsModalWindow {
	open: boolean;
	keyboardStatus?: boolean;
	error: string;
}

const InternetWarning = ({
	open,
	keyboardStatus,
	error,
}: IPropsModalWindow) => {
	return (
		<Center>
			<Modal isOpen={open} avoidKeyboard={keyboardStatus}>
				<Modal.Content style={styles.modalContent}>
					<Modal.Header style={styles.modalHeader} />
					<Modal.Body style={styles.modalBody}>
						<Text style={styles.contentTextModal}>{error}</Text>
					</Modal.Body>
					<Modal.Footer style={styles.modalFooter} />
				</Modal.Content>
			</Modal>
		</Center>
	);
};

export default InternetWarning;
