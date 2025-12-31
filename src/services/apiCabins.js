import toast from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    toast.error("Cabins could not be loaded.");
    throw new Error("Cabins could not be loaded.");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    toast.error("Cabins could not be deleted.");
    throw new Error("Cabins could not be deleted.");
  }
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  let imageName;
  if (!hasImagePath) {
    imageName = `${Math.random() * 1000}-${newCabin.image.name}`.replaceAll(
      "/",
      ""
    );
  }
  console.log(newCabin.image);
  console.log(hasImagePath);
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  //1 create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // Edit cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select();

  if (error) {
    toast.error(`Cabin could not be ${id ? "edited" : "created"}.`);
    throw new Error(`Cabin could not be ${id ? "edited" : "created"}.`);
  }

  //2) upload image
  if (!hasImagePath) {
    const { imgError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (imgError) {
      await supabase.from("cabins".delete().eq("id", data.id));
      console.log(imgError);
      const errorMsg =
        "Cabin image could not be uploaded and the cabin was not created.";
      toast.error(error);
      throw new Error(errorMsg);
    }
  }

  //3.  Dlete cabin if there was an error uploading the image.
  return data;
}

export async function editCabin(cabin) {
  const { data, error } = await supabase
    .from("cabins")
    .update({ other_column: "otherValue" })
    .eq("some_column", "someValue")
    .select();
  if (error) {
    toast.error("Cabin could not be updated.");
    throw new Error("Cabins could not be updated.");
  }
  return data;
}
// export async function getCabin({ id }) {}
