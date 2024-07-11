import React from 'react';
import { Button } from '@mui/material';

interface MyButtonProps {
    onClick: () => void;
    buttonName: string;
}

const MyButton: React.FC<MyButtonProps> = ({ onClick, buttonName }) => {
  return (
    <Button color="primary" variant="contained" onClick={onClick}>
      {buttonName}
    </Button>
  );
};

export default MyButton;