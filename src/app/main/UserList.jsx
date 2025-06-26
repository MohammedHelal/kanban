import { fetchUserData } from "@/src/lib/server-actions";

async function UserList() {
  const users = await fetchUserData();

  console.log(users);
  return (
    <ul className="text-platinum">
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}

export default UserList;
