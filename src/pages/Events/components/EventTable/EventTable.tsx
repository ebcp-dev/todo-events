import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridEditRowsModel,
  GridSortItem
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';

import {
  emptyEventsList,
  removeEvent,
  setEventsList
} from '../../../../app/redux/slices/eventListSlice';
import { AppDispatch, RootState } from '../../../../app/redux/store';
import { deleteEventThunk, getEventThunk } from '../../../../api/eventListApi';
import CustomToolbar from './CustomToolbar';

import './EventTable.scss';

const EventTable = () => {
  const [sortModel, setSortModel] = useState<GridSortItem[]>([
    {
      field: 'from',
      sort: 'desc'
    }
  ]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const eventListState = useSelector((state: RootState) => state.eventList);

  useEffect(() => {
    dispatch(getEventThunk({}))
      .then((response) => {
        dispatch(setEventsList(response.payload.result));
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(`Failed to retrieve events.`);
      });
    return () => {
      emptyEventsList();
    };
  }, [dispatch]);

  const handleEditRowsModelChange = useCallback((model: GridEditRowsModel) => {
    setEditRowsModel(model);
  }, []);

  const handleDeleteClick = (id) => () => {
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
          setSuccessMessage(``);
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
      headerName: 'Delete',
      type: 'actions',
      flex: 1,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon sx={{ color: '#BB1C2A' }} />}
            label="Edit"
            className="textPrimary"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />
        ];
      }
    }
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      {errorMessage ? (
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
      )}
      {successMessage ? (
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
      )}
      <DataGrid
        sx={{ mt: 4 }}
        rowCount={50}
        rows={eventListState.events}
        columns={gridColumns}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        editMode="row"
        editRowsModel={editRowsModel}
        onEditRowsModelChange={handleEditRowsModelChange}
        components={{
          Toolbar: CustomToolbar
        }}
        componentsProps={{
          toolbar: { editRowsModel }
        }}
      />
    </div>
  );
};

export default EventTable;
