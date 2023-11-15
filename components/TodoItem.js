import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import StyledButton from "./StyledButton";

const TodoItem = ({ todo: { id, label }, onEdit, onDelete }) => {
  const [textInput, setTextInput] = useState(label);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (text) => {
    setTextInput(text);
  };
  
  const handleSaveClick = () => {
    onEdit(id, textInput);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTextInput(label);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (isEditing) {
      handleCancel();
    } else {
      onDelete(id);
    }
  };

  const handleLeftButton = () => {
    if (isEditing) {
      handleSaveClick();
    } else {
      handleEditClick();
    }
    setIsEditing(!isEditing);
  };

  const handleRightButton = () => {
    if (isEditing) {
      handleCancel();
      setIsEditing(false);
    } else {
      handleDelete();
    }
  };

  return (
    <View style={styles.container}>
      {/* 
        Wrapped the Todo Item label in a touchable opacity to offer a long press option
        to trigger the editing state. This is mostly a stylistic choice as I felt a user
        might be used to that pattern for editing.

        There is still an edit button as a redundancy or for users who may not be able
        to press and hold
      */}
      <TouchableOpacity
        style={styles.todoLabel}
        onLongPress={() => setIsEditing(true)}
      >
        {isEditing ? (
          <TextInput
            multiline
            style={styles.editInput}
            placeholder={textInput}
            onChangeText={handleInputChange}
            value={textInput}
          />
        ) : (
          <Text>{label}</Text>
        )}
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <StyledButton
          styleOverride={styles.editButton}
          label={isEditing ? "Save" : "Edit"}
          onPress={handleLeftButton}
        />
        <StyledButton
          label={isEditing ? "Cancel" : "Delete"}
          onPress={handleRightButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  todoLabel: {
    flex: 1,
  },
  editInput: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  editButton: {
    marginHorizontal: 8,
  },
});

export default TodoItem;
