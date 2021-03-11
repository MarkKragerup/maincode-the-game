import React from 'react';
import './modal.css';
import exitButton from '../../assets/illustrations/CustomX.svg';

type IProps = {
	showModal: boolean;
	onCloseCallback: () => void;
	className?: string;
}

const Modal: React.FC<IProps> = ({ children, showModal = false, onCloseCallback, className = '' }): JSX.Element => {
	return (
		<div className={`modal ${showModal ? 'block' : 'none'}`}>
			<div className={`modal-main ${className}`}>
				<div onClick={onCloseCallback}>
					<img src={exitButton} alt='exit' className='close-button cross' />
				</div>
				<div className='children-container'>
					{children}
				</div>
			</div>
		</div>
	);
};
export default Modal;