import { Modal } from '@mantine/core';
import React from 'react';

const CustomModal = ({ open, closeModal, file }: any) => {
	return (
		<Modal opened={open} size="70%" onClose={closeModal} title={file?.name}>
			{file?.extension !== 'pdf' ? (
				<>
					<img style={{ width: '99%' }} src={file?.download} alt={file?.name} />
				</>
			) : (
				<iframe
					style={{
						borderRadius: 10,
						borderColor: '#90caf975',
						boxShadow:
							'0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
						border: '0px solid',
					}}
					title="contrat-pdf"
					src={file?.download}
					width="100%"
					height="700px"
				></iframe>
			)}
		</Modal>
	);
};

export default CustomModal;
