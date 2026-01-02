import toast from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    toast.error("There was an error logging in.");
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    toast.error("There was an error logging in.");
    throw new Error(error.message);
  }
  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error.message;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1) Update password OR fullname (not both)
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    toast.error("There was an error updating the user.");
    throw new Error(error.message);
  }
  if (!avatar) return data;
  // 2) Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}${avatar.name}`;

  const { error: storageError } = supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) {
    toast.error("There was an error uploading the avatar.");
    throw new Error(error.message);
  }

  // 3) Use avatar in the user
  const { data: userData2, error: userError2 } = await supabase.auth.updateUser(
    {
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    }
  );

  if (userError2) {
    toast.error("There was an error uploading the avatar.");
    throw new Error(error.message);
  }

  return userData2;
}
