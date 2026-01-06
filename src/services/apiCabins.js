import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not get loaded");
  }
  return data;
}

export async function createCabin(newCabin) {
  const safeName = newCabin.image.name.replaceAll(/\s+/g, "-");
  const imageName = `${crypto.randomUUID()}-${safeName}`;

  // 1️⃣ Upload image FIRST
  const { error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (uploadError) {
    console.error(uploadError);
    throw new Error("Image could not be uploaded");
  }

  // 2️⃣ Get public URL
  const { data: imageData } = supabase.storage
    .from("cabin-images")
    .getPublicUrl(imageName);

  console.log(imageData);

  const imagePath = imageData.publicUrl;

  // 3️⃣ Insert cabin row
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    // rollback image
    await supabase.storage.from("cabin-images").remove([imageName]);

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
