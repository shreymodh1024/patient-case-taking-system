import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runIntakeTurn } from "./intake.server";

const InputSchema = z.object({
  history: z.array(
    z.object({
      role: z.enum(["assistant", "patient"]),
      content: z.string().min(1),
    }),
  ),
  language: z.string().default("English"),
  extractedNote: z.string().nullable().default(null),
  ayushMode: z.boolean().default(false),
});

export const intakeTurn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) =>
    runIntakeTurn(data.history, data.language, data.extractedNote, data.ayushMode),
  );
