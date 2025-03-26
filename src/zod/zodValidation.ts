import { z } from "zod";

// Define a user schema
const userSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
});

// Validate data
const userData = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
};

try {
  userSchema.parse(userData); // This will pass
  console.log("User  data is valid");
} catch (e) {
  if (e instanceof z.ZodError) {
    console.error("Validation errors:", e.errors);
  } else {
    console.error(e); // Handle validation errors
  }
}
