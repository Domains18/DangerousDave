# Compiler and compiler flags
CC = gcc
CFLAGS = -Wall -Wextra -Iinclude
LDFLAGS = -lcurl

# Directories
SRC_DIR = src
INC_DIR = include
TEST_DIR = tests
BIN_DIR = bin
BUILD_DIR = build

# Source and object files
SRC = $(wildcard $(SRC_DIR)/*.c)
OBJ = $(SRC:$(SRC_DIR)/%.c=$(BUILD_DIR)/%.o)
TEST_SRC = $(wildcard $(TEST_DIR)/*.c)
TEST_OBJ = $(TEST_SRC:$(TEST_DIR)/%.c=$(BUILD_DIR)/%.o)

# Target executable
TARGET = $(BIN_DIR)/mpesa
TEST_TARGET = $(BIN_DIR)/test_main

# Default target
all: $(TARGET) $(TEST_TARGET)

# Build the main executable
$(TARGET): $(OBJ)
	@mkdir -p $(BIN_DIR)
	$(CC) $(CFLAGS) -o $@ $^ $(LDFLAGS)

# Build the test executable
$(TEST_TARGET): $(OBJ) $(TEST_OBJ)
	@mkdir -p $(BIN_DIR)
	$(CC) $(CFLAGS) -o $@ $^ $(LDFLAGS)

# Compile object files from src
$(BUILD_DIR)/%.o: $(SRC_DIR)/%.c
	@mkdir -p $(BUILD_DIR)
	$(CC) $(CFLAGS) -c -o $@ $<

# Compile object files from tests
$(BUILD_DIR)/%.o: $(TEST_DIR)/%.c
	@mkdir -p $(BUILD_DIR)
	$(CC) $(CFLAGS) -c -o $@ $<

# Clean build files
clean:
	rm -rf $(BUILD_DIR) $(BIN_DIR)

# Run tests
test: $(TEST_TARGET)
	./$(TEST_TARGET)

.PHONY: all clean test