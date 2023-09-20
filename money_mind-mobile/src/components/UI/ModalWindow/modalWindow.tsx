import { Button, Center, Modal, Text } from 'native-base';
import { ImageBackground, ImageSourcePropType } from 'react-native';
import { styles } from './modalWindow.сss';
import backgroundModal from '../../../assets/images/modal.png';

interface IPropsModalWindow {
	open: boolean;
	keyboardStatus?: boolean;
	onClose?: () => void;
	error: string;
}

const ModalWindow = ({
	open,
	keyboardStatus,
	onClose,
	error,
}: IPropsModalWindow) => {
	return (
		<Center>
			<Modal isOpen={open} onClose={onClose} avoidKeyboard={keyboardStatus}>
				<Modal.Content style={styles.modalContent}>
					<ImageBackground
						source={backgroundModal as ImageSourcePropType}
						resizeMode="contain"
						style={styles.imageBackground}
					>
						<Modal.Header style={styles.modalHeader}>
							<Button style={styles.closeBtn} onPress={onClose}>
								<Text style={styles.closeTextBtn}>X</Text>
							</Button>
						</Modal.Header>
						<Modal.Body style={styles.modalBody}>
							<Text style={styles.contentTextModal}>{error}</Text>
						</Modal.Body>
						<Modal.Footer style={styles.modalFooter}></Modal.Footer>
					</ImageBackground>
				</Modal.Content>
			</Modal>
		</Center>
	);
};

export default ModalWindow;
