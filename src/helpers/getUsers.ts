import { User } from "../models";

export async function getUsers(): Promise<User[]> {
  const usersAsJson = await fetch('https://jsonplaceholder.typicode.com/users');

  return usersAsJson.json();
}
