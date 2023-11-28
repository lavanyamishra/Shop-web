# Linux custom Script


## Code of script 

```bash
# Function aliases for simplified usage
alias cpu_getinfo='get_cpu_details'
alias memory_getinfo='get_memory_details'
alias user_create='create_new_user'
alias user_list='list_existing_users'
alias file_getinfo='retrieve_file_details'

# Function definitions for specific actions
function get_cpu_details() {
  # Command to retrieve CPU information (similar to lscpu)
  lscpu
}

function get_memory_details() {
  # Command to retrieve memory information (similar to free)
  free
}

function create_new_user() {
  username="$1"
  # Command to create a new user with provided username
  sudo useradd "$username" -m -s /bin/bash
}

function list_existing_users() {
  if [[ "$1" == "--sudo-only" ]]; then
    # Command to list users with sudo permissions
    grep -Po '^sudo.+:\K[^:]+' /etc/group
  else
    # Command to list all regular users
    getent passwd | grep -vE '(/usr/sbin/nologin|/bin/false)$' | cut -d: -f1
  fi
}

function retrieve_file_details() {
  file_name="$1"
  if [[ "$2" == "--size" || "$2" == "-s" ]]; then
    # Command to get file size
    stat -c "%s" "$file_name"
  elif [[ "$2" == "--permissions" || "$2" == "-p" ]]; then
    # Command to get file permissions
    stat -c "%A" "$file_name"
  elif [[ "$2" == "--owner" || "$2" == "-o" ]]; then
    # Command to get file owner
    stat -c "%U" "$file_name"
  elif [[ "$2" == "--last-modified" || "$2" == "-m" ]]; then
    # Command to get last modified time
    stat -c "%y" "$file_name"
  else
    # Default output for file information
    stat "$file_name"
  fi
}

# Main script logic
case "$1" in
  "cpu" )
    case "$2" in
      "getinfo" ) cpu_getinfo ;;
      * ) display_help ;;
    esac
    ;;
  "memory" )
    case "$2" in
      "getinfo" ) memory_getinfo ;;
      * ) display_help ;;
    esac
    ;;
  "user" )
    case "$2" in
      "create" ) user_create "$3" ;;
      "list" ) user_list "$3" ;;
      * ) display_help ;;
    esaca
    ;;
  "file" )
    case "$2" in
      "getinfo" ) file_getinfo "$3" "$4" ;;
      * ) display_help ;;
    esac
    ;;
  "--help" | * ) display_help ;;
  "--version" ) display_version ;;
esac



#made by lavanya

```


## Flow Diagram and Architecture
```bash 
+-------------------------------------------------------------------+
|                                                                 |
|                                       internsctl                   |
|                                                                 |
+-------------------------------------------------------------------+
|                                       /     \                    |
|                                   CPU     Memory                  |
|                                      |       |                    |
+-------------------------------------------------------------------+
|                                      |       |                    |
|                                  getinfo  getinfo                 |
|                                      |       |                    |
+-------------------------------------------------------------------+
|                                       \     /                    |
|                                       |       |                    |
+-------------------------------------------------------------------+
|                                       User     File                    |
|                                      |       |                    |
+-------------------------------------------------------------------+
|                                      |       |                    |
|                                  create    getinfo                  |
|                                      |       |                    |
+-------------------------------------------------------------------+
|                                      |       |                    |
|                                 list       |                    |
|                                      |       |                    |
+-------------------------------------------------------------------+
|                                      \     /                    |
|                                       \   /                    |
+-------------------------------------------------------------------+
|                                  -------                       |
|                                  | |                          |
|                                  | |                          |
|                                  | |                          |
|                                  | |    Command Options       |
|                                  | |                          |
|                                  | |                          |
|                                  | |   --size, -s             |
|                                  | |   --permissions, -p     |
|                                  | |   --owner, -o            |
|                                  | |   --last-modified, -m   |
|                                  | |   --help, -h             |
|                                  | |   --version               |
|                                  | |                          |
|                                  | |                          |
|                                  | |                          |
|                                  -------                       |
```

 
