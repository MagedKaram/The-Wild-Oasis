import supabase from "./supabase.js";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not get loaded");
  }
  return data;
}

export async function createCabin(NewCabin) {
  const { error, data } = await supabase.from("cabins").insert(NewCabin);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not get loaded");
  }
  return data;
}
