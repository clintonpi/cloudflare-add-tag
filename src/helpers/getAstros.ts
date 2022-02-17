import { Astros } from "../models";

export async function getAstros(): Promise<Astros> {
  const res = await fetch('http://api.open-notify.org/astros.json');

  return res.json();
}
