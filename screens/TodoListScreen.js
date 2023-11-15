import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, FlatList } from "react-native";
import StyledButton from "../components/StyledButton";
import TodoItem from "../components/TodoItem";
import useAuthentication from "../utils/useAuthentication";
import Loader from "../components/Loader";

const TodoListScreen = ({ navigation }) => {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);

  const { isAuthenticating, authenticateUser } = useAuthentication();

  useEffect(() => {
    authenticateUser(navigation);
  }, [navigation]);

  const handleInputChange = (text) => {
    setTodoInput(text);
  };

  const handleTodoUpdate = (targetId, label) => {
    const newTodos = todos.map((todo) =>
      todo.id === targetId ? { id: targetId, label } : todo
    );
    setTodos(newTodos);
  };

  const handleTodoDelete = (targetId) => {
    const newTodos = todos.filter((todo) => todo.id !== targetId);
    setTodos(newTodos);
  };

  const handleTodoSubmit = () => {
    setTodos((state) => [...state, { id: state.length + 1, label: todoInput }]);
    setTodoInput("");
  };

  return (
    <>
      {isAuthenticating ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Add something to do..."
              onChangeText={handleInputChange}
              value={todoInput}
            />
            <StyledButton
              label="Add"
              onPress={handleTodoSubmit}
              isDisabled={!todoInput}
            />
          </View>
          {!!todos.length && (
            <FlatList
              horizontal={false}
              style={styles.todoList}
              data={todos}
              keyExtractor={(todo) => `${todo.id}`}
              renderItem={({ item }) => (
                <TodoItem
                  key={`${item.label}--${item.id}`}
                  todo={item}
                  onUpdate={handleTodoUpdate}
                  onDelete={handleTodoDelete}
                />
              )}
            />
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  todoList: {
    width: '100%'
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  input: {
    borderColor: "gray",
    flex: 1,
    borderWidth: 1,
    marginRight: 10,
    padding: 10,
  },
});

export default TodoListScreen;
