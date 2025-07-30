import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BsEmojiSmile } from 'react-icons/bs';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const ContactModal = ({ open, handleClose }) => {
    const { navigate } = useContext(ShopContext)
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <div className="flex flex-col items-center justify-center text-center gap-6">
                    <BsEmojiSmile className="text-[60px] text-primary" />
                    <p className='text-primary bold-15'>
                        Merci pour votre réclamation
                        <br /> Nous vous contacterons dès que possible.
                    </p>
                    <button className='btn-dark' onClick={() => navigate('/')}>Ok</button>
                </div>
            </Box>
        </Modal>
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    height: 250,
    bgcolor: 'background.paper',
    border: '2px solid #1B264F',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

export default ContactModal;
