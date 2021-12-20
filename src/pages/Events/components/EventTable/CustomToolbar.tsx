import React, { useState } from 'react';

import { GridToolbarContainer } from '@mui/x-data-grid';
import SaveIcon from '@mui/icons-material/Save';
// import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { AppDispatch } from '../../../../app/redux/store';
import { putEventThunk } from '../../../../api/eventListApi';
import { useDispatch } from 'react-redux';

const CustomToolbar = (props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { editRowsModel } = props;
  // console.log(editRowsModel);

  // const handleAddClick = () => {
  //   console.log('added');
  // };

  const handleSaveClick = () => {
    console.log(editRowsModel);
    if (Object.keys(editRowsModel).length === 0) {
      setErrorMessage(``);
      setSuccessMessage(``);
    } else {
      dispatch(putEventThunk({ eventObject: editRowsModel }))
        .then((response) => {
          console.log(response);

          setSuccessMessage(response.payload.message);
          // dispatch(setEventsList(updateEvent));
        })
        .catch((error) => {
          console.log(error);

          setErrorMessage(`Failed to update event!`);
          setSuccessMessage(``);
        });
      console.log(editRowsModel);
    }
  };

  const errorAlert = errorMessage ? (
    <Alert
      severity="error"
      onClose={() => {
        setErrorMessage('');
      }}
    >
      {errorMessage}
    </Alert>
  ) : (
    ''
  );

  const successAlert = successMessage ? (
    <Alert
      severity="success"
      onClose={() => {
        setSuccessMessage('');
      }}
    >
      {successMessage}
    </Alert>
  ) : (
    ''
  );

  return (
    <>
      {errorAlert}
      {successAlert}
      <GridToolbarContainer>
        {/* <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add Event
        </Button> */}
        <Button
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSaveClick}
        >
          Save
        </Button>
      </GridToolbarContainer>
    </>
  );
};

export default CustomToolbar;
