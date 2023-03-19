import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const TaskForm = ({ isOpen, toggle, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [modalStyle, setModalStyle] = useState({ display: 'none' });

  const handleSave = () => {
    onSave({ title, description });
    setTitle('');
    setDescription('');
    setModalStyle({ display: 'none' });
  };

  const toggleModal = () => {
    setModalStyle({
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    });
    toggle();
  };

  useEffect(() => {
    if (!isOpen) {
      setModalStyle({ display: 'none' });
    }
  }, [isOpen]);

  return (
    <>
      <Button color="primary" onClick={toggleModal}>
        Add Task
      </Button>
      <div style={modalStyle}>
        <Modal isOpen={isOpen} zIndex={10000} className="TaskForm">
          <ModalHeader >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Add Task</div>
              <Button color="link" onClick={toggle}>X</Button>
            </div>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSave}>Save</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default TaskForm;
