
const USERS_KEY = "petHeavenUsers";

function getUsers() {
  try {
    const users = JSON.parse(
      localStorage.getItem(USERS_KEY) || "[]"
    );

    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + ":" + password);

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    data
  );

  return Array.from(
    new Uint8Array(hashBuffer),
    (byte) => byte.toString(16).padStart(2, "0")
  ).join("");
}

export async function registerUser({
  name,
  email,
  password
}) {
  const users = getUsers();
  const cleanEmail = email.trim().toLowerCase();

  const exists = users.some(
    (user) => user.email === cleanEmail
  );

  if (exists) {
    throw new Error("This email is already registered.");
  }

  const salt = Array.from(
    crypto.getRandomValues(new Uint8Array(16)),
    (byte) => byte.toString(16).padStart(2, "0")
  ).join("");

  const passwordHash = await hashPassword(
    password,
    salt
  );

  const newUser = {
    id: Date.now(),
    name: name.trim(),
    email: cleanEmail,
    salt,
    passwordHash
  };

  users.push(newUser);

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );

  return {
    name: newUser.name,
    email: newUser.email
  };
}

export async function loginUser(email, password) {
  const users = getUsers();

  const user = users.find(
    (user) =>
      user.email === email.trim().toLowerCase()
  );

  if (!user) {
    throw new Error("Incorrect email or password.");
  }

  const enteredHash = await hashPassword(
    password,
    user.salt
  );

  if (enteredHash !== user.passwordHash) {
    throw new Error("Incorrect email or password.");
  }

  return {
    name: user.name,
    email: user.email
  };
}
