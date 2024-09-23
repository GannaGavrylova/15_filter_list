import { useCallback, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { listUsers } from "../../utils/listUsers";

function UserList() {
  const [filter, setFilter] = useState("");

  // Функция фильтрации пользователей
  //   function filterUsers(query) {
  //     setFilter(query); // Обновляем фильтр
  //     return userList.filter(
  //       (user) => user.name.toLowerCase().includes(query.toLowerCase()) // Проверка по имени
  //     );
  //   }
  //Мемоизация функции фильтрации  с помощью хука `useCallback`
  const filterUsers = useCallback((query) => {
    setFilter(query); // Обновляем фильтр
    return listUsers.filter(
      (user) => user.name.toLowerCase().includes(query.toLowerCase()) // Проверка по имени
    );
  }, []);

  // Меморизация отфильтрованного списка
  const filteredUsers = useMemo(() => {
    return filterUsers(filter);
  }, [filter, filterUsers]);

  return (
    <div className={styles.userList_container}>
      <h1>Filter Users</h1>

      <input
        type="text"
        name="text"
        value={filter}
        placeholder="search users"
        onChange={(e) => setFilter(e.target.value)} // Обновляем фильтр при вводе
      />

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
