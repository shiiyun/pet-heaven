import { useState, useEffect } from "react";

const dogNames = [
  "Milo", "Buddy", "Charlie", "Max", "Maverick",
  "Rocky", "Bailey", "Teddy", "Cooper", "Neil"
];

const catNames = [
  "Luna", "Mochi", "Simba", "Coco", "Butter",
  "Oliver", "Nala", "Mimi", "Leo", "Yeti"
];

let cachedPets = null;
let requestPromise = null;

async function fetchPetData() {
  if (cachedPets) return cachedPets;
  if (requestPromise) return requestPromise;

  requestPromise = (async () => {
    const dogKey = import.meta.env.VITE_DOG_API_KEY;
    const catKey = import.meta.env.VITE_CAT_API_KEY;

    const [dogResponse, catResponse] = await Promise.all([
      fetch("https://api.thedogapi.com/v1/breeds", {
        headers: { "x-api-key": dogKey }
      }),
      fetch("https://api.thecatapi.com/v1/breeds", {
        headers: { "x-api-key": catKey }
      })
    ]);

    if (!dogResponse.ok || !catResponse.ok) {
      throw new Error("Unable to load pet information.");
    }

    const dogData = await dogResponse.json();
    const catData = await catResponse.json();

    const dogs = dogData
      .filter((breed) => breed.image?.url)
      .slice(0, 10)
      .map((breed, index) => ({
        id: `dog-${breed.id}`,
        name: dogNames[index % dogNames.length],
        type: "Dog",
        breed: breed.name,
        image: breed.image.url,
        origin: breed.origin || "Not listed",
        lifeSpan: breed.life_span || "Not listed",
        weight: breed.weight?.metric
          ? `${breed.weight.metric} kg`
          : "Not listed",
        personality: breed.temperament || "Not listed",
        description: breed.description ||
          "No breed description available.",
        bredFor: breed.bred_for || "Not listed",
        age: "Not provided",
        gender: "Not provided",
        size: "Not provided"
      }));

    const cats = catData
      .filter((breed) => breed.image?.url)
      .slice(0, 10)
      .map((breed, index) => ({
        id: `cat-${breed.id}`,
        name: catNames[index % catNames.length],
        type: "Cat",
        breed: breed.name,
        image: breed.image.url,
        origin: breed.origin || "Not listed",
        lifeSpan: breed.life_span || "Not listed",
        weight: breed.weight?.metric
          ? `${breed.weight.metric} kg`
          : "Not listed",
        personality: breed.temperament || "Not listed",
        description: breed.description ||
          "No breed description available.",
        bredFor: "Not applicable",
        age: "Not provided",
        gender: "Not provided",
        size: "Not provided"
      }));

    return [...dogs, ...cats];
  })()
    .then((data) => {
      cachedPets = data;
      return data;
    })
    .finally(() => {
      requestPromise = null;
    });

  return requestPromise;
}

export default function Pets() {
  const [pets, setPets] = useState(cachedPets || []);
  const [loading, setLoading] = useState(!cachedPets);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    let active = true;

    fetchPetData()
      .then((data) => {
        if (active) {
          setPets(data);
          setFetchError("");
        }
      })
      .catch((error) => {
        if (active) {
          setFetchError(error.message);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return { pets, loading, fetchError };
}
