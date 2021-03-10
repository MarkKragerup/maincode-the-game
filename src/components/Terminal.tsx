import React from 'react';
import Modal from './Modal';
import './terminal.css';

type IProps = {
	isOpen: boolean;
	onCloseCallback: () => void;
}

const Terminal: React.FC<IProps> = ({ isOpen, onCloseCallback }) => {

	return (
		<Modal showModal={isOpen} onCloseCallback={onCloseCallback} className='rounded'>
			<div className='terminal'>
				<div className='title-bar'>
					<p className='terminal-heading'>MAINCODE</p>
					<div className='terminal-text-layout'>
						<p className='white-text thick-text'><b>COMMANDS</b></p>
						<ul className='command-list white-text'>
							<li className='li-item'>Valid command 1</li>
							<li className='li-item'>Valid command 2</li>
							<li className='li-item'>Valid command 3</li>
							<li className='li-item'>Valid command 4</li>
						</ul>
						<br />
						<span className=''>{'>'}</span>
						<input autoFocus type='text' className='input' onChange={() => console.log('Terminal')} />
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default Terminal;