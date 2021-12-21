import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Material UI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// Material Icons
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
// Material UI Data Grid
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridEditRowsModel,
  GridSortItem
} from '@mui/x-data-grid';
// State management
import {
  IEvent,
  removeEvent
} from '../../../../app/redux/slices/eventListSlice';
import { AppDispatch, RootState } from '../../../../app/redux/store';
// API
import { deleteEventThunk, putEventThunk } from '../../../../api/eventListApi';

import './EventTable.scss';

const EventTable = () => {
  // default sorting model for Data Grid
  const [sortModel, setSortModel] = useState<GridSortItem[]>([
    {
      field: 'from',
      sort: 'desc'
    }
  ]);
  const [editRowsModel, setEditRowsModel] = useState<GridEditRowsModel>({});
  // Feedback alerts
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // Sets row data after editing
  const handleEditRowsModelChange = useCallback((model: GridEditRowsModel) => {
    setEditRowsModel(model);
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const eventListState = useSelector((state: RootState) => state.eventList);

  const handleSaveClick = (id) => (event) => {
    event.stopPropagation();
    // Need to convert editRowsModel to array to get keys
    if (Object.entries(editRowsModel).length > 0) {
      // parse into IEvent object
      const completedValue =
        Object.entries(editRowsModel)[0][1].isCompleted.value;
      const fromValue = Object.entries(editRowsModel)[0][1].from.value;
      const toValue = Object.entries(editRowsModel)[0][1].to.value;
      const editEvent: IEvent = {
        id: Object.entries(editRowsModel)[0][0],
        from: `${fromValue}`,
        to: `${toValue}`,
        content: `${Object.entries(editRowsModel)[0][1].content.value}`,
        isCompleted: completedValue ? true : false
      };
      // putEvent dispatch
      // Only update if save button in edited row is clicked
      if (id === editEvent.id) {
        const fromDate = new Date(`${fromValue}`);
        const toDate = new Date(`${toValue}`);
        if (fromDate.getTime() >= toDate.getTime()) {
          setErrorMessage(`'To' date must be after 'From' date.`);
          setSuccessMessage('');
        } else {
          dispatch(putEventThunk({ eventObject: editEvent }))
            .then((response) => {
              console.log(response);
              setSuccessMessage(response.payload.message);
            })
            .catch((error) => {
              console.log(error);
              setErrorMessage(`Failed to update event!`);
              setSuccessMessage('');
            });
        }
      }
    }
  };

  const handleDeleteClick = (id) => (event) => {
    event.stopPropagation();
    if (id) {
      const eventObj = eventListState.events.find((obj) => obj.id === id);
      dispatch(deleteEventThunk({ eventId: id }))
        .then((response) => {
          setSuccessMessage(response.payload.message);
          dispatch(removeEvent(eventObj));
        })
        .catch((error) => {
          console.log(error.message);
          setErrorMessage(`Failed to delete event!`);
          setSuccessMessage('');
        });
    }
  };

  const gridColumns: GridColumns = [
    {
      field: 'from',
      headerName: 'From',
      type: 'dateTime',
      flex: 1,
      editable: true
    },
    {
      field: 'to',
      headerName: 'To',
      type: 'dateTime',
      flex: 1,
      editable: true
    },
    { field: 'content', headerName: 'Content', flex: 1, editable: true },
    {
      field: 'isCompleted',
      headerName: 'Completed',
      type: 'boolean',
      flex: 1,
      editable: true
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 1,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={id}
            icon={<SaveIcon sx={{ color: '#03AAF9' }} />}
            label="Save"
            className="textPrimary"
            onClick={handleSaveClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon sx={{ color: '#BB1C2A' }} />}
            label="Delete"
            className="textPrimary"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />
        ];
      }
    }
  ];

  const errorAlert = (
    <Snackbar
      open={errorMessage ? true : false}
      autoHideDuration={6000}
      onClose={() => {
        setErrorMessage('');
      }}
    >
      <Alert
        severity="error"
        onClose={() => {
          setErrorMessage('');
        }}
      >
        {errorMessage}
      </Alert>
    </Snackbar>
  );

  const successAlert = (
    <Snackbar
      open={successMessage ? true : false}
      autoHideDuration={6000}
      onClose={() => {
        setSuccessMessage('');
      }}
    >
      <Alert
        severity="success"
        onClose={() => {
          setSuccessMessage('');
        }}
      >
        {successMessage}
      </Alert>
    </Snackbar>
  );

  return (
    <div style={{ height: 500, width: '100%' }}>
      {errorAlert}
      {successAlert}
      <DataGrid
        editMode="row"
        rowCount={50}
        rows={eventListState.events}
        columns={gridColumns}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        editRowsModel={editRowsModel}
        onEditRowsModelChange={handleEditRowsModelChange}
        sx={{ mt: 4 }}
      />
    </div>
  );
};

export default EventTable;
